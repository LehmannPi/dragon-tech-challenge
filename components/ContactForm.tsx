import { Grid, TextField } from '@mui/material';

const ContactForm = () => {
  return (
    <form className="flex items-center gap-2">
      <TextField
        margin="normal"
        required
        fullWidth
        id="Nome"
        label="Nome"
        name="Nome"
        autoComplete="Nome"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="cpf"
        label="CPF"
        name="cpf"
        autoComplete="cpf"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="telefone"
        label="Telefone"
        name="telefone"
        autoComplete="telefone"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="cep"
        label="CEP"
        name="cep"
        autoComplete="cep"
      />
      <Grid container justifyContent="center">
        <Grid item>
          <TextField
            margin="normal"
            required
            fullWidth
            id="logradouro"
            label="logradouro"
            name="Logradouro"
            autoComplete="logradouro"
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            fullWidth
            id="complemento"
            label="Complemento"
            name="complemento"
            autoComplete="complemento"
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            fullWidth
            id="bairro"
            label="Bairro"
            name="bairro"
            autoComplete="bairro"
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            fullWidth
            id="localidade"
            label="Cidade"
            name="localidade"
            autoComplete="localidade"
          />
        </Grid>
        <Grid item>
          <TextField
            margin="normal"
            required
            fullWidth
            id="uf"
            label="Estado"
            name="uf"
            autoComplete="uf"
          />
        </Grid>
      </Grid>

      <Grid container justifyContent="flex-end">
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          id="latitude"
          label="latitude"
          name="latitude"
          autoComplete="latitude"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          type="number"
          id="latitude"
          label="latitude"
          name="latitude"
          autoComplete="latitude"
        />
      </Grid>
    </form>
  );
};

export default ContactForm;
