import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { loginActions } from "../LoginReducer/loginVerificationSlice";

const InputGenerator = ({ describedBy, handleChange, formData, userRef, setMatchPwd, Style}) => {

  const loginVerifyState = useSelector( state => state.loginVerify);
    const {
      validFirstName, firstNameFocus, validLastName,
      lastNameFocus, validEmail, emailFocus,
      validPwd, pwdFocus, validMatch, 
      matchFocus } = loginVerifyState;

    const dispatch = useDispatch();

    let inputProperties = {}

    switch(describedBy) {
      case 'fuidnote':
        inputProperties = {
          type: 'text',
          id: 'Firstname',
          name: 'first_name',
          value: formData.first_name,
          ref: userRef,
          autoComplete: 'off',
          onChange: handleChange,
          required: true,
          ariaInvalid: validFirstName ? 'false' : 'true',
          ariaDescribedby: 'fuidnote',
          onFocus: () => dispatch(loginActions.onFirstFocus(true)),
          onBlur: () => dispatch(loginActions.onFirstFocus(false)),
          style: {marginBottom: firstNameFocus && formData.first_name && !validFirstName ? '0px' : '20px'}
        }
        break;

        case 'luidnote':
          inputProperties = {
            type: 'text',
            id: 'Lastname',
            name: 'last_name',
            value: formData.last_name,
            ref: userRef,
            autoComplete: 'off',
            onChange: handleChange,
            required: true,
            ariaInvalid: validLastName ? 'false' : 'true',
            ariaDescribedby: 'luidnote',
            onFocus: () => dispatch(loginActions.onLastFocus(true)),
            onBlur: () => dispatch(loginActions.onLastFocus(false)),
            style: {marginBottom: lastNameFocus && formData.last_name && !validLastName ? '0px' : '20px'}
          }
          break;
      case 'Euidnote':
        inputProperties = {
          type: 'email',
          id: 'email',
          name: 'email',
          value: formData.email,
          ref: userRef,
          autoComplete: 'off',
          onChange: handleChange,
          required: true,
          ariaInvalid: validEmail ? 'false' : 'true',
          ariaDescribedby: 'Euidnote',
          onFocus: () => dispatch(loginActions.onEmailFocus(true)),
          onBlur: () => dispatch(loginActions.onEmailFocus(false)),
          style: {
            marginBottom: !Style ? (emailFocus && formData.email && !validEmail ? '0px' : '20px') : '20px'
          }
        }
        break;

      case 'pwdnote':
        inputProperties = {
          type: 'password',
          id: 'password',
          name: 'password',
          value: formData.password,
          ref: userRef,
          autoComplete: 'off',
          onChange: handleChange,
          required: true,
          ariaInvalid: validPwd ? 'false' : 'true',
          ariaDescribedby: 'pwdnote',
          onFocus: () => dispatch(loginActions.onPwdFocus(true)),
          onBlur: () => dispatch(loginActions.onPwdFocus(false)),
          style: {
            marginBottom: !Style ? (pwdFocus && !validPwd ? '0px' : '20px') : '20px'
          }
        }
        break;

      case 'confirmnote':
        inputProperties = {
          type: 'password',
          id: 'confirm_pwd',
          ref: userRef,
          autoComplete: 'off',
          onChange: (e) => setMatchPwd(e.target.value),
          required: true,
          ariaInvalid: validMatch ? 'false' : 'true',
          ariaDescribedby: 'confirmnote',
          onFocus: () => dispatch(loginActions.onMatchFocus(true)),
          onBlur: () => dispatch(loginActions.onMatchFocus(false)),
          style: {marginBottom: matchFocus && !validMatch ? '0px' : '20px'}
        }
        break;

      default:
        inputProperties = {
          type: 'text',
          id: 'insititution',
          name: 'institution',
          value: formData.institution,
          ref: userRef,
          onChange: handleChange,
          required: true,
          onFocus: () => dispatch(loginActions.onInstFocus(true)),
          onBlur: () => dispatch(loginActions.onInstFocus(false)),
          style: {marginBottom: '20px'}
        }
        break;
    }

  return <input
      type={inputProperties.type}
      id={inputProperties.id}
      name={inputProperties.name}
      value={inputProperties.value}
      ref={inputProperties.ref}
      autoComplete={inputProperties.autoComplete ?  inputProperties.autoComplete : undefined}
      onChange={inputProperties.onChange}
      required={inputProperties.required}
      aria-invalid={inputProperties.ariaInvalid ? inputProperties.ariaInvalid : undefined}
      aria-describedby={inputProperties.ariaDescribedby ? inputProperties.ariaDescribedby : undefined}
      onFocus={inputProperties.onFocus}
      onBlur={inputProperties.onBlur}
      style={inputProperties.style} 
   />;
};

InputGenerator.propTypes = {
  describedBy: PropTypes.string,
  handleChange: PropTypes.func,
  formData: PropTypes.object,
  userRef: PropTypes.object.isRequired,
  setMatchPwd: PropTypes.func,
  Style: PropTypes.bool,
};


export default InputGenerator;
