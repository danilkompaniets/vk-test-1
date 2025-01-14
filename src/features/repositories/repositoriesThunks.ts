import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchQuery} from "../../../types/types.ts";

export const fetchRepositories = createAsyncThunk(
    "repositories/fetchRepositories",
    async (
        {searchTerm, page, order, sort}: SearchQuery,
        {rejectWithValue}
    ) => {
        try {
            console.log(searchTerm, page, order, sort);
            const response = await fetch(
                `https://api.github.com/search/repositories?q=${searchTerm}&sort=${sort}&order=${order}&page=${page}&per_page=25`
            );

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || "Failed to fetch repositories");
            }

            const data = await response.json();
            return data.items;
        } catch (error: any) {
            return rejectWithValue(error.message || "Something went wrong");
        }
    }
);