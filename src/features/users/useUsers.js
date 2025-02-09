import { useQuery } from "@tanstack/react-query";
import { users as usersApi } from "../../services/usersApi";
export function useUsers() {
  const { isPending: isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: usersApi,
  });

  return { isLoading, users };
}
