import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import InputField from './InputField';

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible input component with validation states, multiple variants, and optional features like password toggle and clear button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outlined', 'ghost'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'number'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
  },
  args: {
    onChange: fn(),
    onClear: fn(),
  },
} satisfies Meta<typeof InputField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter some text...',
    helperText: 'This is a helper text',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        variant="outlined"
        label="Outlined Input"
        placeholder="Outlined variant"
        helperText="This is the outlined variant"
      />
      <InputField
        variant="filled"
        label="Filled Input"
        placeholder="Filled variant"
        helperText="This is the filled variant"
      />
      <InputField
        variant="ghost"
        label="Ghost Input"
        placeholder="Ghost variant"
        helperText="This is the ghost variant"
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        size="sm"
        label="Small Input"
        placeholder="Small size"
      />
      <InputField
        size="md"
        label="Medium Input"
        placeholder="Medium size"
      />
      <InputField
        size="lg"
        label="Large Input"
        placeholder="Large size"
      />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <InputField
        label="Normal State"
        placeholder="Normal input"
        helperText="This is a normal input"
      />
      <InputField
        label="Invalid State"
        placeholder="Invalid input"
        invalid
        errorMessage="This field is required"
      />
      <InputField
        label="Disabled State"
        placeholder="Disabled input"
        disabled
        helperText="This input is disabled"
      />
      <InputField
        label="Loading State"
        placeholder="Loading input"
        loading
        helperText="This input is loading"
      />
    </div>
  ),
};

export const WithClearButton: Story = {
  args: {
    label: 'Input with Clear Button',
    placeholder: 'Type something to see clear button',
    value: 'Some text',
    showClearButton: true,
    helperText: 'Clear button appears when there is text',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    value: 'secretpassword',
    helperText: 'Click the eye icon to toggle visibility',
  },
};

export const DarkTheme: Story = {
  render: () => (
    <div className="bg-gray-900 p-6 rounded-lg space-y-4 w-80">
      <InputField
        theme="dark"
        variant="outlined"
        label="Dark Outlined"
        placeholder="Enter text..."
        helperText="Dark theme outlined variant"
      />
      <InputField
        theme="dark"
        variant="filled"
        label="Dark Filled"
        placeholder="Enter text..."
        helperText="Dark theme filled variant"
      />
      <InputField
        theme="dark"
        variant="ghost"
        label="Dark Ghost"
        placeholder="Enter text..."
        helperText="Dark theme ghost variant"
      />
    </div>
  ),
};

export const CompleteExample: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'john@example.com',
    helperText: 'We will never share your email with anyone',
    showClearButton: true,
    value: 'john@example.com',
  },
};