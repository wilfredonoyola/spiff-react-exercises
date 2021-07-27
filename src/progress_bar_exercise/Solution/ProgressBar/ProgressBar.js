import './ProgressBar.scss';

import React from 'react';

const ProgressBar = ({ percent })  => {
  const hideClass = percent === 100 ?  ' hide-progressbar': '';
  return (
    <div className={ 'container-progress-bar' + hideClass }>
    <div className="container-default">
      <div className="container-filling" style={{ width: percent + '%' }}></div>
    </div>
  </div>
  )
};

export default ProgressBar;