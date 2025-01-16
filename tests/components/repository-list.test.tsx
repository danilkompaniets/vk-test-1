import {RepositoryList} from "../../src/components/repository-list";
import {Repository} from "../../types/types.ts";
import {renderWithProviders} from "../../src/lib/test-utils.tsx";
import "@testing-library/jest-dom"
import {screen} from "@testing-library/react";
import {RootState} from "../../src/store.ts";

describe(RepositoryList, () => {
    const preloadedState: RootState = {
        repositories: {
            repositories: {
                entities: {
                    1: {
                        id: 1,
                        name: "Test Repo",
                        full_name: "user/test-repo",
                        private: false,
                        owner: {
                            login: "user_login",
                            id: 123456,
                            avatar_url: "avatar_url",
                            html_url: "html_url",
                        },
                        html_url: "html_url",
                        description: "Test description",
                        fork: false,
                        url: "url",
                        created_at: "created_at",
                        updated_at: "updated_at",
                        clone_url: "clone_url",
                        stargazers_count: 123,
                        watchers_count: 456,
                        language: "JavaScript",
                        forks_count: 789,
                        topics: ["topic1", "topic2"],
                        forks: 789,
                        watchers: 456,
                    } as Repository,
                },
                ids: [1],
            },
            loading: false,
            error: null,
            searchQuery: {
                searchTerm: "searchTerm",
                page: 1,
                order: "asc",
                sort: "stars",
            },
        },
    };

    it("Renders component", () => {
        renderWithProviders(<RepositoryList/>, {preloadedState})

        expect(screen.getByText(/your search results 🔍/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Repo/i)).toBeInTheDocument();
    })

    it("shows loading spinner when loading is true", () => {
        const stateWithLoading = {
            ...preloadedState,
            repositories: {...preloadedState.repositories, loading: true},
        };
        renderWithProviders(<RepositoryList/>, {preloadedState: stateWithLoading});
        expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("shows error message when error exists", () => {
        const stateWithError = {
            ...preloadedState,
            repositories: {...preloadedState.repositories, error: "Failed to fetch repositories."},
        };
        renderWithProviders(<RepositoryList/>, {preloadedState: stateWithError});
        expect(screen.getByText(/failed to fetch repositories/i)).toBeInTheDocument();
    });

})
