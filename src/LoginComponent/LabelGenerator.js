import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

const LabelGenerator = ({ htmlFor, text, name, valid }) => {
  return (
    <>
    {valid !== undefined ? (
      <label htmlFor={htmlFor}>
        {text}&nbsp;
        <span className={valid  ? "valid" : "hide"}>
          <FontAwesomeIcon icon={faCheck} />
        </span>
        <span className={valid || !name ? "hide" : "invalid"}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
      </label>
      ) : (
          <label htmlFor={htmlFor}>
            {text}
          </label>
      )}
      </>
  );
};

LabelGenerator.propTypes = {
  htmlFor: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string,
  valid: PropTypes.bool
}

export default LabelGenerator;