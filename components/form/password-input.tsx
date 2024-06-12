'use client';
import { useState } from 'react';
import { RHFInput } from './RHFInput';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

type PasswordInputProps = {
  name: string;
  label?: string;
  isRequired?: boolean;
  autoComplete?: string;
};

const PasswordInput = ({
  name,
  label = 'Password',
  autoComplete = 'new-password',
  isRequired = true,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <RHFInput
      label={label}
      name={name}
      isRequired={isRequired}
      autoComplete={autoComplete}
      type={showPassword ? 'text' : 'password'}
      endContent={
        <i
          onClick={() => setShowPassword(!showPassword)}
          className='flex-shrink-0 cursor-pointer text-2xl text-default-400'
        >
          {showPassword ? <EyeIcon /> : <EyeOffIcon />}
        </i>
      }
    />
  );
};
export default PasswordInput;
