import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-4 border rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}; 