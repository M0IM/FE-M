import { useState } from "react";

const useTags = () => {
    const [tags, setTags] = useState(['']);

    const addTagField = () => {
      if (tags.length < 3) {
        setTags([...tags, '']);
      }
    };
  
    const removeTagField = (index: number) => {
      if (tags.length > 1) {
        const newTags = tags.filter((_, i) => i !== index);
        setTags(newTags);
      }
    };

    const handleTagChange = (text: string, index: number) => {
        const newTag = text.slice(0, 4);
        const updatedTags = [...tags];
        updatedTags[index] = newTag;
        setTags(updatedTags);
    };

    return {
        tags,
        addTagField,
        removeTagField,
        handleTagChange
    };
};

export default useTags;