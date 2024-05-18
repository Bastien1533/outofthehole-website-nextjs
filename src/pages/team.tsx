import PageLayout from "@/pages/layout";
import {GithubCard} from "@/components/github_card";


export default function TeamPage() {
    return <PageLayout>
        <div className={"flex justify-evenly"}>
            <div className={"flex flex-col gap-7"}>
                <span className={"mt-24 text-oth_yellow text-7xl" }>The Team</span>
                <div className={"flex justify-center"}>
                    <div className={"grid grid-cols-2 w-fit gap-7"}>
                        {GithubCard("Bastien Pinaud","Bastien1533")}
                        {GithubCard("Louis Gallet","l0u1sg")}
                        {GithubCard("Titouan Lamy","Drakwrizz")}
                        {GithubCard("Hugo Cohen","Yoplyy")}
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>;
}