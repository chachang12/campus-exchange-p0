import { useAuthContext } from './useAuthContext.hook';

export const useLogout = () => {
    const { dispatch } = useAuthContext();

    const logout = () => {
        // Remove token from local storage
        localStorage.removeItem('user');

        // Update auth context
        dispatch({ type: 'LOGOUT' });
    }

    return { logout };
}