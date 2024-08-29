import { useState } from "react";

const usePopover = () => {
    const [isPopover, setIsPopover] = useState(false);

    const handlePopover = () => {
        setIsPopover(prev => !prev);
    };

    return {
        isPopover,
        handlePopover
    };
};

export default usePopover;