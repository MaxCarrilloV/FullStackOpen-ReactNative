import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/mutations";
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-native";
const useSignIn = () => {
  const apolloClient = useApolloClient();
  const navigate = useNavigate();
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(LOGIN);
    
  const signIn = async ({ username, password }) => {
    const {data} = await mutate({ variables: {credentials:{username,password}} });
    console.log('Token', data.authenticate.accessToken);
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    navigate('/')
  };

  return [signIn, result];
};
export default useSignIn;
