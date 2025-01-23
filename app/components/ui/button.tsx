import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'outline' | 'filled';
}

const Button: React.FC<ButtonProps> = ({ children, variant, ...props }) => {
  const baseStyles = "h-12 text-base font-medium";
  const variantStyles = variant === 'outline' ? "border border-gray-800 bg-transparent" : "bg-white text-black";

  return (
    <button className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </button>
  );
};

export default Button; 