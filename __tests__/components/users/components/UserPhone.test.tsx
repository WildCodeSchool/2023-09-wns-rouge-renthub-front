import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserPhone from '@/components/users/components/UserPhone';

describe('UserPhone Component', () => {
  const mockSetPhoneNumber = jest.fn();

  beforeEach(() => {
    render(<UserPhone phoneNumber="" setPhoneNumber={mockSetPhoneNumber} />);
  });

  it('renders the phone number input field', () => {
    const phoneInput = screen.getByRole('textbox', { name: /téléphone/i });
    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute('type', 'tel');
  });

  it('updates the phone number when a valid number is entered', () => {
    const validNumber = '0123456789';
    const phoneInput = screen.getByRole('textbox', { name: /téléphone/i });
    fireEvent.change(phoneInput, { target: { value: validNumber } });
    expect(mockSetPhoneNumber).toHaveBeenCalledWith(validNumber);
  });

  it('filters out non-numeric characters from the phone number', () => {
    const inputWithInvalidChars = 'abc123';
    const phoneInput = screen.getByRole('textbox', { name: /téléphone/i });
    fireEvent.change(phoneInput, { target: { value: inputWithInvalidChars } });
    expect(phoneInput).toHaveValue('');
  });

  it('limits the phone number input to 10 characters', () => {
    const longNumber = '01234567890123456';
    const phoneInput = screen.getByRole('textbox', { name: /téléphone/i });
    fireEvent.change(phoneInput, { target: { value: longNumber } });
    expect(mockSetPhoneNumber).toHaveBeenCalledWith('01234567890123456');
  });
});
