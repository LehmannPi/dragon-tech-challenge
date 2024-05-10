'use client';
import { errorMessages } from '@/validation/validationErrors';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Grid, TextField } from '@mui/material';
import { fromAddress, setKey } from 'react-geocode';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const requiredInputSize = 1; // required fields in zod use the method .min(1)
const minPasswordSize = 4;
const maxPasswordSize = 10;

const registrySchema = z.object({
  name: z
    .string()
    .min(requiredInputSize, { message: errorMessages().required }),

  cpf: z.string().refine((cpf: string) => {
    if (typeof cpf !== 'string') return false;
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;
    const cpfDigits = cpf.split('').map((el) => +el);
    const rest = (count: number): number => {
      return (
        ((cpfDigits
          .slice(0, count - 12)
          .reduce((soma, el, index) => soma + el * (count - index), 0) *
          10) %
          11) %
        10
      );
    };
    return rest(10) === cpfDigits[9] && rest(11) === cpfDigits[10];
  }, 'Digite um cpf válido.'),

  phone: z.string().email({ message: errorMessages().email }),
  cep: z.string().email({ message: errorMessages().email }),
  adress: z.string().email({ message: errorMessages().email }),
  adress2: z.string().email({ message: errorMessages().email }),
  neighborhood: z.string().email({ message: errorMessages().email }),
  city: z.string().email({ message: errorMessages().email }),
  state: z.string().email({ message: errorMessages().email }),

  latitude: z.number(),
  longitude: z
    .number()
    .min(minPasswordSize, {
      message: errorMessages(minPasswordSize).minTextSize,
    })
    .max(maxPasswordSize, {
      message: errorMessages(maxPasswordSize).maxTextSize,
    }),
});

type RegistrySchema = z.infer<typeof registrySchema>;

const ContactForm = () => {
  setKey(process.env.NEXT_PUBLIC_GEO_API_KEY as string);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegistrySchema>({
    resolver: zodResolver(registrySchema),
    defaultValues: {
      adress: '',
      adress2: '',
      cep: '',
      city: '',
      cpf: '',
      latitude: 0,
      longitude: 0,
      name: '',
      neighborhood: '',
      phone: '',
      state: '',
    },
  });

  const handleCadastro = (data: RegistrySchema) => {};

  function pesquisacep(valor: string) {
    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/;

      //Valida o formato do CEP.
      if (validacep.test(cep)) {
        //Preenche os campos com "..." enquanto consulta webservice.
        setValue('adress', '...');
        setValue('neighborhood', '...');
        setValue('city', '...');
        setValue('state', '...');

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src =
          'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);
      } //end if.
      else {
        //cep é inválido.
        alert('Formato de CEP inválido.');
      }
    }
  }

  if (getValues('cep').replace('-', '').length > 8) {
  }

  const execute = () => {
    fromAddress('R. Paula Gomes, 375 - São Francisco')
      .then(({ results }) => {
        const { lat, lng } = results[0].geometry.location;
        console.log(lat, lng);
        console.log(results);
      })
      .catch(console.error);
  };

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
        <Grid item xs={12} sm={6} md={7}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'name-input' }}
            size="small"
            id="Nome"
            label="Nome"
            autoComplete="Nome"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            {...register('name')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'cpf-input' }}
            size="small"
            id="cpf"
            label="CPF"
            autoComplete="cpf"
            error={Boolean(errors.cpf)}
            helperText={errors.cpf?.message}
            {...register('cpf')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'phone-input' }}
            size="small"
            id="telefone"
            label="Telefone"
            autoComplete="telefone"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
            {...register('phone')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'cep-input' }}
            size="small"
            id="cep"
            label="CEP"
            autoComplete="cep"
            error={Boolean(errors.cep)}
            helperText={errors.cep?.message}
            {...register('cep', {
              onBlur(event) {
                pesquisacep(event.target.value);
              },
            })}
          />
        </Grid>

        <Grid item xs={12} md={9}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'adress-input' }}
            size="small"
            id="logradouro"
            label="Logradouro"
            autoComplete="logradouro"
            error={Boolean(errors.adress)}
            helperText={errors.adress?.message}
            {...register('adress')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'adress2-input' }}
            size="small"
            id="complemento"
            label="Complemento"
            autoComplete="complemento"
            error={Boolean(errors.adress2)}
            helperText={errors.adress2?.message}
            {...register('adress2')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'neighborhood-input' }}
            size="small"
            id="bairro"
            label="Bairro"
            autoComplete="bairro"
            error={Boolean(errors.neighborhood)}
            helperText={errors.neighborhood?.message}
            {...register('neighborhood')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={5}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'city-input' }}
            size="small"
            id="localidade"
            label="Cidade"
            autoComplete="localidade"
            error={Boolean(errors.city)}
            helperText={errors.city?.message}
            {...register('city')}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'state-input' }}
            size="small"
            id="uf"
            label="Estado"
            autoComplete="uf"
            error={Boolean(errors.state)}
            helperText={errors.state?.message}
            {...register('state')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'lat-input' }}
            size="small"
            type="number"
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="latitude"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            margin="normal"
            required
            fullWidth
            variant="standard"
            inputProps={{ 'data-testid': 'lng-input' }}
            size="small"
            type="number"
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="longitude"
            disabled
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} justifyContent={'flex-end'} sx={{ mt: 1 }}>
          {/* <Button variant="contained" onClick={execute}> */}
          <Button variant="contained" onClick={handleSubmit(() => {})}>
            Cadastrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
