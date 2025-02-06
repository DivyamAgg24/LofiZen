import { RefObject } from "react"

export const Player = ({iframeRef, url}: {iframeRef: RefObject<null>, url: string}) => {
    return <>
        <div className="w-full h-full flex items-center justify-center rounded-lg">
            <div className="-z-[1] w-[100vw] h-[100vh] rounded-lg">
                <div className="">
                <iframe width="560" height="315" ref={iframeRef} src={`${url}autoplay=0&mute=0&controls=0&origin=http://localhost:3000&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=true&color=black&enablejsapi=1&widgetid=1`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" className="h-full w-full" allowFullScreen></iframe>
                </div>
            </div>
        </div>
    </>
}