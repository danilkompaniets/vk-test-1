import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { EditModal } from "@/components/edit-modal";
import "@testing-library/jest-dom";
import { updateRepository } from "@/features/repositories/repositoriesSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { Repository } from "../../types/types";

jest.mock("../../hooks/hooks", () => ({
    useAppDispatch: jest.fn(),
}));

describe("EditModal Component", () => {
    const mockDispatch = jest.fn();

    const mockRepository: Repository = {
        id: 1,
        name: "Test Repo",
        description: "This is a test repository",
        stargazers_count: 100,
        full_name: "user/test-repo",
        private: false,
        owner: {
            login: "user",
            id: 1,
            avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
            html_url: "https://github.com/user",
        },
        html_url: "https://github.com/user/test-repo",
        fork: false,
        url: "https://api.github.com/repos/user/test-repo",
        created_at: "2021-01-01T00:00:00Z",
        updated_at: "2021-01-01T00:00:00Z",
        watchers_count: 100,
        language: "TypeScript",
        clone_url: "https://github.com/user/test-repo.git",
        forks_count: 5,
        topics: ["typescript", "react", "testing"],
        forks: 5,
        watchers: 100,
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
        const modalRoot = document.createElement("div");
        modalRoot.id = "modal-root";
        document.body.appendChild(modalRoot);
    });

    afterEach(() => {
        const modalRoot = document.getElementById("modal-root");
        if (modalRoot) {
            document.body.removeChild(modalRoot);
        }
    });

    it("renders the edit button", () => {
        render(<EditModal repository={mockRepository} />);
        const editButton = screen.getByRole("button", { name: /edit/i });
        expect(editButton).toBeInTheDocument();
    });

    it("opens the modal when the edit button is clicked", async () => {
        render(<EditModal repository={mockRepository} />);
        const editButton = screen.getByRole("button", { name: /edit/i });

        fireEvent.click(editButton);

        await waitFor(() => {
            expect(screen.getByText(/edit this repo here!/i)).toBeInTheDocument();
        });
    });

    it("closes the modal when the cancel button is clicked", async () => {
        render(<EditModal repository={mockRepository} />);
        const editButton = screen.getByRole("button", { name: /edit/i });

        fireEvent.click(editButton);

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText(/edit this repo here!/i)).not.toBeInTheDocument();
        });
    });

    it("allows the user to update repository details and save", async () => {
        render(<EditModal repository={mockRepository} />);
        const editButton = screen.getByRole("button", { name: /edit/i });

        fireEvent.click(editButton);

        const nameInput = screen.getByPlaceholderText("Repository name");
        const descriptionInput = screen.getByPlaceholderText("Repository description");
        const starsInput = screen.getByPlaceholderText("Stargazers count");

        fireEvent.change(nameInput, { target: { value: "Updated Repo" } });
        fireEvent.change(descriptionInput, { target: { value: "Updated description" } });
        fireEvent.change(starsInput, { target: { value: 200 } });

        const saveButton = screen.getByRole("button", { name: /save/i });
        fireEvent.click(saveButton);

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(
                updateRepository({
                    ...mockRepository,
                    name: "Updated Repo",
                    description: "Updated description",
                    stargazers_count: 200,
                })
            );
        });
    });
});