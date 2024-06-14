import PageLayout from "@/pages/layout";
import {GithubCard} from "@/components/github_card";
import {GitHubProfile, RepoRelease} from "@/models/github";
import type {GetServerSideProps, InferGetServerSidePropsType} from "next";


export const getServerSideProps = (async () => {

    const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;
    
    // Team Data Fetching
    const team = (process.env.NEXT_PUBLIC_TEAM== undefined ? "" : process.env.NEXT_PUBLIC_TEAM).split(",");
    let team_data_dict : {} = {};
    for (const member in team) {
        const res = await fetch(`https://api.github.com/users/${team[member]}`, {
            method: "GET",
            headers: {
                "Authorization": `${token==""?"":"Bearer"} ${token}`, // if the key is not present, Bearer should be removed.
            }});
        (team_data_dict as any)[team[member]] = await res.json()
    }
    let team_data = JSON.stringify(team_data_dict)
    
    
    return { props: { team_data } }
}) satisfies GetServerSideProps<{ team_data: string }>

export default function TeamPage({team_data,} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    return <PageLayout>
        <div className={"flex justify-evenly px-2"}>
            <div className={"flex flex-col gap-7"}>
                <span className={"mt-24 text-oth_yellow text-7xl text-center" }>The Team</span>
                <div className={"flex justify-center"}>
                    <div className={"grid max-sm:grid-cols-1 grid-cols-2 w-fit gap-7 max-sm:gap-2"}>
                        {GithubCard("Bastien Pinaud","Bastien1533", team_data)}
                        {GithubCard("Louis Gallet","l0u1sg", team_data)}
                        {GithubCard("Titouan Lamy","Drakwrizz", team_data)}
                        {GithubCard("Hugo Cohen","Yoplyy", team_data)}
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>;
}