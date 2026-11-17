import React from 'react';export default function SeverityBadge({value}){return <span className={`severity severity-${value.toLowerCase()}`}><i/>{value}</span>}
