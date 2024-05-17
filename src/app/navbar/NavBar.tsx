import {NavigationMenu, NavigationMenuItem, NavigationMenuList} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "@/public/OOTH_logo.png";
import BarLink from "@/app/navbar/BarLink";
import LogoImg from "@/app/GameWaveLogoImg"

export default function NavBar(){
    return <NavigationMenu className="w-full py-2">
        <NavigationMenuList className="flex gap-7  ml-2">
            <NavigationMenuItem >
                {LogoImg(150,100)}
            </NavigationMenuItem>
            <NavigationMenuItem className="flex flex-row gap-7 text-black">
                {BarLink("Présentation", undefined)}
                {BarLink("Jouer", undefined)}
                {BarLink("L'équipe", undefined)}
                {BarLink("Galerie", undefined)}
                {BarLink("Actus", undefined)}
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
}

