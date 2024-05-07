import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const ParagraphGenerator = ({ id, typeText, Focus, Names, validNames }) => {
  
  switch (typeText) {
      case 'name':
        return (
              <p id={id} className={Focus && Names && !validNames ? 'instructions' : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
                    4 to 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                </p>
          );
          
      case 'password':
        return  (
            <p id={id} className={Focus && !validNames ? 'instructions' : "offscreen"}>
              <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
              8 to 24 characters.<br />
              Must include uppercase and lowercase letters, a number and a special character.<br />
              Allowed special characters: <span aria-label="exclamation mark">! </span>
              <span aria-label="at symbol">@ </span><span aria-label="hashtag"># </span>
              <span aria-label="dollar sign">$ </span> <span aria-label="percent">% </span>
              </p>
          );

      case 'email':
        return (
          <p id={id} className={Focus && Names && !validNames ? 'instructions' : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
            Should Contain an @ symbol<br />
          </p>
        );

      case 'matchpwd':
        return (
          <p id={id} className={Focus && !validNames ? 'instructions' : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle} />&nbsp;
            8 to 24 characters.<br />
            Must match the first password input field.
          </p>
        );

    default:
      return null
    
  }

};

ParagraphGenerator.propTypes = {
  id: PropTypes.string.isRequired,
  typeText: PropTypes.string.isRequired,
  Focus: PropTypes.bool.isRequired,
  Names: PropTypes.string,
  validNames: PropTypes.bool.isRequired,
};


export default ParagraphGenerator;
