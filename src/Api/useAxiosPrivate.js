import { useEffect} from 'react';
import { useSelector } from 'react-redux';
import {axiosPrivate} from './axios';
import useRefreshToken from './useRefreshTokenHook';


const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const csrf_token = useSelector(state => state.auth.csrfToken)

    useEffect(() => {
        console.log('intercepting')

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['X-CSRF-TOKEN']) {
                    config.headers['X-CSRF-TOKEN'] = csrf_token;
                }
                return config;
            },
            error => {
                return Promise.reject(error);
            }
        );
        
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => {
                return response;
            },
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { csrf_token } = await refresh();
                    prevRequest.headers['X-CSRF-TOKEN'] = csrf_token;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );
        

        return () => {
            axiosPrivate.interceptors.response.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }

    }, [csrf_token, refresh])

  return axiosPrivate
}

export default useAxiosPrivate