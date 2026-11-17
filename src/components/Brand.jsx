import React from 'react';import {Activity,Route} from 'lucide-react';
export default function Brand({compact=false}){return <div className="brand"><div className="brand-mark"><Route size={20}/><span/></div>{!compact&&<div><strong>ROAD<span>WATCH</span></strong><small>ROAD INTELLIGENCE</small></div>}</div>}
