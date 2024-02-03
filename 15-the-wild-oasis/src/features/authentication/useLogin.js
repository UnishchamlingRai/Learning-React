import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      const userName = user.user.email.split("@")[0];
      toast.success(`${userName.toUpperCase()} you Login Successfully`);
      navigate("/dashboard");
      queryClient.setQueryData(["user", user.user]);
    },
    onError: (err) => {
      toast.error("email or password is incorrect");
      console.log("ERRRor:", err);
    },
  });

  return { login, isLoading };
}

export default useLogin;
