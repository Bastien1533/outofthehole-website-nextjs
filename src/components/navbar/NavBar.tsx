import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "@/public/OOTH_logo.png";
import BarLink from "@/components/navbar/BarLink";
import LogoImg from "@/app/GameWaveLogoImg"
import Link from "next/link";
import {GithubRepoCard} from "@/components/github_card";

function ToggleNavbar(id:string){
    let element = document.getElementById(id)
    //console.log(element)
    if (element != null){
        element.style.display = element.style.display=="none"?"block":"none"
    }
}

export default function NavBar() {
    const org_name = process.env.NEXT_PUBLIC_ORG_NAME==undefined?"GameWaves":process.env.NEXT_PUBLIC_ORG_NAME
    const repo_name = process.env.NEXT_PUBLIC_REPO_NAME==undefined?"OutofTheHole":process.env.NEXT_PUBLIC_REPO_NAME
    return <div className={"flex max-sm:flex-col justify-between items-center px-2 w-screen bg-background"}>
                <div className={"flex items-center w-full max-sm:justify-evenly justify-between"}>
                    <NavigationMenu className="w-full py-2">
                        <NavigationMenuList className="flex gap-7 ml-2">
                            <NavigationMenuItem>
                                <Link href={"/"} legacyBehavior passHref>
                                    <div className={"cursor-pointer"}>
                                        {LogoImg(150, 100)}
                                    </div>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <div className={"text-oth_yellow sm:hidden"} onClick={() => ToggleNavbar("mobile_navbar")}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                                         className="bi bi-list" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                    </svg>

                                </div>
                            </NavigationMenuItem>
                            <NavigationMenuItem id={"desktop_navbar"}
                                                className="flex flex-row sm:max-md:gap-2 gap-7 text-oth_yellow max-sm:hidden">
                                {BarLink("Présentation", "presentation")}
                                {BarLink("Jouer", "play")}
                                {BarLink("L'équipe", "team")}
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    {GithubRepoCard(org_name, repo_name)}
                </div>
            <div id={"mobile_navbar"} className="flex flex-row justify-center text-center sm:max-md:gap-2 gap-7 text-oth_yellow" style={{display: "none"}}>
                {BarLink("Présentation", "presentation")}
                {BarLink("Jouer", "play")}
                {BarLink("L'équipe", "team")}
                {BarLink("Galerie", "gallery")}
            </div>


    </div>
}

