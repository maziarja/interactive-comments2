import { useQuery } from "@tanstack/react-query";
import { comments as commentsApi } from "../../services/commentsApi";

export function useComments() {
  const { isPending: isLoading, data: comments } = useQuery({
    queryKey: ["comments"],
    queryFn: commentsApi,
  });

  return { isLoading, comments };
}
