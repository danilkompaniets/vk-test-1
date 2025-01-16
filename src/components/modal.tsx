import {ReactNode} from "react";
import {createPortal} from "react-dom";

interface ModalProps {
    children: ReactNode,
}

export const Modal = ({children}: ModalProps) => {
    const modalRoot = document.getElementById("modal-root");

    if (!modalRoot) {
        return <div>
            Root not found!
        </div>
    }

    return createPortal(
        <div
            className={"bg-black/50 overflow-y-auto overflow-x-hidden flex items-center fixed top-0 right-0 left-0 z-50 justify-center w-full md:inset-0 h-screen max-h-full"}>
            {children}
        </div>,
        document.body
    )
}