

export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken') && !!document.cookie.includes('refreshToken');
};

