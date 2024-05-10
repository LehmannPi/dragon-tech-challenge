import { errorMessages } from '@/validation/validationErrors';
import { describe, expect, it } from '@jest/globals';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ContactForm from '../ContactForm';

describe('Contact Form', () => {
  it('should render all the fields on contact form', () => {
    render(<ContactForm />);
    const nameElement = screen.getByText(/nome/i);
    const cpfElement = screen.getByText(/cpf/i);
    const phoneElement = screen.getByText(/telefone/i);
    const zipElement = screen.getByText(/cep/i);
    const streetElement = screen.getByText(/logradouro/i);
    const compElement = screen.getByText(/complemento/i);
    const neighborhoodElement = screen.getByText(/bairro/i);
    const cityElement = screen.getByText(/cidade/i);
    const stateElement = screen.getByText(/estado/i);
    const latElement = screen.getByText(/latitude/i);
    const lngElement = screen.getByText(/longitude/i);
    const button = screen.getByText(/cadastrar/i);

    expect(nameElement).toBeInTheDocument();
    expect(cpfElement).toBeInTheDocument();
    expect(phoneElement).toBeInTheDocument();
    expect(zipElement).toBeInTheDocument();
    expect(streetElement).toBeInTheDocument();
    expect(compElement).toBeInTheDocument();
    expect(neighborhoodElement).toBeInTheDocument();
    expect(cityElement).toBeInTheDocument();
    expect(stateElement).toBeInTheDocument();
    expect(latElement).toBeInTheDocument();
    expect(lngElement).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should validate fields on button click', async () => {
    render(<ContactForm />);
    const button = screen.getByText(/cadastrar/i);

    const nameInput = screen.getByTestId('name-input');
    const cpf = screen.getByTestId('cpf-input');

    fireEvent.change(nameInput, {
      target: { value: '' },
    });
    fireEvent.change(cpf, {
      target: { value: '12345678900' },
    });

    fireEvent.click(button);

    // Assert error messages
    expect(
      await screen.findByText(errorMessages().required)
    ).toBeInTheDocument();
    expect(await screen.findByText(errorMessages().cpf)).toBeInTheDocument();
  });

  it('should not exibit validation errors when fields properly filled', async () => {
    render(<ContactForm />);
    const nameElement = screen.getByText(/nome/i);
    const button = screen.getByText(/cadastrar/i);

    fireEvent.change(screen.getByTestId('name-input'), {
      target: { value: 'Filipe' },
    });
    fireEvent.change(screen.getByTestId('cpf-input'), {
      target: { value: '68779441009' },
    });

    fireEvent.click(button);

    // Assert error messages
    expect(
      screen.queryByText(errorMessages().required)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(errorMessages().cpf)).not.toBeInTheDocument();
  });
});
