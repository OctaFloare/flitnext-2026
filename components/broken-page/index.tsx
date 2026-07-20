'use client'
import { useEffect, useState } from "react"

export const BrokenPageComponent = ({ title }: {title: string}) => {
    const ceva = [1,2,3]
    
    const [condition, setCondition] = useState(true)
    const [forEffect, setForEffect] = useState(0);
    const [shouldShow, setShouldShow] = useState(true);

    if(!shouldShow){
        return <div>Dobby is free!</div>
    }

    useEffect(() => {
        setForEffect(1)
        console.log("i only do this once")
    }, [forEffect])

    return condition && <div>
        {title.toUpperCase()}
        {ceva.map(item => {
        return <div key={item}>{item}</div>
      })}
        <button onClick={() => { setCondition(false) }}>
        Click me to hide me
        </button>
        <button onClick={() => { setShouldShow(false) }}>
            Click me to free Dobby
        </button>
    </div>
}