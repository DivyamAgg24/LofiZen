import Image from "next/image"

const Controls = ({isPlaying, togglePlay, handleNext, handlePrev, handleShuffle}: {isPlaying: boolean, togglePlay: () => void, handleNext: () => void, handlePrev: () => void, handleShuffle: ()=>void}) => {
    return <>
        <button className="flex items-center h-[20px] mr-[10px] " onClick={togglePlay}>
            {!isPlaying ? <Image src="/play.1055bee622213985d4ecb5fe784e4cef.svg" className="filter hover:brightness-125 transition-all duration-200 " width={20} height={20} alt="play"/>: <Image src="/pause.69ddfc29dadcaf882ae65492bd66a328.svg" className="filter hover:brightness-125 transition-all duration-200 " width={20} height={20} alt="play"/>}
            </button>
        <button className="flex items-center h-[20px] mr-[10px] " onClick={handleShuffle}>
            <Image src="/shuffle.53b14e6b44f6ab0d48ffa84fb5075f64.svg" className="filter hover:brightness-125 transition-all duration-200 " width={20} height={20} alt="play" />
            </button>
        <button className="flex items-center h-[20px] mr-[10px] " onClick={handlePrev}>
            <Image src="/previous.17bb0c5758c4d87762a0aa8acd55d6e7.svg" className="filter hover:brightness-125 transition-all duration-200 " width={18} height={18} alt="play" />
            </button>
        <button className="flex items-center h-[20px] mr-[10px] " onClick={handleNext}>
            <Image src="/forward.64c7a860feca4d95b46009f7a885fb1f.svg" className="filter hover:brightness-125 transition-all duration-200 " width={18} height={18} alt="play" />
            </button>
    </>
}




export default Controls


// drop-shadow-[0_0_4px_#00ff00]
// hover:drop-shadow-[0_0_8px_#00ff00]