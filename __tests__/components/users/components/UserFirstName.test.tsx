import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserName from '@/components/users/components/UserFirstName';

describe('UserName Component', () => {
  const mockSetFirstName = jest.fn();

  it('renders correctly', () => {
    render(<UserName firstName="" setFirstName={mockSetFirstName} />);
    const firstNameInput = screen.getByRole('textbox', { name: /prénom/i });
    expect(firstNameInput).toBeInTheDocument();
    expect(firstNameInput).toHaveAttribute('type', 'text');
    expect(firstNameInput).toHaveValue('');
  });

  it('updates first name on valid input', () => {
    render(<UserName firstName="" setFirstName={mockSetFirstName} />);
    const firstNameInput = screen.getByRole('textbox', { name: /prénom/i });
    fireEvent.change(firstNameInput, { target: { value: 'Alice' } });
    expect(mockSetFirstName).toHaveBeenCalledWith('Alice');
  });

  it('shows error for invalid input', () => {
    render(<UserName firstName="" setFirstName={mockSetFirstName} />);
    const firstNameInput = screen.getByRole('textbox', { name: /prénom/i });
    fireEvent.change(firstNameInput, { target: { value: 'A' } });
    const helperText = screen.getByText(/Ne doit contenir que des lettres/i);
    expect(helperText).toBeInTheDocument();
  });

  it('validates first name length', () => {
    render(<UserName firstName="" setFirstName={mockSetFirstName} />);
    const firstNameInput = screen.getByRole('textbox', { name: /prénom/i });
    fireEvent.change(firstNameInput, { target: { value: 'Ab' } });
    expect(mockSetFirstName).toHaveBeenCalledWith('Ab');
  });
});
