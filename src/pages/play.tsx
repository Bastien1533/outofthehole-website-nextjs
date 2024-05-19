import PageLayout from "@/pages/layout";
import {wait} from "next/dist/lib/wait";
import {useEffect, useState} from "react";
import downloadLinksConfig from "@/data/downloadLinks.json"
import Image from "next/image";

import appleLogo from "@/public/os_logo/apple.svg"
import windowsLogo from "@/public/os_logo/windows.svg"
import linuxLogo from "@/public/os_logo/linux.png"
import {release} from "node:os";
import {object} from "prop-types";

function GetLatestRelease(org_name: string, repo_name: string): { mac: string, win: string, linux: string } {
    const [data, setData] = useState()
    let releases = {mac: "", win: "", linux: ""}

    useEffect(() => {
        const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;
        fetch(`https://api.github.com/repos/${org_name}/${repo_name}/releases`, {
            method: "GET",
            headers: {
                "Authorization" : token
            }

        })
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                setData(data)
            })
    }, [])
    if (data) {
        const release = data[0]
        console.log(release)
        for (let asset in release.assets) {
            asset = release.assets[asset]
            console.log(asset)
            if (asset.name.includes("Linux")) {
                releases.linux = asset.browser_download_url
            } else if (asset.name.includes("dmg")) {
                releases.mac = asset.browser_download_url
            } else if (asset.name.includes("Windows")) {
                releases.win = asset.browser_download_url
            }
        }
        ;
    } else {
        releases.mac = downloadLinksConfig.mac
        releases.win = downloadLinksConfig.win
        releases.linux = downloadLinksConfig.linux
    }
    return releases
}


function RecommandedDownload() {
    // Show the good os download link based on the user's os
    let downloadLink: string;
    let osFriendly:string;
    let downloadLinkText: string = ""
    let downloadText: string = "";
    let used_os:string;
    
    let os: string;
    let setOs: any;


    [os, setOs] = useState('Null');
    
    useEffect(() => {
        setOs(getOs())
    }, []);

    let releases: { mac: string; win: string; linux: string };
    releases = GetLatestRelease("GameWaves", "OutOfTheHole")

    switch (os) {
        case 'Win32':
            downloadLink = releases.win
            osFriendly = "Windows";
            break;
        case 'MacIntel':
            downloadLink = releases.mac
            osFriendly = "MacOS";
            break;
        case 'X11':
            downloadLink = releases.linux
            osFriendly = "Linux";
            break;
        case 'Linux':
            downloadLink = releases.linux
            osFriendly = "Linux";
            break;
        default:
            downloadLink = "#alternative-download"
            downloadText = "Oups, we couldn't detect your OS. Please choose your OS below."
            osFriendly = ""
            downloadLinkText = "⬇️ Choose your OS below"
    }

    downloadText = downloadText==""?`You are currently running on:  ${osFriendly}`:downloadLinkText
    downloadLinkText = downloadText==""?`⬇️ Download for ${osFriendly}`:downloadText;
    
    // return {downloadLink: downloadLink, downloadLinkText:downloadLinkText, osFriendly:osFriendly, downloadText:downloadText}
    
    return (
        <div className={"flex flex-col items-center gap-5  bg-background rounded-lg p-5 "}>
            <span className={"text-oth_yellow font-medium text-2xl"}>{downloadLinkText}</span>
            <a className={"text-black text-base font-medium bg-white rounded-lg px-5 py-2"} href={downloadLink}>{`⬇️ Download for ${osFriendly}`}</a>
        </div>)
    ;
}

function OsWidget(os: string){
    let image;
    let ostext;
    let link;
    
    let size:number = 200;

    let releases: { mac: string; win: string; linux: string };
    releases = GetLatestRelease("GameWaves", "OutOfTheHole")
    
    switch (os){
        case "MacOs":
            image = appleLogo;
            ostext = "One must believe that there are games for Mac."
            link = releases.mac
            break
        case "Windows":
            image = windowsLogo;
            ostext = "A game better coded than the OS. Sorry Microsoft."
            link = releases.win
            break
        case "Linux":
            image = linuxLogo;
            ostext = "Warning to bearded men, we are thinking of you."
            link = releases.linux
            break
        default:
            ostext = ""
            image = ""
    }
    
    return (
        <div className={"flex flex-col items-center p-10 gap-2 justify-evenly"}>
                <Image src={image} alt={"hey"} width={size} height={size}/>
            <span className={"text-white text-2xl font-bold"}>{os}</span>
            <span className={"text-white text-base font-medium"}>{ostext}</span>
            <a className={"text-black text-base font-medium bg-white rounded-lg px-5 py-2"} href={link}>{`⬇️ Download for ${os}`}</a>
        </div>
    )
}

export default function TeamPage() {
    return <PageLayout>
        <div className={"flex flex-col gap-10"}>
                    <div className={"flex flex-col  gap-7 items-center"}>
                        <span className={"text-oth_yellow text-7xl mt-16"}>Ready to Play ?</span>
                        {RecommandedDownload()}
                    </div>
                <div className={"h-screen"}>
                    <div className={"flex justify-evenly bg-background w-screen h-full pb-48"}>
                        {OsWidget("MacOs")}
                        {OsWidget("Windows")}
                        {OsWidget("Linux")}
                    </div>
                </div>
        </div>
    </PageLayout>;
}

const getOs = () => {
    let platform: string = (global as any).window?.navigator.platform;
    if (platform == undefined) {
        platform = "Null";

    }
    if (platform.includes("linux") || platform.includes("Linux") || platform.includes("X11")) {
        platform = "Linux";
    }
    console.log("Hey, I'm running on ", platform);
    return platform;
}
