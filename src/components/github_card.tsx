import {useState, useEffect} from "react";
import {json} from "node:stream/consumers";
import Image from "next/image";
import GithubCatWhite from "@/public/github-mark-white.svg"
import { GitHubRepo, RepoRelease, GitHubProfile } from "@/models/github";



export function GithubRepoCard(org_name:string,  repo_name:string){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;

    useEffect(() => {
        fetch(`https://api.github.com/repos/${org_name}/${repo_name}`, {
            method: "GET",
            headers:  {
                "Authorization": `${token==""?"":"Bearer"} ${token}`, // if the key is not present, Bearer should be removed.
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, [])
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    else {
        let parsed_data = data as GitHubRepo;
        return (
            <a href={parsed_data.html_url}>
                <div className={"flex justify-between items-center px-2 text-white mr-5 gap-2"}>
                    <Image src={GithubCatWhite} alt={"github"} width={40} height={40} className={""}/>
                    <div className={"flex flex-col"}>
                        <span className={"font-medium"}>{parsed_data.full_name}</span>
                        <span className={"opacity-80 font-normal overflow-clip"}>{parsed_data.description}</span>
                    </div>
                </div>
            </a>
        )
    }
}


export function GithubCard(name:string, gh_name: string, team_data:string) {
    let profile = JSON.parse(team_data)[gh_name] as GitHubProfile
    return (<a href={profile.html_url}>
        <div className={"flex items-center py-2 px-5 gap-7 bg-oth_yellow rounded-lg"}>
            <Image className={"rounded-full"} src={profile.avatar_url} alt={"test"} width={100} height={100}></Image>
            <span>{name}</span>
        </div>
    </a>)
    
    
}