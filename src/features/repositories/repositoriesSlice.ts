import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Repository, SearchQuery} from "../../../types/types.ts";
import {fetchRepositories} from "@/features/repositories/repositoriesThunks.ts";
import {RootState} from "@/store.ts";


export interface RepositoryState {
    repositories: {
        entities: Record<number, Repository>;
        ids: number[];
    };
    loading: boolean;
    error: string | null;
    searchQuery: SearchQuery
}

export const initialState: RepositoryState = {
    repositories: {
        entities: {},
        ids: []
    },
    loading: false,
    error: null,
    searchQuery: {
        searchTerm: "",
        page: 1,
        order: "asc",
        sort: "stars"
    },
};


const repositorySlice = createSlice({
    name: "repositories",
    initialState,
    reducers: {
        resetRepositories: (state) => {
            state.repositories = initialState.repositories
            state.searchQuery.page = initialState.searchQuery.page
        },
        deleteRepository: (state, action: PayloadAction<number>) => {
            delete state.repositories.entities[action.payload]
            state.repositories.ids = state.repositories.ids.filter(id => id != action.payload);

        },
        updateRepository: (state, action: PayloadAction<Repository>) => {
            state.repositories.entities[action.payload.id] = action.payload
        },
        setSearchQuery(state, action: PayloadAction<SearchQuery>) {
            state.searchQuery = action.payload;
        },
        incrementPage(state) {
            state.searchQuery.page = state.searchQuery.page + 1;
        },
    },

    extraReducers: builder => {
        builder.addCase(fetchRepositories.pending, (state) => {
            state.loading = true;
        }).addCase(fetchRepositories.fulfilled, (state, action) => {
            action.payload.map((repo: Repository) => {
                state.repositories.entities[repo.id] = repo;
                state.repositories.ids.push(repo.id);
            })
            state.loading = false
        }).addCase(fetchRepositories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
});


export const selectRepositories = (state: RootState) => state.repositories;
export const {
    resetRepositories,
    deleteRepository,
    updateRepository,
    setSearchQuery,
    incrementPage
} = repositorySlice.actions
export default repositorySlice.reducer;