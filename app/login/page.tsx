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

const requiredInputSize = 1; // required fields in zod use the method .min(1)

const logInSchema = z.object({
  email: z
    .string()
    .min(requiredInputSize, { message: errorMessages().required })
    .email({ message: errorMessages().email }),
  password: z
    .string()
    .min(requiredInputSize, { message: errorMessages().required }),
});

export type LogInSchema = z.infer<typeof logInSchema>;

export default function LogIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LogInSchema>({
    resolver: zodResolver(logInSchema),
  });

  const handleLogIn = (data: LogInSchema) => {
    try {
      const result = login(data);
      if (result === 'ok') {
        reset();
        router.push('/');
      } else if (result === 'email') {
        setError('email', {
          message: 'Email não cadastrado',
        });
      } else {
        setError('password', {
          message: 'Senha inválida',
        });
      }
    } catch (error) {
      console.error('Login failed:', error);
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
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(handleLogIn)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Endereço de Email"
            autoComplete="email"
            autoFocus
            disabled={isSubmitting}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            {...register('email')}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            disabled={isSubmitting}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                {'Não possui conta? Se cadastre'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
