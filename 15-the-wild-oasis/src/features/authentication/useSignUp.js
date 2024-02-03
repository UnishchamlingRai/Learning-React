import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationFn: ({ email, password, fullName }) =>
      signUpAPi({ email, password, fullName }),
    onSuccess: () => {
      toast.success(
        "Account Created Successfull ! please verify the new account from the email addres"
      );
    },
    onError: (err) => toast.error(err.message),
  });

  return { signUp, isLoading };
}
