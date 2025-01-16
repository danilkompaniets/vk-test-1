import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Modal} from "@/components/modal.tsx";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {deleteRepository} from "@/features/repositories/repositoriesSlice.ts";

interface DeleteModalProps {
    repositoryId: number;
}

export const DeleteModal = ({repositoryId}: DeleteModalProps) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        dispatch(deleteRepository(repositoryId))
        setIsOpen(false);
    };

    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                className="text-xl w-full bg-neutral-800/50 font-semibold"
                variant={"destructive"}
            >
                🗑️ Delete
            </Button>

            {isOpen && (
                <Modal>
                    <div
                        className="p-4 border-none rounded-md max-w-xl mx-auto bg-gray-800 items-center justify-start flex flex-col gap-y-4">
                        <p className="text-white text-center text-lg font-semibold">
                            🛑 Are You Sure?
                        </p>

                        <div className="flex justify-center gap-x-2 w-full mt-4">
                            <Button
                                onClick={() => setIsOpen(false)}
                                variant={"default"}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                className="bg-green-600 text-white"
                                variant={"destructive"}
                            >
                                Delete repository
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};