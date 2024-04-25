import { Box, Button, Grid, TextField } from '@mui/material';

const ContactForm = () => {
  return (
    <Box
      component="form"
      onSubmit={() => {}}
      noValidate
      sx={{ px: 1, pb: 4 }}
      maxHeight={'70vh'}
      overflow={'auto'}
    >
      <Grid container spacing={2} rowSpacing={0.5}>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="Nome"
            label="Nome"
            name="Nome"
            autoComplete="Nome"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="cpf"
            label="CPF"
            name="cpf"
            autoComplete="cpf"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="telefone"
            label="Telefone"
            name="telefone"
            autoComplete="telefone"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="cep"
            label="CEP"
            name="cep"
            autoComplete="cep"
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="logradouro"
            label="Logradouro"
            name="logradouro"
            autoComplete="logradouro"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="complemento"
            label="Complemento"
            name="complemento"
            autoComplete="complemento"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="bairro"
            label="Bairro"
            name="bairro"
            autoComplete="bairro"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="localidade"
            label="Cidade"
            name="localidade"
            autoComplete="localidade"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            id="uf"
            label="Estado"
            name="uf"
            autoComplete="uf"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            type="number"
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="latitude"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            size="small"
            type="number"
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="longitude"
          />
        </Grid>
        <Grid item xs={12} justifyContent={'flex-end'} sx={{ mt: 1 }}>
          <Button variant="contained">Cadastrar</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
