import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";
import useSignIn from "./useSignIn";
const useSignUp = () => {
  const [signIn] = useSignIn();
  const [mutate, result] = useMutation(CREATE_USER);

  const signUp = async ({ username, password }) => {
    await mutate({ variables: { user: { username, password } } });
    await signIn({ username, password });
  };
  return [signUp, result];
};
export default useSignUp;
