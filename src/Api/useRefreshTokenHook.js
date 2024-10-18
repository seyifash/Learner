import { useDispatch  } from 'react-redux'
import axios from 'axios';
import { authActions } from '../AuthReducer/AuthSlice';

export const refreshAccessToken = async () => {
  try {
    const response = await axios.get('https://osei.pythonanywhere.com/api/learners/v1/token/refresh', {
      withCredentials: true
    });

    return response.data; 
  } catch (error) {
    console.error('Failed to refresh token:', error);
    throw error;
  }
};

const useRefreshToken = () => {
  const dispatch = useDispatch();
  

  const refresh = async () => {
    const response = await axios.get('https://osei.pythonanywhere.com/api/learners/v1/token/refresh', {
      withCredentials: true});
      dispatch(authActions.updateAccessToken(response.data.csrf_access_token))
        return {refresh: response.data.refresh, csrf_token: response.data.csrf_access_token}
    }
  
  return refresh;
} 

export default useRefreshToken;