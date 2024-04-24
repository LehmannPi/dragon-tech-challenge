export const errorMessages = (data?: number) => ({
  required: 'Campo obrigatório',
  minTextSize: `Mínimo ${data} caracteres`,
  maxTextSize: `Máximo ${data} caracteres`,
  email: 'Email inválido',
});
