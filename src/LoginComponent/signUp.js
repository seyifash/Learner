import { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { loginActions } from "../LoginReducer/loginVerificationSlice";
import InputGenerator from "./inputGenerator";
import ParagraphGenerator from "./ParagraphGenerator";
import LabelGenerator from "./LabelGenerator";
import { authActions, createUser } from "../AuthReducer/AuthSlice";
import {  useNavigate } from "react-router-dom";

import './signUp.css';

const SignUp = () => {
    const userRef = useRef();
    const navigate = useNavigate();
    const errRef = useRef();
    const [matchPwd, setMatchPwd] = useState('');

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        institution: '',
        password: ''
    });

    const loginVerifyState = useSelector((state) => state.loginVerify);
    const Auth = useSelector((state) => state.auth);
    const { error, isLoggedIn, userId } = Auth;
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    }


    const {
        validFirstName, firstNameFocus, validLastName,
        lastNameFocus, validEmail, emailFocus,
        validPwd, pwdFocus, validMatch, matchFocus } = loginVerifyState;
        console.log(validMatch)
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        dispatch(loginActions.setFirstNameValid(formData.first_name));
    }, [formData.first_name, dispatch])

    useEffect(() => {
        dispatch(loginActions.setLastNameValid(formData.last_name));
    }, [formData.last_name, dispatch])

    useEffect(() => {
        dispatch(loginActions.setValidEmail(formData.email));
    }, [formData.email, dispatch])


    useEffect(() => {
        dispatch(loginActions.setValidPwd({pwd: formData.password, matchPwd: matchPwd}));
    }, [formData.password, matchPwd, dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('im in here');
        const v1 = validFirstName;
        const v2 = validLastName;
        const v3 = validPwd;
        const v4 = validEmail
        if(!v1 || !v2 || !v3 || !v4) {
            dispatch(authActions.setErrorMsg("Invalid Entry"));
            return;
        } else {
           dispatch(createUser(formData));
            if(userId){
            dispatch(authActions.loginUser(true))
            } 
            if(isLoggedIn){
                return  navigate("/dashboard");
            }
        }
    } 

    useEffect(() => {
        dispatch(authActions.setErrorMsg(""));
    }, [formData.first_name, formData.last_name,
        formData.password,formData.email, 
        matchPwd, dispatch])


    return (
        <div className="signup">
            <h1>Hello</h1>
            <h3>welcome Back Tutors</h3>
                <section className="section-signUp">
                    <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>
                        <LabelGenerator htmlFor="Firstname" text="Firstname:" name={formData.first_name} valid={validFirstName} />
                        <InputGenerator describedBy={'fuidnote'} handleChange={handleChange} formData={formData} userRef={userRef} />
                        <ParagraphGenerator id={'fuidnote'} typeText="name" Focus={firstNameFocus} Names={formData.first_name} validNames={validFirstName} />

                        <LabelGenerator htmlFor="Lastname" text="Lastname:" name={formData.last_name} valid={validLastName} />
                        <InputGenerator describedBy={'luidnote'} handleChange={handleChange} formData={formData} userRef={userRef} />
                        <ParagraphGenerator id={'luidnote'} typeText="name" Focus={lastNameFocus} Names={formData.last_name} validNames={validLastName} />

                        <LabelGenerator htmlFor="email" text="Email:" name={formData.email} valid={validEmail} />
                        <InputGenerator describedBy={'Euidnote'} handleChange={handleChange} formData={formData} userRef={userRef} />
                        <ParagraphGenerator id={'Euidnote'} typeText="email" Focus={emailFocus} Names={formData.email} validNames={validEmail}  Style={false} />

                        <LabelGenerator htmlFor="institution" text="Insitution:" />
                        <InputGenerator handleChange={handleChange} formData={formData} userRef={userRef} /> 

                        <LabelGenerator htmlFor="password" text="Password:" name={formData.password} valid={validPwd} />
                        <InputGenerator describedBy={'pwdnote'} handleChange={handleChange} formData={formData} userRef={userRef} />
                        <ParagraphGenerator id={'pwdnote'} typeText="password" Focus={pwdFocus} Names={formData.password} validNames={validPwd}  Style={false} />

                        <LabelGenerator htmlFor="confirm_pwd" text="Confirm Password:" name={matchPwd} valid={validMatch} />
                        <InputGenerator describedBy={'confirmnote'} formData={formData} userRef={userRef} setMatchPwd={setMatchPwd} />
                        <ParagraphGenerator id={'confirmnote'} typeText="matchpwd" Focus={matchFocus} Names={matchPwd} validNames={validMatch} />

                        <button disabled={!validFirstName || !validLastName || !validPwd || !validMatch || !formData.institution || !formData.email ? true : false}>
                            Sign Up
                        </button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            <Link href="/sign-in">Sign In</Link>
                        </span>
                    </p>
                </section>
        </div>
    )
}

export default SignUp