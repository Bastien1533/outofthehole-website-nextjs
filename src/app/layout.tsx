import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Kode_Mono} from "next/font/google";
import "./globals.css";
import AppBgImg from "@/app/AppImgBg";
import NavBar from "@/components/navbar/NavBar";

const inter = Inter({subsets: ["latin"]});
const kode = Kode_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Out Of The Hole",
    description: "The best game ever released",
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`overflow-x-clip overflow-y-scroll no-scrollbar ${kode.className}`}>
                <AppBgImg/>
                {children}
            </body>
        </html>
    );
}
