import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { DeleteModal } from "@/components/delete-modal";
import "@testing-library/jest-dom";
import { deleteRepository } from "../../src/features/repositories/repositoriesSlice";
import { useAppDispatch } from "../../hooks/hooks";

jest.mock("../../hooks/hooks", () => ({
    useAppDispatch: jest.fn(),
}));

describe("DeleteModal Component", () => {
    const mockDispatch = jest.fn();

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

    it("renders the delete button", () => {
        render(<DeleteModal repositoryId={1} />);
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        expect(deleteButton).toBeInTheDocument();
    });

    it("opens the modal when delete button is clicked", async () => {
        render(<DeleteModal repositoryId={1} />);
        const deleteButton = screen.getByRole("button", { name: /delete/i });

        fireEvent.click(deleteButton);

        await waitFor(() => {
            expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
        });

        const cancelButton = screen.getByRole("button", { name: /cancel/i });
        const confirmDeleteButton = screen.getByRole("button", { name: /delete repository/i });

        expect(cancelButton).toBeInTheDocument();
        expect(confirmDeleteButton).toBeInTheDocument();
    });

    it("closes the modal when cancel button is clicked", async () => {
        render(<DeleteModal repositoryId={1} />);
        const deleteButton = screen.getByRole("button", { name: /delete/i });

        fireEvent.click(deleteButton);

        const cancelButton = screen.getByRole("button", { name: /cancel/i });

        fireEvent.click(cancelButton);

        await waitFor(() => {
            expect(screen.queryByText(/are you sure\?/i)).not.toBeInTheDocument();
        });
    });

    it("dispatches deleteRepository and closes modal when delete is confirmed", async () => {
        render(<DeleteModal repositoryId={1} />);
        const deleteButton = screen.getByRole("button", { name: /delete/i });

        fireEvent.click(deleteButton);

        const confirmDeleteButton = screen.getByRole("button", { name: /delete repository/i });

        fireEvent.click(confirmDeleteButton);

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(deleteRepository(1));
            expect(screen.queryByText(/are you sure\?/i)).not.toBeInTheDocument();
        });
    });
});