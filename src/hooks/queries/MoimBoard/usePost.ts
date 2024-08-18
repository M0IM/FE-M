import { useMutation } from "@tanstack/react-query";
import { writeMoimPost } from "apis/post";
import { UseMutationCustomOptions } from "types/mutations/common";

function useMoimPost(mutationOptions?: UseMutationCustomOptions) {
    return useMutation({
        mutationFn: writeMoimPost,
        onSuccess: (data) => {
            console.log(data);
        },
        onError: (error) => {
            console.log(error);
        },
        ...mutationOptions
    });
}


function usePost() {
    const moimPostMutation = useMoimPost();

    return {
        moimPostMutation,
    };
}

export default usePost;