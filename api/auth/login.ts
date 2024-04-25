import { LogInSchema } from '@/app/login/page';

export const login = (data: LogInSchema) => {
  const usersData = localStorage.getItem('usersData'); // check credentials in local database
  let users = usersData ? JSON.parse(usersData) : [];
  const registeredEmail = users.filter(
    (el: LogInSchema) => el.email === data.email
  ) as LogInSchema[];

  if (registeredEmail.length) {
    if (registeredEmail[0].password == data.password) {
      const authToken = JSON.stringify(data);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', data.email);
      return 'ok';
    } else {
      return 'password';
    }
  } else {
    return 'email';
  }
};

export const isAuthenticated = () => {
  return Boolean(localStorage.getItem('authToken'));
};

export const activeUser = () => {
  return localStorage.getItem('user');
};
