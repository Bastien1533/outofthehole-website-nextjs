'use client'

import NavBar from "@/components/navbar/NavBar";
import LogoImg from "@/app/LogoImg";
import Image from "next/image";
import astronaute from "@/public/astronaute.png"

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {NavBar()}
            <div
                className="flex flex-col  items-center text-7xl text-oth_yellow mt-16 text-shadow-lg shadow-black">
                <div className={""} >{LogoImg(300,300)}</div>
                <div className={"flex w-full justify-start px-24"}><Image src={astronaute} alt="logo" height={954/6} width={624/6}/></div>
                <div className="flex justify-around h-screen w-screen bg-background py-16">

                    <span className="">Out Of The Hole</span>
                </div>
            </div>

        </main>
    );
}
