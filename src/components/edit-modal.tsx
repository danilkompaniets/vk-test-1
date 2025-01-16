import {Repository} from "../../types/types.ts";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {Modal} from "@/components/modal.tsx";
import {Input} from "@/components/ui/input.tsx";
import {useAppDispatch} from "../../hooks/hooks.ts";
import {updateRepository} from "@/features/repositories/repositoriesSlice.ts";
import {Textarea} from "@/components/ui/textarea.tsx";

interface EditModalProps {
    repository: Repository;
}

export const EditModal = ({repository}: EditModalProps) => {
    const dispatch = useAppDispatch();

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState(repository.name);
    const [description, setDescription] = useState(repository.description);
    const [stars, setStars] = useState(repository.stargazers_count);

    const handleSave = () => {
        dispatch(updateRepository({
            ...repository,
            name: name,
            description: description,
            stargazers_count: stars
        }))
        setIsOpen(false);
    };

    return (
        <div>
            <Button
                onClick={() => setIsOpen(true)}
                className="text-xl w-full bg-neutral-800/50 font-semibold"
            >
                📝 Edit
            </Button>

            {isOpen && (
                <Modal>
                    <div
                        className="p-4 border-none rounded-md w-full max-w-xl mx-auto bg-gray-800 items-center justify-start flex flex-col gap-y-4">
                        <p className="text-white text-center text-lg font-semibold">
                            ✍🏻 Edit this repo here!
                        </p>

                        <div className="w-full">
                            <label className="text-white font-medium">Repository Name</label>
                            <Input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-gray-700 mt-1 w-full"
                                placeholder="Repository name"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-white font-medium">Description</label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-gray-700 mt-1 w-full"
                                placeholder="Repository description"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-white font-medium">Stars</label>
                            <Input
                                type="number"
                                value={stars}
                                onChange={(e) => setStars(Number(e.target.value))}
                                className="bg-gray-700 mt-1 w-full"
                                placeholder="Stargazers count"
                            />
                        </div>

                        <div className="flex justify-end gap-x-2 w-full mt-4">
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="bg-red-600 text-white"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSave}
                                className="bg-green-600 text-white"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
};