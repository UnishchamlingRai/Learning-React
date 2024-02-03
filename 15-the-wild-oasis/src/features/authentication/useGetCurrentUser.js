import { useQuery } from "@tanstack/react-query";
import { getCurrentlyLogedInUser } from "../../services/apiAuth";

export function useGetCurrentUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentlyLogedInUser,
  });

  return { user, isLoading, isAuthenticated: user?.role === "authenticated" };
}
