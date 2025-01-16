import repositoriesSlice, {
    deleteRepository, incrementPage,
    initialState,
    RepositoryState,
    resetRepositories,
    setSearchQuery,
    updateRepository
} from "../../../src/features/repositories/repositoriesSlice.ts";
import {Repository, SearchQuery} from "../../../types/types.ts";
import {fetchRepositories} from "../../../src/features/repositories/repositoriesThunks.ts";
import "@testing-library/jest-dom"
import axios from "axios";
jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("repositoriesSlice", () => {
    const testData: RepositoryState = {
        ...initialState,
        repositories: {
            entities: {
                1: {
                    id: 1,
                    name: "name",
                    full_name: "full_name",
                    private: false,
                    owner: {
                        login: "user_login",
                        id: 123456,
                        avatar_url: "avatar_url",
                        html_url: "html_url",
                    },
                    html_url: "html_url",
                    description: "description",
                    fork: false,
                    url: "url",
                    created_at: "created_at",
                    updated_at: "updated_at",
                    clone_url: "clone_url",
                    stargazers_count: 123,
                    watchers_count: 456,
                    language: "language",
                    forks_count: 789,
                    topics: ["topic1", "topic2"],
                    forks: 789,
                    watchers: 456,
                }
            },
            ids: [1]
        },
    };

    it("initializes with initial value", () => {
        const result = repositoriesSlice(initialState, {type: "unknown"});
        expect(result).toBe(initialState);
    });

    it("resets repository state to initial", () => {
        const result = repositoriesSlice(testData, resetRepositories());
        expect(result).toEqual(initialState);
    });

    it("deletes repository by id", () => {
        const result = repositoriesSlice(testData, deleteRepository(testData.repositories.ids[0]));
        expect(result.repositories.entities).toEqual({});
        expect(result.repositories.ids).toEqual([]);
    });

    it("updates repository", () => {
        const dataForUpdate = {
            id: testData.repositories.entities[testData.repositories.ids[0]].id,
            name: "new name",
        };
        const result = repositoriesSlice(testData, updateRepository(dataForUpdate as Repository));
        expect(result.repositories.entities[testData.repositories.ids[0]].name).toEqual(dataForUpdate.name);
    });

    it("sets search query", () => {
        const testQuery: SearchQuery = {
            searchTerm: "test",
            page: 1,
            order: "asc",
            sort: "stars"
        };

        const result = repositoriesSlice(testData, setSearchQuery(testQuery));

        expect(result.searchQuery).toEqual(testQuery);
    });

    it("increments page", () => {
        const result = repositoriesSlice(testData, incrementPage());
        expect(result.searchQuery.page).toEqual(testData.searchQuery.page + 1);
    });

    it("does not crash when deleting from an empty repository state", () => {
        const emptyState: RepositoryState = {
            repositories: {
                entities: {},
                ids: []
            },
            loading: false,
            error: null,
            searchQuery: {
                searchTerm: "test",
                page: 1,
                order: "asc",
                sort: "stars"
            },
        };
        const result = repositoriesSlice(emptyState, deleteRepository(1));
        expect(result.repositories.entities).toEqual({});
        expect(result.repositories.ids).toEqual([]);
    });

    it("sets error on failed fetchRepositories", () => {
        const errorMessage = "Failed to fetch repositories";
        const result = repositoriesSlice(testData, fetchRepositories.rejected(undefined, "", undefined, errorMessage));
        expect(result.error).toEqual(errorMessage);
    });
});

describe("fetchRepositories thunk", () => {
    it("dispatches fulfilled action when API call succeeds", async () => {
        const searchQuery: SearchQuery = {
            searchTerm: "react",
            page: 1,
            order: "desc",
            sort: "stars",
        };

        const mockResponse = {
            data: {
                items: [
                    { id: 1, name: "repo1" },
                    { id: 2, name: "repo2" },
                ],
            },
        };

        mockedAxios.get.mockResolvedValueOnce(mockResponse);

        const dispatch = jest.fn();
        const getState = jest.fn();

        const result = await fetchRepositories(searchQuery)(dispatch, getState, undefined);

        expect(mockedAxios.get).toHaveBeenCalledWith("https://api.github.com/search/repositories", {
            params: {
                q: encodeURIComponent(searchQuery.searchTerm),
                sort: searchQuery.sort,
                order: searchQuery.order,
                page: searchQuery.page,
                per_page: 25,
            },
        });

        expect(result.payload).toEqual(mockResponse.data.items);
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "repositories/fetchRepositories/pending" }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "repositories/fetchRepositories/fulfilled" }));
    });

    it("dispatches rejected action when API call fails", async () => {
        const searchQuery: SearchQuery = {
            searchTerm: "react",
            page: 1,
            order: "desc",
            sort: "stars",
        };

        const mockError = {
            response: {
                data: { message: "API rate limit exceeded" },
            },
        };

        mockedAxios.get.mockRejectedValueOnce(mockError);

        const dispatch = jest.fn();
        const getState = jest.fn();

        const result = await fetchRepositories(searchQuery)(dispatch, getState, undefined);

        expect(mockedAxios.get).toHaveBeenCalledWith("https://api.github.com/search/repositories", {
            params: {
                q: encodeURIComponent(searchQuery.searchTerm),
                sort: searchQuery.sort,
                order: searchQuery.order,
                page: searchQuery.page,
                per_page: 25,
            },
        });

        expect(result.payload).toEqual("API rate limit exceeded");
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "repositories/fetchRepositories/pending" }));
        expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: "repositories/fetchRepositories/rejected" }));
    });
});