import {useState} from 'react';

interface Category {
  key: string;
  label: string;
}

const useDropdown = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [category, setCategory] = useState<Category | null>(null);

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
    handleCategory,
  };
};

export default useDropdown;
