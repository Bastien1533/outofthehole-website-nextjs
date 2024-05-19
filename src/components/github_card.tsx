import {useState, useEffect} from "react";
import {json} from "node:stream/consumers";
import Image from "next/image";
import GithubCatWhite from "@/public/github-mark-white.svg"


interface GitHubProfile {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
    name: any
    company: any
    blog: string
    location: any
    email: any
    hireable: any
    bio: string
    twitter_username: any
    public_repos: number
    public_gists: number
    followers: number
    following: number
    created_at: string
    updated_at: string
}

export function GithubRepoCard(org_name:string,  repo_name:string){
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;

    const ReqHeaders = new Headers()
    if (token != null){
        ReqHeaders.set("Authorization", token)
    }

    useEffect(() => {
        fetch(`https://api.github.com/repos/${org_name}/${repo_name}`, {
            method: "GET",
            headers:  {
                "Authorization": token,
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
        return (
            <a href={data.html_url}>
                <div className={"flex justify-between items-center px-2 text-white mr-5 gap-2"}>
                    <Image src={GithubCatWhite} alt={"github"} width={40} height={40} className={""}/>
                    <div className={"flex flex-col"}>
                        <span className={"font-medium"}>{data.full_name}</span>
                        <span className={"opacity-80 font-normal"}>{data.description}</span>
                    </div>
                </div>
            </a>
        )
    }
}


export function GithubCard(name:string, gh_name: string) {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const token: string = process.env.NEXT_PUBLIC_SECRET_KEY == undefined ? "" : process.env.NEXT_PUBLIC_SECRET_KEY;
    
    
    useEffect(() => {
        fetch(`https://api.github.com/users/${gh_name}`, {
            method: "GET",
            headers:  {
            "Authorization": token,
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
        let profile = data as GitHubProfile
        return (<a href={profile.html_url}>
            <div className={"flex items-center py-2 px-5 gap-7 bg-oth_yellow rounded-lg"}>
                <Image className={"rounded-full"} src={profile.avatar_url} alt={"test"} width={100} height={100}></Image>
                <span>{name}</span>
            </div>
        </a>)
    }
    
}