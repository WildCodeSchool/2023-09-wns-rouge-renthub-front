import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserLastName from '@/components/users/components/UserLastName';

describe('UserLastName Component for Last Name', () => {
  const mockSetLastName = jest.fn();

  it('renders correctly', () => {
    render(<UserLastName lastName="" setLastName={mockSetLastName} />);
    const lastNameInput = screen.getByRole('textbox', { name: /nom/i });
    expect(lastNameInput).toBeInTheDocument();
    expect(lastNameInput).toHaveAttribute('type', 'text');
    expect(lastNameInput).toHaveValue('');
  });

  it('updates last name on valid input', () => {
    render(<UserLastName lastName="" setLastName={mockSetLastName} />);
    const lastNameInput = screen.getByRole('textbox', { name: /nom/i });
    fireEvent.change(lastNameInput, { target: { value: 'Dupont' } });
    expect(mockSetLastName).toHaveBeenCalledWith('Dupont');
  });

  it('shows error for invalid input', () => {
    render(<UserLastName lastName="" setLastName={mockSetLastName} />);
    const lastNameInput = screen.getByRole('textbox', { name: /nom/i });
    fireEvent.change(lastNameInput, { target: { value: 'D1' } });
    const helperText = screen.getByText(/Ne doit contenir que des lettres/i);
    expect(helperText).toBeInTheDocument();
  });

  it('validates last name length', () => {
    render(<UserLastName lastName="" setLastName={mockSetLastName} />);
    const lastNameInput = screen.getByRole('textbox', { name: /nom/i });
    fireEvent.change(lastNameInput, { target: { value: 'Du' } });
    expect(mockSetLastName).toHaveBeenCalledWith('Du');
  });

  // Ajoutez plus de tests si nécessaire pour couvrir d'autres cas ou validations
});
