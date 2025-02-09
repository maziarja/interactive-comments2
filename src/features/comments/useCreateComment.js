import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment as createCommentApi } from "../../services/commentsApi";
import { useTextareaContext } from "../textArea/textArea";
import { toast } from "react-toastify";

export function useCreateComment() {
  const { close } = useTextareaContext();
  const queryClient = useQueryClient();
  const { isPending, mutate: createComment } = useMutation({
    mutationKey: ["comments"],
    mutationFn: createCommentApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      close();
      toast.success("Your comment has been posted");
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { isPending, createComment };
}
