import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
const useCreateReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const navigate = useNavigate();
    const createReview = async ({ ownerName, repositoryName, rating , text }) => {
        const { data } = await mutate({variables:{review:{ ownerName,repositoryName,rating:Number(rating), text }}});
        console.log(data.createReview.repositoryId)
        navigate(`/${data.createReview.repositoryId}`);
        return data;
    }
    return [createReview, result];
}
export default useCreateReview;