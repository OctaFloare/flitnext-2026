import { useEffect, useState } from "react"

export const BrokenPage = ({ title }: {title: string}) => {
    const ceva = [1,2,3]
    let condition = false
    
    const [forEffect, setForEffect] = useState(0);
    const [shouldShow, setShouldShow] = useState(true);

    if(!shouldShow){
        return <div>Dobby is free!</div>
    }

    useEffect(() => {
        setForEffect(prev => prev +1)
        console.log("i only do this once")
    }, [forEffect])

    return condition && <div>
        {title.toUpperCase()}
        {ceva.map(item => {
            return <div>{item}</div>
        })}
        <button onClick={() => {condition = true}}>
            Click me to hide me
        </button>
        <button onClick={() => {setShouldShow(false)}}>
            Click me to free Dobby
        </button>
    </div>
}