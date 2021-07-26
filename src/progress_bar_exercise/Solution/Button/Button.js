import './Button.scss';

import React from 'react';

const Button = ({ isLoading, ...props })  => {
  return (
    <button className={'upcase medium'} disabled={isLoading} {...props} />
  )
};

export default Button;

