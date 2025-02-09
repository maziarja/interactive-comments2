import { useQuery } from "@tanstack/react-query";
import { currentUser as currentUserApi } from "../../services/usersApi";
export function useCurrentUser() {
  const { isPending: isLoading, data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: currentUserApi,
  });

  return { isLoading, currentUser };
}
