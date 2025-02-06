import { useEffect, useState } from "react"

interface IsListeningProps {
    track: number
}

const IsListening = ({ track }: IsListeningProps) => {
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        const interval = setInterval(function () {
            setVisible(current => !current)
        }, 700)

        return () => clearInterval(interval)
    })

    return <div className="block">
        <span className="absolute text-xl text-white text-shadow-red-glow flex items-center">
            <span>listening now {track}</span>
            <span className="inline-flex text-[25px] items-center ml-[4px] leading-none -translate-y-1">
                {visible ? "." : null}
            </span>
        </span>
    </div>
}

export default IsListening