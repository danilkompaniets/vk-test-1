import React from "react";
import {LoadingSpinner} from "@/components/loading-spinner.tsx";
import {RepositoryCard} from "@/components/RepositoryCard.tsx";
import {useAppSelector} from "../../hooks/hooks.ts";
import {selectRepositories} from "@/features/repositories/repositoriesSlice.ts";

export const RepositoryList: React.FC = () => {
    const {repositories, error, loading} = useAppSelector(selectRepositories)

    return (
        <div className="flex flex-col items-center p-4">
            <div className="grid gap-4 w-full max-w-3xl">
                {repositories.map((repository) => (
                    <RepositoryCard repository={repository} key={repository.id}/>
                ))
                }
            </div>

            {loading && <LoadingSpinner className={"mt-4"}/>}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};