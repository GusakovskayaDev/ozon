import React from 'react';
import styles from './button.module.css';

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  pure?: boolean;
};

const Button = ({
  onClick,
  children,
  className,
  pure = false,
}: ButtonProps) => {
	
  const finalClassName = pure
    ? className || ''
    : `${styles.button} ${className || ''}`.trim();

  return (
    <button className={finalClassName} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
