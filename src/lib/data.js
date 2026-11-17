export const SOLAPUR_CENTER=[17.6599,75.9064];
export const fmtDate=value=>value?new Date(value).toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'}):'—';
export const mapUrl=e=>hasCoordinates(e)?`https://www.google.com/maps?q=${e.latitude},${e.longitude}`:'#';
export const severityColor=s=>s==='High'?'#dc6262':s==='Medium'?'#d99a35':'#2f9c78';
export const hasCoordinates=e=>e?.latitude!==null&&e?.latitude!==undefined&&e?.longitude!==null&&e?.longitude!==undefined&&e?.latitude!==''&&e?.longitude!==''&&Number.isFinite(Number(e.latitude))&&Number.isFinite(Number(e.longitude));
