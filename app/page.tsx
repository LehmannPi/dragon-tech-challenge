'use client';
import { isAuthenticated } from '@/api/auth/login';
import { logout } from '@/api/auth/logout';
import ContactForm from '@/components/ContactForm';
import ContactList from '@/components/ContactList';
import MapViewer from '@/components/MapViewer';
import { errorMessages } from '@/validation/validationErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Assignment,
  Contacts,
  DeleteForever,
  ExpandLess,
  ExpandMore,
  LogoutOutlined,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Collapse,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const pageStyles = {
  grid: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    border: '1px solid',
    borderColor: 'divider',
    alignContent: 'center',
    // justifyContent: 'center',
  },
  header: {
    fontWeight: 600,
    minHeight: '8vh',
    width: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: '1px solid',
    borderColor: 'divider',
    alignContent: 'center',
  },
};

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

export default function Home() {
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

  const [openContacts, setOpenContacts] = useState(false);
  const [openRegistry, setOpenRegistry] = useState(false);
  const [openExcludeAccount, setOpenExcludeAccount] = useState(false);

  const handleOpenContacts = () => {
    setOpenContacts(!openContacts);
  };

  const handleOpenRegistry = () => {
    setOpenRegistry(!openRegistry);
  };
  const handleOpenExcludeAccount = () => {
    setOpenExcludeAccount(!openExcludeAccount);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Logica de autenticação usando localStorage
  if (isAuthenticated()) {
    return (
      <Grid container height={'100vh'}>
        <Button
          aria-label="logout"
          variant="contained"
          sx={{
            position: 'fixed',
            top: '1vh',
            left: '1vh',
            backgroundColor: grey[500],
            '&:hover': { backgroundColor: grey[700] },
          }}
          startIcon={<LogoutOutlined />}
          onClick={handleLogout}
        >
          Logout
        </Button>

        {/* // ! Contacts Grid */}
        <Grid item xs={12} sm={5} sx={pageStyles.grid}>
          <Box sx={pageStyles.header}>
            <Typography variant="h6">Contatos</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 1,
              maxHeight: '91vh',
              overflow: 'auto',
            }}
          >
            <List
              sx={{ width: '100%', bgcolor: 'background.paper', p: 0 }}
              component="div"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton divider onClick={handleOpenContacts}>
                <ListItemIcon>
                  <Contacts />
                </ListItemIcon>
                <ListItemText primary="Contatos" />
                {openContacts ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openContacts} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem>
                    <p></p>
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton divider onClick={handleOpenRegistry}>
                <ListItemIcon>
                  <Assignment />
                </ListItemIcon>
                <ListItemText primary="Cadastro de contato" />
                {openRegistry ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openRegistry} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem>
                    <ContactForm />
                  </ListItem>
                </List>
              </Collapse>
              <ListItemButton divider onClick={handleOpenExcludeAccount}>
                <ListItemIcon>
                  <DeleteForever />
                </ListItemIcon>
                <ListItemText primary="Excluir conta" />
                {openExcludeAccount ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openExcludeAccount} timeout="auto" unmountOnExit>
                <ListItem>
                  <ContactList />
                </ListItem>
              </Collapse>
            </List>
          </Box>
        </Grid>

        {/* // ! Map Grid */}
        <Grid item xs={12} sm={7} sx={pageStyles.grid}>
          <Box sx={pageStyles.header}>
            <Typography variant="h6">Mapa</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 1,
              position: 'relative',
              height: { xs: '600px', sm: '100%' },
            }}
          >
            <MapViewer />
          </Box>
        </Grid>
      </Grid>
    );
  }

  router.push('/login');
}
