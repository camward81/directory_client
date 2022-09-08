import React from "react";
// import PropTypes from "prop-types";

const Progress = ({ uploadPercentage }) => {
  return (
    <div className="progress">
      <div
        className="progress-bar"
        // role="progressbar"
        style={{ width: `${uploadPercentage}%` }}
      ></div>
      {uploadPercentage === 100 ? (
        <p className="completed">Upload Completed!</p>
      ) : (
        ""
      )}
    </div>
  );
};

// Progress.propTypes = {
//   percentage: PropTypes.number.isRequired,
// };

export default Progress;
