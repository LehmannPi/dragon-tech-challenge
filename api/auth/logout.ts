export const logout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};
