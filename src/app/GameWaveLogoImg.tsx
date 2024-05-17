import Image from "next/image";
import bgImage from "@/public/bg.png"
import logo from "@/public/gamewaveLogo.png";

export default function LogoImg(width:number, height:number) {
    return <Image
        alt={"logo"}
        src={logo}
        width={width}
        height={height}
        style={{
            aspectRatio: 1398 / 450
        }}
        className="rounded-2xl"
    />
}