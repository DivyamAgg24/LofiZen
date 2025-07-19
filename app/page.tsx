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
                setTimeout(() => playVideo(), 1000);
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

            try {
                iframe.contentWindow.postMessage(
                    '{"event":"command","func":"unMute","args":""}',
                    '*'
                );
                setTimeout(() => {
                    iframe.contentWindow.postMessage(
                        '{"event":"command","func":"playVideo","args":""}',
                        '*'
                    );
                }, 100);
            } catch (error) {
                console.warn('Video control failed - likely due to browser restrictions');
            }
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

            try {
                iframe.contentWindow.postMessage(
                    '{"event":"command","func":"pauseVideo","args":""}',
                    '*'
                );
            } catch (error) {
                console.warn(`Video pause failed: ${error}`);
            }
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
        setCurrentSong(currentSong => (currentSong + 1) % 10)
        setTimeout(() => { playVideo() }, 800)
    };
    const handlePrev = () => {
        const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
        setCurrentGif(count => (count + newCount) % GifList.length);
        setCurrentSong(currentSong => (currentSong - 1))
        setTimeout(() => { playVideo() }, 800)
    };
    const handleShuffle = () => {
        const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
        const newSong = (Math.ceil(Math.random() * (Songs.length - 1)));
        setCurrentGif(count => (count + newCount) % GifList.length);
        setCurrentSong(currentSong => (currentSong + newSong) % Songs.length)
        setTimeout(() => { playVideo() }, 800)
    };

    return (
        <div className="text-white relative max-h-screen w-full">
            {sidebar && (
                <div className="absolute h-screen w-full z-50 bg-gradient-to-l from-black to-black/50">
                    <div className="absolute max-h-screen h-full right-0 border-l-2">
                        <div className="h-full flex flex-col">
                            <div className="m-5">
                                <div className="flex justify-end text-white/60">
                                    <button className="border border-white/60 px-2 rounded" onClick={() => setSidebar(false)}>X</button>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto mx-5 mb-5">
                                {Songs.map((song, index) => {
                                    return (
                                        <div key={index} className="py-3 text-lg">
                                            <button className="" onClick={() => {
                                                const newCount = (Math.ceil(Math.random() * (GifList.length - 1)));
                                                setCurrentGif(count => (count + newCount) % GifList.length);
                                                setCurrentSong(parseInt(song.id) - 1);
                                                setTimeout(() => { playVideo() }, 1000);
                                            }}>
                                                {song.id + "."} {song.title}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex flex-col justify-between overflow-hidden p-8 h-screen w-full">
                {GifList[currentGif].gif}
                {!isFirstVisit && (
                    <div className="flex justify-between relative">
                        <div className="flex flex-col lg:text-2xl text-xl gap-y-3">
                            <div>
                                <button className="" onClick={() => {
                                    setSidebar(true)
                                    dispatch(visibility(false))
                                }}>
                                    Now Playing: {Songs[currentSong].title}
                                </button>
                            </div>
                            <div className="text-4xl ">{formatTime(time)}</div>
                            {/* <div>We have a bunch of lofi songs to help you relax, focus, or chill</div> */}
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
                        <Controls isPlaying={isPlaying} togglePlay={togglePlay} handleNext={handleNext} handlePrev={handlePrev} handleShuffle={handleShuffle} />
                    </div>
                    )}
                </div>

                <div className="pointer-events-none select-none top-full left-full hidden">
                    <Player iframeRef={iframeRef} url={Songs[currentSong].url} />
                </div>
            </div>
        </div>
    );
}