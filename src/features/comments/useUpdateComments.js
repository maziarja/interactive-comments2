import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComments as updateCommentsApi } from "../../services/commentsApi";
import { toast } from "react-toastify";

export function useUpdateComments() {
  const queryClient = useQueryClient();
  const { isPending, mutate: updateComment } = useMutation({
    mutationKey: ["comments"],
    mutationFn: ({ id, obj }) => updateCommentsApi(id, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => {
      console.log(err);
      toast.error("comment could not updated");
    },
  });
  return { isPending, updateComment };
}
