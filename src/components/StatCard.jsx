import React from 'react';
export default function StatCard({label,value,sub,icon:Icon,tone='blue',trend}){return <div className="stat-card"><div className="stat-top"><span>{label}</span><div className={`stat-icon ${tone}`}><Icon size={19}/></div></div><div className="stat-value">{value}</div><div className="stat-foot"><span>{sub}</span>{trend&&<b>{trend}</b>}</div></div>}
