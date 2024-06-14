import PageLayout from "./layout";
import demo1 from "@/public/bg2.png"
import Image from "next/image";
import astronaute from "@/public/astronaute.png";
import pres_text from "@/data/pres_text.json"


export default function TeamPage() {
    return <PageLayout>
        <div className={"flex flex-col justify-evenly"}>
            <div className={"flex flex-col h-full gap-7 items-center bg-background p-5 mt-28"}>
                <span className={"text-oth_yellow max-sm:text-3xl sm:max-md:text-6xl text-7xl text-center"}>About OutOfTheHole</span>
                <div className={"grid grid-cols-2 max-sm:grid-cols-1 max-sm:gap-4"}>
                    <div className={"flex flex-col items-center text-center gap-7 h-full "}>
                        <span className={" text-oth_yellow text-1xl sm:w-2/3"}>
                        {pres_text.para1} {pres_text.para2}
                        </span>
                        <span className={"font-bold text-2xl text-oth_yellow text-1xl w-2/3"}>
                        {pres_text.para3}
                        </span>

                    </div>
                    <Image src={demo1} alt={"demo image"} width={2560 / 4} height={1126 / 4}
                           className={"rounded-lg shadow-md shadow-oth_yellow/20"}/>
                </div>
            </div>
            <div className={"flex w-full justify-end px-24"}><Image src={astronaute} alt="logo" height={(954 / -6)}
                                                                    width={624 / 6}
                                                                    style={{transform: "scaleX(-1) scaleY(-1)"}}/></div>
        </div>
    </PageLayout>;
}