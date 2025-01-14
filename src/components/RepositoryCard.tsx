import {Repository} from "../../types/types.ts";
import {Button, buttonVariants} from "@/components/ui/button.tsx";

interface RepositoryCardProps {
    repository: Repository;
}

export const RepositoryCard = ({repository}: RepositoryCardProps) => {
    return (
        <div className={"flex text-white justify-between p-4 bg-zinc-900 rounded-md "}>
            <div className={"flex flex-col gap-y-2"}>
                <span className={"flex gap-x-2"}>
                    <p className={"text-xl font-semibold"}>
                        {repository.name}
                    </p>
                    <div className={"border flex items-center justify-center text-sm border-gray-50 rounded-full px-2"}>
                        {repository.private ? "private" : "public"}
                    </div>
                </span>
                <div className={"flex flex-row gap-x-2"}>
                    <img className={"rounded-full h-6 w-6"} src={repository.owner.avatar_url} alt={"Profile picture"}/>
                    <p className={"text-md text-neutral-100"}>
                        {repository.owner.login}
                    </p>
                </div>
                <p className={"text-neutral-100"}>
                    {repository.description}
                </p>
                <div className={"flex gap-x-2 items-center flex-wrap"}>
                    <p className={"text-sm flex text-neutral-100"}>
                        🌟 {repository.stargazers_count}
                    </p>

                    <p className={"text-sm flex text-neutral-100"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={"20"} height={"20"} viewBox="0 0 24 24"
                             fill="none"
                             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="icon icon-tabler icons-tabler-outline icon-tabler-git-fork">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M7 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M17 6m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                            <path d="M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2"/>
                            <path d="M12 12l0 4"/>
                        </svg>
                        {repository.stargazers_count}
                    </p>

                </div>
                <a href={repository.html_url} className={buttonVariants({
                    variant: "outline",
                    size: "default",
                    className: "bg-neutral-700/50 w-fit"
                })}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                         className="">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path
                            d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"/>
                    </svg>
                    Go to github
                </a>
            </div>
            <div className={"flex flex-col gap-y-2"}>
                <Button className={"text-xl bg-neutral-800/50 font-semibold"}>
                    📝 Edit
                </Button>
                <Button variant={"destructive"} className={"text-xl bg-red-600/50 font-semibold"}>
                    🗑️ Delete
                </Button>
            </div>
        </div>
    )
}