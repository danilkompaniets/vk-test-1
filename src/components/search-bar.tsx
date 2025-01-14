import {FormEvent, useState} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {fetchRepositories} from "@/features/repositories/repositoriesThunks.ts";
import {selectRepositories, setSearchQuery} from "@/features/repositories/repositoriesSlice.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {SearchQuery} from "../../types/types.ts";
import {orderByOptions, sortByOptions} from "@/lib/constants.ts";

interface SearchBarProps {
    placeholder: string,
    containerClassName?: string,
    buttonText?: string,
}

export const SearchBar = ({
                              buttonText = "Search",
                              placeholder = "Search...",
                              containerClassName,
                          }: SearchBarProps) => {
    const dispatch = useAppDispatch();
    const {page, loading} = useAppSelector(selectRepositories)
    const [searchState, setSearchState] = useState<SearchQuery>({
        searchTerm: "",
        sort: "",
        order: "asc",
        page: page
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(setSearchQuery(searchState))
        dispatch(fetchRepositories(searchState))
    };

    return (
        <form
            className={cn("w-full flex flex-col gap-y-2", containerClassName)}
            onSubmit={handleSubmit}
        >
            <div className={"w-full flex gap-x-2"}>
                <Input
                    id="search-bar-input"
                    aria-label={placeholder}
                    className={"w-full focus:bg-white bg-neutral-600"}
                    placeholder={placeholder}
                    value={searchState.searchTerm}
                    onChange={(e) => {
                        setSearchState({
                            order: searchState.order,
                            page: searchState.page,
                            sort: searchState.sort,
                            searchTerm: e.target.value
                        })
                    }}
                />
                <Button
                    type="submit"
                    disabled={loading || !searchState.searchTerm}
                >
                    {buttonText}
                </Button>
            </div>
            <div className={"flex gap-x-2"}>
                <Select
                    onValueChange={(value) => {
                        setSearchState({
                            searchTerm: searchState.searchTerm,
                            sort: value,
                            order: searchState.order,
                            page: searchState.page,
                        })
                    }}>
                    <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-600 text-white">
                        <SelectValue placeholder="Sort by"/>
                    </SelectTrigger>
                    <SelectContent className={"bg-neutral-800 text-white border-none"}>
                        {
                            sortByOptions.map((option, index) => (
                                <SelectItem value={option.value} key={index}>
                                    {option.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>
                <Select
                    defaultValue={"asc"}
                    onValueChange={(value) => {
                        setSearchState({
                            searchTerm: searchState.searchTerm,
                            sort: searchState.sort,
                            order: value,
                            page: searchState.page,
                        })
                    }}>
                    <SelectTrigger className="w-[180px] bg-neutral-800 border-neutral-600 text-white">
                        <SelectValue placeholder="Order By"/>
                    </SelectTrigger>
                    <SelectContent className={"bg-neutral-800 text-white border-none"}>
                        {
                            orderByOptions.map((option, index) => (
                                <SelectItem value={option.value} key={index}>
                                    {option.name}
                                </SelectItem>
                            ))
                        }
                    </SelectContent>
                </Select>

            </div>
        </form>
    );
};