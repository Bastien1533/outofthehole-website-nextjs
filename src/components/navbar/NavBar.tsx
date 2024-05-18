import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "@/public/OOTH_logo.png";
import BarLink from "@/components/navbar/BarLink";
import LogoImg from "@/app/GameWaveLogoImg"
import Link from "next/link";
import {GithubRepoCard} from "@/components/github_card";

export default function NavBar() {
    return <div className={"flex justify-between items-center px-2 w-screen bg-background"}>
                <NavigationMenu className="w-full py-2">
                    <NavigationMenuList className="flex gap-7 ml-2">
                        <NavigationMenuItem>
                            <Link href={"/"} legacyBehavior passHref>
                                <div className={"cursor-pointer"}>
                                    {LogoImg(150, 100)}
                                </div>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="flex flex-row gap-7 text-oth_yellow">
                            {BarLink("Présentation", "presentation")}
                            {BarLink("Jouer", "play")}
                            {BarLink("L'équipe", "team")}
                            {BarLink("Galerie", "gallery")}
                            {BarLink("Actus", "news")}
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
        {GithubRepoCard("Gamewaves", "OutOfTheHole")}
                
    </div>
}

