import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment as deleteCommentApi } from "../../services/commentsApi";
import { toast } from "react-toastify";

export function useDeleteComment() {
  const QueryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteComment } = useMutation({
    mutationKey: ["comments"],
    mutationFn: deleteCommentApi,

    onSuccess: () => {
      QueryClient.invalidateQueries({
        queryKey: ["comments"],
      });
      toast.success("comment successfully deleted");
    },
    onError: (err) => {
      console.log(err);
      toast.error("comment could not deleted");
    },
  });
  return { isDeleting, deleteComment };
}
