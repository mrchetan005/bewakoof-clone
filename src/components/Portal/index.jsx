
import { createPortal } from "react-dom";

export default function Portal({ onClose, children }) {
    const handleClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose(e);
        }
    };
    return createPortal(
        <div
            onClick={handleClick}
            className="fixed inset-0 z-50 justify-center flex items-center"
        >
            {children}
        </div>,
        document.body
    );
}
