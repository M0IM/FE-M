import { useState } from "react";

const useDropdown = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [category, setCategory] = useState('');
  
    const handleSelectedCategory = (selected: any) => {
      setCategory(selected);
    };
  
    const handleCategory = () => {
      setIsPressed(prev => !prev);
    };

    return {
        isPressed,
        category,
        handleSelectedCategory,
        handleCategory
    };
};

export default useDropdown;