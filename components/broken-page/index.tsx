"use client"

import { useEffect, useState } from "react"

export const BrokenPage = ({ title }: {title: string}) => {
    const ceva = [1,2,3]
const [condition, setCondition] = useState(true); 
    const [forEffect, setForEffect] = useState(0);
    const [shouldShow, setShouldShow] = useState(true);

   

    useEffect(() => {
        setForEffect(prev => prev +1)
        console.log("i only do this once")
    }, [])
 if(!shouldShow){
        return <div>Dobby is free!</div>
    }
    return condition && <div>
        {title.toUpperCase()}
        {ceva.map(item => {
           return <div key={item}>{item}</div>
        })}
<div className="flex gap-2">
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {setCondition(false)}}>
        Click me to hide me
    </button>
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => {setShouldShow(false)}}>
        Click me to free Dobby
    </button>
</div>
    </div>
}