import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Repository, SearchQuery} from "../../../types/types.ts";
import {fetchRepositories} from "@/features/repositories/repositoriesThunks.ts";
import {RootState} from "@/store.ts";


export interface RepositoryState {
    repositories: Repository[];
    loading: boolean;
    error: string | null;
    page: number;
    searchQuery: SearchQuery
}

const initialState: RepositoryState = {
    repositories: [],
    loading: false,
    error: null,
    page: 1,
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
        setRepositories: (state, action: PayloadAction<Repository[]>) => {
            state.repositories = [...state.repositories, ...action.payload];
        },
        setSearchQuery(state, action: PayloadAction<SearchQuery>) {
            state.searchQuery = action.payload;
        },
        incrementPage(state) {
            state.page++;
        }
    },

    extraReducers: builder => {
        builder.addCase(fetchRepositories.pending, (state) => {
            state.loading = true;
        }).addCase(fetchRepositories.fulfilled, (state, action) => {
            state.loading = false
            state.repositories = [...state.repositories, ...action.payload]
        }).addCase(fetchRepositories.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string
        })
    }
});


export const selectRepositories = (state: RootState) => state.repositories;
export const {setRepositories, setSearchQuery, incrementPage} = repositorySlice.actions
export default repositorySlice.reducer;