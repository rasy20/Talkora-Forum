import React from 'react';
/**
 * Skenario pengujian untuk komponen LoginInput:
 *
 * 1. Merender form dengan input email dan password
 * 2. Memanggil onLogin callback dengan data email dan password saat form di-submit
 */

import {
  describe, it, expect, vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from '../../src/components/auth/LoginInput';

describe('LoginInput component', () => {
  it('should render email and password input fields', () => {
    render(<LoginInput onLogin={() => {}} />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Masuk' })).toBeInTheDocument();
  });

  it('should call onLogin with email and password when form is submitted', async () => {
    const mockOnLogin = vi.fn();
    render(<LoginInput onLogin={mockOnLogin} />);

    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Masuk' });

    await userEvent.type(emailInput, 'febss@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);

    expect(mockOnLogin).toHaveBeenCalledWith({
      email: 'febss@example.com',
      password: 'password123',
    });
  });
});
