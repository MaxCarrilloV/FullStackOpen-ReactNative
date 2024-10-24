import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES,{
    fetchPolicy: 'cache-and-network',
  });
  const repositories = loading ? []:data.repositories
  return { repositories, loading };
};

export default useRepositories;