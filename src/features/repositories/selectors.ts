import {RootState} from "@/store";
import {RepositoryState} from "./repositoriesSlice.ts";

export const selectRepositoryState = (state: RootState): RepositoryState => state.repositories;

export const selectRepositories = (state: RootState) => selectRepositoryState(state).repositories;

export const selectIsLoading = (state: RootState) => selectRepositoryState(state).loading;

export const selectError = (state: RootState) => selectRepositoryState(state).error;

export const selectSearchTerm = (state: RootState) => selectRepositoryState(state).searchTerm;

export const selectPage = (state: RootState) => selectRepositoryState(state).page;