import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { SearchBar } from "../../src/components/search-bar";
import { fetchRepositories } from "../../src/features/repositories/repositoriesThunks";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import { setSearchQuery, resetRepositories } from "../../src/features/repositories/repositoriesSlice.ts";
import "@testing-library/jest-dom"


jest.mock("../../hooks/hooks.ts", () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock("../../src/features/repositories/repositoriesThunks", () => ({
    fetchRepositories: jest.fn(),
}));

jest.mock("../../src/features/repositories/repositoriesSlice.ts", () => ({
    setSearchQuery: jest.fn(),
    resetRepositories: jest.fn(),
}));

describe("SearchBar", () => {
    const dispatch = jest.fn();
    const useAppDispatchMock = useAppDispatch as jest.Mock;
    const useAppSelectorMock = useAppSelector as jest.Mock;

    beforeEach(() => {
        useAppDispatchMock.mockReturnValue(dispatch);
        useAppSelectorMock.mockReturnValue({
            loading: false,
            repositories: { ids: [] }, // Initially no repositories
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders the search input and buttons", () => {
        render(<SearchBar placeholder="Search..." />);

        expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    });

    it("disables the button when search term is empty", () => {
        render(<SearchBar placeholder="Search..." />);

        const button = screen.getByRole("button", { name: "Search" });
        expect(button).toBeDisabled();
    });

    it("enables the button when search term is not empty", () => {
        render(<SearchBar placeholder="Search..." />);

        const input = screen.getByPlaceholderText("Search...");
        fireEvent.change(input, { target: { value: "react" } });

        const button = screen.getByRole("button", { name: "Search" });
        expect(button).toBeEnabled();
    });

    it("dispatches actions on form submit", async () => {
        render(<SearchBar placeholder="Search..." />);

        const input = screen.getByPlaceholderText("Search...");
        fireEvent.change(input, { target: { value: "react" } });

        const button = screen.getByRole("button", { name: "Search" });
        fireEvent.click(button);

        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith(setSearchQuery({
                searchTerm: "react",
                sort: "stars",
                order: "desc",
                page: 1,
            }));

            expect(dispatch).toHaveBeenCalledWith(fetchRepositories({
                searchTerm: "react",
                sort: "stars",
                order: "desc",
                page: 1,
            }));
        });
    });

    it("dispatches resetRepositories and fetchRepositories if repositories exist", async () => {
        useAppSelectorMock.mockReturnValueOnce({
            loading: false,
            repositories: { ids: [1, 2] }, // Simulating existing repositories
        });

        render(<SearchBar placeholder="Search..." />);

        const input = screen.getByPlaceholderText("Search...");
        fireEvent.change(input, { target: { value: "react" } });

        const button = screen.getByRole("button", { name: "Search" });
        fireEvent.click(button);

        await waitFor(() => {
            expect(dispatch).toHaveBeenCalledWith(resetRepositories());
            expect(dispatch).toHaveBeenCalledWith(setSearchQuery({
                searchTerm: "react",
                sort: "stars",
                order: "desc",
                page: 1,
            }));
            expect(dispatch).toHaveBeenCalledWith(fetchRepositories({
                searchTerm: "react",
                sort: "stars",
                order: "desc",
                page: 1,
            }));
        });
    });
});