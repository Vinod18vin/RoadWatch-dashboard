import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {onValue,ref} from 'firebase/database';
import {database,firebaseConfigured,DEVICE_ID} from './firebase';

const Ctx=createContext(null);
const emptyTelemetry={ax:null,ay:null,az:null,gx:null,gy:null,gz:null,magnitude:null,latitude:null,longitude:null,gpsValid:false,satellites:null,speed:null,lastSeen:null,deviceOnline:false};
const normalizeEvent=(id,value={})=>({id,...value,latitude:value.latitude!==null&&value.latitude!==undefined&&Number.isFinite(Number(value.latitude))?Number(value.latitude):null,longitude:value.longitude!==null&&value.longitude!==undefined&&Number.isFinite(Number(value.longitude))?Number(value.longitude):null});
export function StoreProvider({children}){
 const [events,setEvents]=useState([]);
 const [telemetry,setTelemetry]=useState(emptyTelemetry);
 const [connectionError,setConnectionError]=useState('');
 const [connected,setConnected]=useState(false);
 useEffect(()=>{
  if(!firebaseConfigured||!database){setConnected(false);return;}
  const deviceRef=ref(database,`devices/${DEVICE_ID}`);
  const stop=onValue(deviceRef,snapshot=>{
   const value=snapshot.val()||{};
   const t=value.telemetry||{};
   const lastSeen=t.lastSeen||value.lastSeen||null;
   const age=lastSeen?Date.now()-new Date(lastSeen).getTime():Infinity;
   setTelemetry({...emptyTelemetry,...t,lastSeen,deviceOnline:Number.isFinite(age)&&age>=-60000&&age<60000,gpsValid:Boolean(t.gpsValid)&&Number.isFinite(Number(t.latitude))&&Number.isFinite(Number(t.longitude))});
   const raw=value.detections||{};
   const rows=Object.entries(raw).map(([id,event])=>normalizeEvent(id,event)).sort((a,b)=>new Date(b.timestamp||0)-new Date(a.timestamp||0));
   setEvents(rows);
   setConnected(true);setConnectionError('');
  },error=>{setConnected(false);setConnectionError(error.message||'Unable to read Firebase data.');});
  return ()=>stop();
 },[]);
 const value=useMemo(()=>({events,telemetry,connected,connectionError,firebaseConfigured,deviceId:DEVICE_ID}),[events,telemetry,connected,connectionError]);
 return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
export const useStore=()=>useContext(Ctx);
