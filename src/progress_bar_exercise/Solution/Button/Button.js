import './Button.scss';

import React from 'react';

const Button = ({ className, isLoading, ...props })  => {
  return (
    <button className={className + ' upcase medium'} disabled={isLoading} {...props} />
  )
};

export default Button;

