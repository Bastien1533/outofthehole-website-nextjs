import Image from "next/image";
import bgImage from "@/public/bg.png"

export default function AppBgImg() {
    return <Image
        src={bgImage}
        alt={""}
        placeholder="blur"
        fill
        sizes="100vw"
        style={{
            backgroundSize: 'cover',
            objectFit: 'cover',
            zIndex: -1
        }}
    />
}