import React, { useState, forwardRef } from 'react';
import { Eye, EyeOff, X, Loader2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  loading?: boolean;
  variant?: 'filled' | 'outlined' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  onClear?: () => void;
  type?: 'text' | 'password' | 'email' | 'number';
  theme?: 'light' | 'dark';
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({
  value = '',
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  loading = false,
  variant = 'outlined',
  size = 'md',
  showClearButton = false,
  onClear,
  type = 'text',
  theme = 'light',
  className,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);
  
  const isPasswordType = type === 'password';
  const inputType = isPasswordType && showPassword ? 'text' : type;
  const currentValue = onChange ? value : internalValue;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };
  
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChange) {
      const syntheticEvent = {
        target: { value: '' }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      setInternalValue('');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-5 py-3 text-lg'
  };
  
  // Variant classes
  const getVariantClasses = () => {
    const baseClasses = 'w-full rounded-lg transition-all duration-200 focus:outline-none focus:ring-2';
    const themeClasses = theme === 'dark' ? 'text-white placeholder-gray-400' : 'text-gray-900 placeholder-gray-500';
    
    if (variant === 'filled') {
      const bgColor = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
      const focusColor = invalid ? 'focus:ring-red-500' : 'focus:ring-blue-500';
      const borderColor = invalid ? 'border-red-500' : 'border-transparent';
      return `${baseClasses} ${bgColor} border ${borderColor} ${focusColor} ${themeClasses}`;
    }
    
    if (variant === 'ghost') {
      const focusColor = invalid ? 'focus:ring-red-500' : 'focus:ring-blue-500';
      const borderColor = invalid ? 'border-red-500' : 'border-transparent';
      return `${baseClasses} bg-transparent border ${borderColor} ${focusColor} ${themeClasses}`;
    }
    
    // outlined (default)
    const borderColor = invalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500';
    const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
    return `${baseClasses} ${bgColor} border ${borderColor} ${themeClasses}`;
  };
  
  // Label classes
  const labelClasses = clsx(
    'block text-sm font-medium mb-1.5',
    theme === 'dark' ? 'text-gray-200' : 'text-gray-700',
    disabled && 'opacity-50'
  );
  
  // Helper/Error text classes
  const textClasses = clsx(
    'mt-1.5 text-sm',
    invalid ? (theme === 'dark' ? 'text-red-400' : 'text-red-600') : (theme === 'dark' ? 'text-gray-400' : 'text-gray-600')
  );
  
  const inputClasses = clsx(
    getVariantClasses(),
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    loading && 'pr-10',
    (showClearButton && currentValue) && 'pr-10',
    isPasswordType && 'pr-10',
    (isPasswordType && (showClearButton && currentValue)) && 'pr-16',
    className
  );
  
  return (
    <div className="relative">
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClasses}
          aria-invalid={invalid}
          aria-describedby={
            errorMessage ? `${props.id}-error` : 
            helperText ? `${props.id}-helper` : undefined
          }
          {...props}
        />
        
        {/* Right side icons container */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
          {loading && (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          )}
          
          {showClearButton && currentValue && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          {isPasswordType && !loading && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
      
      {(errorMessage || helperText) && (
        <div
          id={errorMessage ? `${props.id}-error` : `${props.id}-helper`}
          className={textClasses}
        >
          {errorMessage || helperText}
        </div>
      )}
    </div>
  );
});

InputField.displayName = 'InputField';

export default InputField;