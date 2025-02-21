"use client"
import { useState, useEffect, useRef } from "react";
import GifList from "@/components/backgroundGif";
import Controls from "@/components/ControlButtons";
import { Player } from "@/components/VideoPlayer";
import { Songs } from "@/lib/songs";
import { TopbarRight } from "@/components/TopbarRight";
import { useAppDispatch } from "@/hooks/hooks";
import { visibility } from "@/features/todoSlice";


export default function Home() {
    const [currentGif, setCurrentGif] = useState(0);
    const [currentSong, setCurrentSong] = useState(0);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const iframeRef = useRef(null);
    const [time, setTime] = useState(new Date());
    const [sidebar, setSidebar] = useState(false)
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Add click listener for first visit
        const handleFirstClick = () => {
            if (isFirstVisit) {
                setIsFirstVisit(false);
                setIsPlaying(true);
                playVideo();
            }
        };

        if (isFirstVisit) {
            document.addEventListener('click', handleFirstClick);
        }

        return () => {
            document.removeEventListener('click', handleFirstClick);
        };
    }, [isFirstVisit]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
    
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date: Date) => {
        let hours: string | number = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours.toString().padStart(2, '0');
        
        return `${hours}:${minutes} ${ampm}`;
    };

    const playVideo = () => {
        if (iframeRef.current) {
            type YouTubePlayer = {
                contentWindow: {
                    postMessage: (message: string, targetOrigin: string) => void;
                };
            };
    
            // Assert the ref type
            const iframe = iframeRef.current as YouTubePlayer;
    
            iframe.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                '*'
            );
        }
    };

    const pauseVideo = () => {
        if (iframeRef.current) {
            type YouTubePlayer = {
                contentWindow: {
                    postMessage: (message: string, targetOrigin: string) => void;
                };
            };
    
            // Assert the ref type
            const iframe = iframeRef.current as YouTubePlayer;
    
            iframe.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                '*'
            );
        }
    };

    const togglePlay = () => {
        if (isPlaying) {
            pauseVideo();
        } else {
            playVideo();
        }
        setIsPlaying(!isPlaying);
    };
    
    const handleNext = () => {
        const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
        setCurrentGif(count => (count + newCount) % GifList.length);
        setCurrentSong(currentSong=>(currentSong+1)%10)
        setTimeout(()=>{playVideo()}, 500)
    };
    const handlePrev = () => {
        const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
        setCurrentGif(count => (count + newCount) % GifList.length);
        setCurrentSong(currentSong=>(currentSong-1))
        setTimeout(()=>{playVideo()}, 500)
    };
    const handleShuffle = () => {
        const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
        const newSong = (Math.ceil(Math.random() * (Songs.length - 1)));
        setCurrentGif(count => (count + newCount) % GifList.length);
        setCurrentSong(currentSong=>(currentSong+newSong)%Songs.length)
        setTimeout(()=>{playVideo()}, 1000)
    };

    return (
        <div className="text-white relative max-h-screen w-full">
            {sidebar && (
                    <div className="absolute h-screen w-full z-50 bg-black/50">
                        <div className="absolute max-h-screen h-full right-0 border-l-2">
                            <div className="m-5 ">
                                <div className="flex justify-end text-white/60">
                                    <button className="border border-white/60 px-2 rounded" onClick={()=>setSidebar(false)}>X</button>
                                </div>
                                {Songs.map((song, index)=>{
                                    return <div key={index} className="py-3 text-lg">
                                        <button className="" onClick={()=>{
                                            const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
                                            setCurrentGif(count => (count + newCount) % GifList.length);
                                            setCurrentSong(parseInt(song.id)-1)
                                            setTimeout(()=>{playVideo()}, 1000)
                                            }}>
                                            {song.id + "."} {song.title}
                                        </button>
                                    </div>
                                })}
                            </div>
                        </div>

                    </div>
                
            )}
            <div className="flex flex-col justify-between overflow-hidden p-8 h-screen w-full">
                {GifList[currentGif].gif}
                {!isFirstVisit &&(
                    <div className="flex justify-between relative">
                        <div className="flex flex-col text-lg gap-y-3">
                            <div>
                                <button className="" onClick={()=>{setSidebar(true)
                                    dispatch(visibility(false))
                                }}>
                                    Now Playing: {Songs[currentSong].title}
                                </button>
                            </div>
                            <div className="text-4xl ">{formatTime(time)}</div>
                            <div>We have a bunch of lofi songs to help you relax, focus, or chill</div>
                        </div>
                        <div className="flex gap-x-4 items-start">
                            <TopbarRight />
                        </div>
                    </div>
                )}
                
                <div className="relative text-white flex">
                    {isFirstVisit && (
                        <div className="flex h-screen w-full justify-center items-center text-4xl text-white ">
                            <div>Click anywhere to start</div>
                            
                        </div>
                    )}
                    {!isFirstVisit && (<div className="flex items-center mb-4">
                        <Controls isPlaying={isPlaying} togglePlay={togglePlay} handleNext={handleNext} handlePrev={handlePrev} handleShuffle={handleShuffle}/>
                        </div>
                    )}
                </div>
                
                <div className="pointer-events-none select-none top-full left-full hidden">
                    <Player iframeRef={iframeRef} url={Songs[currentSong].url}/>
                </div>
            </div>
        </div>
    );
}




{/* <button className="flex items-center mr-[10px] text-left text-shadow-glow-green">
    <svg width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1H3V8H4V7H5V6H6V5H7V4H6V3H5V2H4V1Z" fill="white"/>
    </svg>
</button>
<button className="flex items-center mr-[10px] text-left text-shadow-glow-green">
    <svg width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 1H6V3H4V5H2V6H1V7H3V6H5V4H7V3H8V2H7V1Z" fill="white"/>
        <path d="M3 2H1V3H2V4H3V2Z" fill="white"/>
        <path d="M8 6H7V5H6V8H7V7H8V6Z" fill="white"/>
    </svg>
</button>
<button className="flex items-center mr-[10px] text-left text-shadow-glow-green">
    <svg width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 1H5V3H6V2H7V1H8V8H7V7H6V6H5V8H4V7H3V6H2V5H1V4H2V3H3V2H4V1Z" fill="white"/>
    </svg>
</button>
<button className="flex items-center mr-[10px] text-left text-shadow-glow-green">
    <svg width="20" height="20" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 1H3V2H4V3H5V1H6V2H7V3H8V4H9V5H8V6H7V7H6V8H5V6H4V7H3V8H2V1Z" fill="white"/>
    </svg>
</button> */}