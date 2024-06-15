import PageLayout from "@/pages/layout";

import demo0 from "@/public/core.gif"
import demo1 from "@/public/city.png";
import demo2 from "@/public/demo2.png";
import demo3 from "@/public/demo3.png";

import Image from "next/image";


export default function TeamPage() {
    return <PageLayout>
        <div className={"flex justify-evenly px-2 max-sm:mb-20"}>
            <div className={"flex flex-col gap-7"}>
                <span className={"mt-24 text-oth_yellow text-7xl text-center" }>Gallery</span>
                <div className={"flex justify-center"}>
                    <div className={"grid max-sm:grid-cols-1 grid-cols-2 w-fit gap-7 max-sm:gap-2"}>
                        <Image src={demo0} alt={"demo image"} width={2560 / 5} height={1126 / 5}
                               className={"rounded-lg shadow-md"}/>
                        <Image src={demo1} alt={"demo image"} width={2560 / 5} height={1126 / 5}
                               className={"rounded-lg shadow-md"}/>
                        <Image src={demo2} alt={"demo image"} width={2560 / 5} height={1126 / 5}
                               className={"rounded-lg shadow-md"}/>
                        <Image src={demo3} alt={"demo image"} width={2560 / 5} height={1126 / 5}
                               className={"rounded-lg shadow-md"}/>
                        
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>;
}