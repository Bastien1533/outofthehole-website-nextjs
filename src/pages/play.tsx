import PageLayout from "@/pages/layout";
import {wait} from "next/dist/lib/wait";
import {useEffect, useState} from "react";
import downloadLinksConfig from "@/data/downloadLinks.json"
import Image from "next/image";

import appleLogo from "@/public/os_logo/apple.svg"
import windowsLogo from "@/public/os_logo/windows.svg"
import linuxLogo from "@/public/os_logo/linux.png"
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import {RepoRelease, Release, ReleaseAsset} from "@/models/github";


export const getServerSideProps = (async () => {
    
    const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;
    const org_name = process.env.NEXT_PUBLIC_ORG_NAME;
    const repo_name = process.env.NEXT_PUBLIC_REPO_NAME;
    const res = await fetch(`https://api.github.com/repos/${org_name}/${repo_name}/releases`, {
        method: "GET",
        headers: {
            "Authorization": `${token==""?"":"Bearer"} ${token}`, // if the key is not present, Bearer should be removed.
        }})
    const json_releases = await res.json()
    const releases: RepoRelease = json_releases
    console.log(json_releases)
    // Pass data to the page via props
    return { props: { releases } }
}) satisfies GetServerSideProps<{ releases: RepoRelease }>

export function GetLatestRelease({releases, }: InferGetServerSidePropsType<typeof getServerSideProps>) : { mac: string; win: string; linux: string } {
    //const [data, setData] = useState()
    let release_platform = {mac: "", win: "", linux: ""}
    
    if (releases) {
        const release = releases[0] as Release
        for (let index in release.assets) {
            let asset = release.assets[index] as ReleaseAsset;
            if (asset.name.includes("Linux")) {
                release_platform.linux = asset.browser_download_url
            } else if (asset.name.includes("dmg")) {
                release_platform.mac = asset.browser_download_url
            } else if (asset.name.includes("Windows")) {
                release_platform.win = asset.browser_download_url
            }
        }
        
    } else {
        release_platform.mac = downloadLinksConfig.mac
        release_platform.win = downloadLinksConfig.win
        release_platform.linux = downloadLinksConfig.linux
    }
    return release_platform
}


function RecommandedDownload({releases,} : InferGetServerSidePropsType<typeof getServerSideProps>) {
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

    let release_platform = GetLatestRelease({releases})

    switch (os) {
        case 'Win32':
            downloadLink = release_platform.win
            osFriendly = "Windows";
            break;
        case 'MacIntel':
            downloadLink = release_platform.mac
            osFriendly = "MacOS";
            break;
        case 'X11':
            downloadLink = release_platform.linux
            osFriendly = "Linux";
            break;
        case 'Linux':
            downloadLink = release_platform.linux
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

function OsWidget(os: string, {releases,} : InferGetServerSidePropsType<typeof getServerSideProps>){
    let image;
    let ostext;
    let link;
    
    let size:number = 200;

    let release_platform: { mac: string; win: string; linux: string };
    release_platform = GetLatestRelease({releases})
    
    switch (os){
        case "MacOs":
            image = appleLogo;
            ostext = "One must believe that there are games for Mac."
            link = release_platform.mac
            break
        case "Windows":
            image = windowsLogo;
            ostext = "A game better coded than the OS. Sorry Microsoft."
            link = release_platform.win
            break
        case "Linux":
            image = linuxLogo;
            ostext = "Warning to bearded men, we are thinking of you."
            link = release_platform.linux
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



export default function TeamPage({releases,} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <PageLayout>
        <div className={"flex flex-col gap-10"}>
                    <div className={"flex flex-col  gap-7 items-center"}>
                        <span className={"text-oth_yellow text-7xl mt-16"}>Ready to Play ?</span>
                        {RecommandedDownload({releases})}
                    </div>
                <div className={"h-screen"}>
                    <div className={"flex justify-evenly bg-background w-screen h-full pb-48"}>
                        {OsWidget("MacOs", {releases})}
                        {OsWidget("Windows", {releases})}
                        {OsWidget("Linux", {releases})}
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
    return platform;
}
