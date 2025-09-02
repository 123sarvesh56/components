import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import InputField from './InputField';

describe('InputField', () => {
  it('renders with label and placeholder', () => {
    render(
      <InputField
        label="Test Label"
        placeholder="Test placeholder"
      />
    );
    
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(
      <InputField
        label="Test Label"
        helperText="This is helper text"
      />
    );
    
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('displays error message when invalid', () => {
    render(
      <InputField
        label="Test Label"
        invalid
        errorMessage="This field is required"
      />
    );
    
    expect(screen.getByText('This field is required')).toBeInTheDocument();
    const input = screen.getByLabelText('Test Label');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('calls onChange when value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    
    render(
      <InputField
        label="Test Label"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByLabelText('Test Label');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('shows clear button when enabled and has value', () => {
    render(
      <InputField
        label="Test Label"
        value="test value"
        showClearButton
      />
    );
    
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('clears value when clear button is clicked', async () => {
    const user = userEvent.setup();
    const handleClear = vi.fn();
    
    render(
      <InputField
        label="Test Label"
        value="test value"
        showClearButton
        onClear={handleClear}
      />
    );
    
    const clearButton = screen.getByRole('button');
    await user.click(clearButton);
    
    expect(handleClear).toHaveBeenCalled();
  });

  it('toggles password visibility', async () => {
    const user = userEvent.setup();
    
    render(
      <InputField
        label="Password"
        type="password"
        value="secret"
      />
    );
    
    const input = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button');
    
    expect(input).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');
  });

  it('shows loading state', () => {
    render(
      <InputField
        label="Test Label"
        loading
      />
    );
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(
      <InputField
        label="Test Label"
        disabled
      />
    );
    
    const input = screen.getByLabelText('Test Label');
    expect(input).toBeDisabled();
  });
});