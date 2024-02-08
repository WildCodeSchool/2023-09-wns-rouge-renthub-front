import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserEmail from '@/components/users/components/UserEmail';

describe('UserEmail', () => {
  it('correct base render', () => {
    render(<UserEmail email="" setEmail={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    expect(emailInput).toBeInTheDocument();
    // expect(screen.getByLabelText('Email*')).toBeInTheDocument();
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveValue('');
  });
  it('correct render with email value', () => {
    render(<UserEmail email="test@super.com" setEmail={() => {}} />);

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toBeRequired();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveValue('test@super.com');
  });
  it('call setEmail when the value changes', () => {
    const setEmailMock = jest.fn();
    render(<UserEmail email="" setEmail={setEmailMock} />);

    const emailInput = screen.getByRole('textbox', { name: /Email/i });
    fireEvent.change(emailInput, { target: { value: 'tropcool@tiptop.com' } });

    expect(setEmailMock).toHaveBeenCalledWith('tropcool@tiptop.com');
  });
});
