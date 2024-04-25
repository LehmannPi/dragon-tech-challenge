'use client';
import { login } from '@/api/auth/login';
import { errorMessages } from '@/validation/validationErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LogInSchema } from '../login/page';

const requiredInputSize = 1; // required fields in zod use the method .min(1)
const minPasswordSize = 4;
const maxPasswordSize = 10;

const signUpSchema = z.object({
  firstName: z
    .string()
    .min(requiredInputSize, { message: errorMessages().required }),
  familyName: z
    .string()
    .min(requiredInputSize, { message: errorMessages().required }),
  email: z.string().email({ message: errorMessages().email }),
  password: z
    .string()
    .min(minPasswordSize, {
      message: errorMessages(minPasswordSize).minTextSize,
    })
    .max(maxPasswordSize, {
      message: errorMessages(maxPasswordSize).maxTextSize,
    }),
});

type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUp() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      familyName: '',
      firstName: '',
      password: '',
    },
  });
  const router = useRouter();
  const handleSignUp = (data: SignUpSchema) => {
    const userInfo = {
      firstName: data.firstName,
      familyName: data.familyName,
      email: data.email,
      password: data.password,
    };

    const registeredUsers = localStorage.getItem('registeredUsers');
    let users = registeredUsers ? JSON.parse(registeredUsers) : [];

    const alreadyRegisteredEmail = users.filter(
      (el: typeof userInfo) => el.email === userInfo.email
    );

    if (alreadyRegisteredEmail.length) {
      setError('email', {
        message: 'Email já se encontra cadastrado',
      });
    } else {
      users.push(userInfo);
      const registeredUsersString = JSON.stringify(users);
      localStorage.setItem('registeredUsers', registeredUsersString);
      const loginData: LogInSchema = {
        email: userInfo.email,
        password: userInfo.password,
      };
      login(loginData);
      reset();
      router.push('/');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                disabled={isSubmitting}
                label="Nome"
                autoFocus
                id="firstName"
                error={Boolean(errors.firstName)}
                helperText={errors.firstName?.message}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                disabled={isSubmitting}
                label="Sobrenome"
                autoComplete="family-name"
                error={Boolean(errors.familyName)}
                helperText={errors.familyName?.message}
                {...register('familyName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                disabled={isSubmitting}
                label="Endereço de Email"
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                disabled={isSubmitting}
                label="Senha"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                autoComplete="new-password"
                {...register('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            disabled={isSubmitting}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit(handleSignUp)}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Já possui uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
