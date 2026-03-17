import React from 'react';
/**
 * Skenario pengujian untuk komponen RegisterInput:
 *
 * 1. Merender form dengan input nama, email, dan password
 * 2. Memanggil onRegister callback dengan data form saat di-submit
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from '../../src/components/auth/RegisterInput';

describe('RegisterInput component', () => {
  it('should render name, email, and password input fields', () => {
    render(<RegisterInput onRegister={() => {}} />);

    expect(screen.getByLabelText('Nama')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Buat Akun' })).toBeInTheDocument();
  });

  it('should call onRegister with name, email, and password when form is submitted', async () => {
    const mockOnRegister = vi.fn();
    render(<RegisterInput onRegister={mockOnRegister} />);

    const nameInput = screen.getByLabelText('Nama');
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Buat Akun' });

    await userEvent.type(nameInput, 'febss rasy');
    await userEvent.type(emailInput, 'febss@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(mockOnRegister).toHaveBeenCalledWith({
      name: 'febss rasy',
      email: 'febss@example.com',
      password: 'password123',
    });
  });
});
