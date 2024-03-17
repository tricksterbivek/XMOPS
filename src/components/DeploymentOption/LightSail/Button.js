import React from 'react';

const Button = ({
  children,
  onClick,
  disabled,
  isLoading,
  className,
  ...rest
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? <span className="spinner"></span> : children}
    </button>
  );
};

export default Button;