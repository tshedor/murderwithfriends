import React from 'react';
import PropTypes from 'prop-types';

const Presenter = ({successMsg, errorMsg}) => {
  if (!successMsg && !errorMsg) {
    return null;
  }

  return (
    <div>
      { successMsg &&
        <div className="notice" role="alert">
          {successMsg}
        </div>
      }

      { errorMsg &&
        <div className="notice -error" role="alert">
          {errorMsg}
        </div>
      }
    </div>
  );
};

Presenter.propTypes = {
  successMsg: PropTypes.string,
  errorMsg: PropTypes.string
};

export default Presenter;
