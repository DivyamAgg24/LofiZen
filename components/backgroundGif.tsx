import Image from "next/image";

const gifs = [
    {
        id : "1",
        gif : <Image src="/coffee-store.gif" alt="Coffee Store" unoptimized={false} width={100} height={100} className="absolute aspect-video w-[100vw] h-[100vh] top-0 left-0 object-cover z-0" />
    },
    {
        id : "2",
        gif : <Image src="/studying.gif" alt="Study" unoptimized={false} width={100} height={100} className="absolute aspect-video w-[100vw] h-[100vh] top-0 left-0 object-cover z-0" />
    },
    {
        id : "3",
        gif : <Image src="/car.gif" alt="Car" unoptimized={false} width={100} height={100} className="absolute aspect-video w-[100vw] h-[100vh] top-0 left-0 object-cover z-0" />
    },
    {
        id : "4",
        gif : <Image src="/moon.gif" alt="Moon" layout="fill" className="absolute" />
    },
    {
        id : "5",
        gif : <Image src="/cdplayer.gif" alt="CD Player" layout="fill" className="absolute" />
    },
    {
        id : "6",
        gif : <Image src="/rain.gif" alt="Kyoto Rain" layout="fill" className="absolute" />
    },
    {
        id : "7",
        gif : <Image src="/cigarette.gif" alt="Cigarette" layout="fill" className="absolute" />
    },
    {
        id : "8",
        gif : <Image src="/sakura.gif" alt="Sakura" layout="fill" className="absolute" />
    },
    {
        id : "9",
        gif : <Image src="/sleepinggirl.gif" alt="Sleeping Girl" layout="fill" className="absolute" />
    },
    {
        id : "10",
        gif : <Image src="/room.gif" alt="Room" layout="fill" className="absolute" />
    }
]

export default gifs;