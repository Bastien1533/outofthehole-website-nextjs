'use client'

import NavBar from "@/components/navbar/NavBar";
import LogoImg from "@/app/LogoImg";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center">
            {NavBar()}
            <div
                className="flex flex-col gap-7 items-center text-7xl text-oth_yellow mt-16 text-shadow-lg shadow-black">
                {LogoImg(300, 300)}
                <div className="flex justify-around h-screen w-screen bg-background py-16">
                    <span className="">Out Of The Hole</span>
                </div>
            </div>

        </main>
    );
}
