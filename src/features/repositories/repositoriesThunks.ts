import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchQuery } from "../../../types/types.ts";

export const fetchRepositories = createAsyncThunk(
    "repositories/fetchRepositories",
    async (
        { searchTerm, page, order, sort }: SearchQuery,
        { rejectWithValue }
    ) => {
        try {
            const encodedSearchTerm = encodeURIComponent(searchTerm);

            const response = await axios.get("https://api.github.com/search/repositories", {
                params: {
                    q: encodedSearchTerm,
                    sort,
                    order,
                    page,
                    per_page: 25,
                },
            });

            return response.data.items;
        } catch (error: any) {
            if (error.response) {
                return rejectWithValue(error.response.data.message || "Failed to fetch repositories");
            } else if (error.request) {
                return rejectWithValue("No response from the server. Please try again.");
            } else {
                return rejectWithValue(error.message || "An unknown error occurred.");
            }
        }
    }
);