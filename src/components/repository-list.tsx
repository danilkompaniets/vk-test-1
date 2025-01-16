import React, {useEffect} from "react";
import {LoadingSpinner} from "@/components/loading-spinner";
import {RepositoryCard} from "@/components/repository-card";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {incrementPage, selectRepositories} from "@/features/repositories/repositoriesSlice";
import {fetchRepositories} from "@/features/repositories/repositoriesThunks";

export const RepositoryList: React.FC = () => {
    const {repositories, error, loading, searchQuery} = useAppSelector(selectRepositories);
    const dispatch = useAppDispatch();

    function debounce<F extends (...args: any[]) => void>(
        func: F,
        delay: number
    ): (...args: Parameters<F>) => void {
        let timeoutId: ReturnType<typeof setTimeout>;

        return function (...args: Parameters<F>): void {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    }

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 1440;
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;

            if (pageHeight - threshold < scrollPosition && !loading) {
                console.log(searchQuery);
                dispatch(
                    fetchRepositories({
                        ...searchQuery,
                        page: searchQuery.page + 1,
                    })
                );
                dispatch(incrementPage());
            }
        };

        const debouncedHandleScroll = debounce(handleScroll, 1000);

        window.addEventListener("scroll", debouncedHandleScroll);

        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll);
        };
    }, [dispatch, loading, searchQuery]);

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className={"text-center text-white text-xl mb-2 -mt-2"}>
                Your search results  🔍
            </h2>
            <div className="grid gap-4 w-full max-w-3xl">
                {repositories.ids.map((repositoryId) => (
                    <RepositoryCard
                        repository={repositories.entities[repositoryId]!} // Non-null assertion
                        key={repositoryId}
                    />
                ))}
            </div>

            {loading && <LoadingSpinner className="mt-4"/>}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
};