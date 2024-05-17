import {NavigationMenuLink} from "@/components/ui/navigation-menu";
import Image from "next/image";
import bgImage from "@/public/bg.png";

export default function BarLink(text: string, onClick: undefined) {
    return <NavigationMenuLink className="bg-oth_yellow rounded-sm p-2.5 cursor-pointer hover:opacity-80" >{text}</NavigationMenuLink>
}

