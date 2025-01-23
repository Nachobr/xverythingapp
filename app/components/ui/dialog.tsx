import React from 'react';

interface DialogProps {
  open: boolean;
  onOpenChange: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay" onClick={onOpenChange}>
      <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export const DialogContent: React.FC<DialogContentProps> = ({ className, children }) => (
  <div className={className}>{children}</div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="dialog-header">{children}</div>
);

export const DialogTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({ className, children }) => (
  <h2 className={className}>{children}</h2>
);

export const DialogTrigger: React.FC<{ asChild: boolean; children: React.ReactNode }> = ({ asChild, children }) => (
  <div>{children}</div>
); 