import {NavigationMenuLink, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import Image from "next/image";
import bgImage from "@/public/bg.png";
import Link from "next/link";

export default function BarLink(text: string, page: string) {
    return <Link href={`/${page}`} legacyBehavior passHref>
        <NavigationMenuLink
            className={`rounded-sm p-2.5 cursor-pointer hover:opacity-80 font-bold text-lg`}>{text}</NavigationMenuLink>
    </Link>
}

