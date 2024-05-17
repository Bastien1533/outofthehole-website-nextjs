'use client'

import NavBar from "@/app/navbar/NavBar";
import LogoImg from "@/app/LogoImg";
import {red} from "next/dist/lib/picocolors";



export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
        <div className="flex  w-full bg-background">
            {NavBar()}
        </div>
      <div className="flex flex-col gap-7 items-center text-7xl text-oth_yellow mt-16 text-shadow-lg shadow-black">
              {LogoImg(300,300)}
          <span className="">Out Of The Hole</span>
      </div>
        
    </main>
  );
}
