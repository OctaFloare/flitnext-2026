'use client'

import { useEffect, useState } from "react"

export const BrokenPage = ({ title }: {title: string}) => {
    const ceva = [1,2,3]
    
    const [forEffect, setForEffect] = useState(0);
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        setForEffect(prev => prev +1)
        console.log("i only do this once")
    }, [])

    if(shouldShow){
        return <div>Dobby is free!
            <br />
            <button onClick={() => {setShouldShow(false)}}>
            Click me to hide me
        </button>
        </div>
        
    }

    return <div>
        {title.toUpperCase()}
        {ceva.map(item => {
            return <div key={item}>{item}</div>
        })}
        
        <button onClick={() => {setShouldShow(true)}}>
            Click me to free Dobby
        </button>
    </div>
}