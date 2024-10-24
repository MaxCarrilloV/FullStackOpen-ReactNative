import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';

const useLogOut = () => {
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();

    const logOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    }
    return [logOut]
}
export default useLogOut;