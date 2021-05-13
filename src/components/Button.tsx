import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ label, onClick }) => (
  <button data-testid="custom-button" onClick={onClick}>
    {label}
  </button>
);
