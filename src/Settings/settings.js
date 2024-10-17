import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { settingActions, fetchData, submitName, submitPwd, saveUpdateImage } from './settingsReducer';
import { authActions } from '../AuthReducer/AuthSlice';
import NavBar from '../Dashboard/NavBar';
import TopBar from '../component/TopBar';
import "../Dashboard/dashboard.css";
import 'boxicons/css/boxicons.min.css';
import './setting.css';
import useAxiosPrivate from '../Api/useAxiosPrivate';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9\s-_]{1,38}[a-zA-Z0-9]$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Settings = () => {
    const toggles = useSelector(state => state.toggle);
    const setting = useSelector(state => state.setting);
    const userId = useSelector(state => state.auth.userId);
    const teacherImage = useSelector(state => state.auth.teacherImage);
    const [newName, setNewName] = useState('');
    const [oldPwd, setOldPwd] = useState('');
    const [pwd, setPwd] = useState('');
    const [matchPwd, setMatchPwd] = useState('');

    const { userRef, errRef , image, editImage,
        saved, updatedImage, settingsClickable, 
        email, imageSuccess , validName , validPwd , pwdFocus ,
        errMsg ,success ,success2 ,errMsg2 ,matchFocus ,
        validMatch ,firstName ,lastName, errorImage ,showNamePop ,
        showPwdPop, userFocus} = setting
    const { toggle } = toggles;
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();



    useEffect(() => {
        dispatch(fetchData({userId, axiosPrivate}));
    }, [userId, dispatch]);

    useEffect(() => {
        dispatch(settingActions.setValidName(newName))
        console.log(newName);
    }, [newName, dispatch])

    useEffect(() => {
        dispatch(settingActions.setValidPwd({pwd: pwd, matchPwd: matchPwd}));
    }, [pwd, matchPwd, dispatch])

    useEffect(() => {
        if(updatedImage){
            dispatch(authActions.updateImage(updatedImage))
        }
    }, [updatedImage, dispatch])


    const handleChange = (e) => {
        console.log('I am in here');
        const file = e.target.files[0];
        dispatch(settingActions.setImage(file))
    }

    const saveImage = async () => {
        console.log("i am here")
        dispatch(settingActions.updateState())
        dispatch(saveUpdateImage({userId, image, axiosPrivate}));
    }

    const handleEdit = (e) => {
        console.log('here')
        e.stopPropagation();
        dispatch(settingActions.toHandleEdit())
    }

    const handleDisableEdit = (e) => {
        console.log('i was called') 
       dispatch(settingActions.setHandleDisableEdit());
    }
    const handleUploadBtnClick = (e) => {
        console.log('i am here');
        e.stopPropagation(); 
        dispatch(settingActions.Clickable(true)); 
    }

    const handleNameChange = (e) => {
        dispatch(settingActions.showNamePop())
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = USER_REGEX.test(newName);
        if (!v1) {
            dispatch(settingActions.updateImageError('Invalid Entry'))
            return;
        }
        dispatch(submitName({userId, newName, axiosPrivate}));
        if(errMsg){
            errRef.current.focus()
        }
        
    };

    const handleSubmitPwd = async (e) => {
        e.preventDefault();
        const v1 = PWD_REGEX.test(pwd);
        if (!v1 && !oldPwd) {
            dispatch(settingActions.updateErrMsg('invalid Entry'))
            return;
        }

       dispatch(submitPwd({userId, oldPwd, pwd, axiosPrivate}));
         if(errMsg) {
            errRef.current.focus()
        }
    }

    /*dispatch(settingActions.timeoutAction('pwd', success, success2));*/
    const handlePwdChange = () => {
        dispatch(settingActions.showPwdPop());
    }

    setTimeout(() => {
        if (imageSuccess) {
           dispatch(settingActions.updateImageSucc())
        } else if(errorImage) {
            dispatch(settingActions.updateImageError())
        }
    }, 2000);

    const timeoutFunction = (variable) => {
        setTimeout(() => {
            if (variable === 'pwd' && success2) {
                console.log('pddd')
               dispatch(settingActions.timeOut1())
            } else if(success) {
                console.log('name')
                dispatch(settingActions.timeOut2())
            }
        }, 2000);
    };

    timeoutFunction('pwd');
  return (
    <div>
        <NavBar />
        <div className={`main ${toggle ? 'active' : ''}`}>
            <TopBar opt={false} />
            <div className="settings" onClick={settingsClickable ? null : handleDisableEdit}>
                <div className="editpics">
                    {imageSuccess ? (<h4 className="imageSuccess">{imageSuccess} <i class='bx bx-check-circle'></i></h4>) : (
                        <h4 className="imageError">{errorImage}</h4>
                    )}
                    <div className="picsEdit">
                        {teacherImage !== null ? (
                            <img src={`https://Osei.pythonanywhere.com/api/learners/v1/${teacherImage}`} alt="profile-pics" />
                            ) : updatedImage !== null ? (
                            <img src={`https://Osei.pythonanywhere.com/api/learners/v1/${updatedImage}`} alt="profile-pics" />
                            ) : (
                            <i className='bx bxs-user-circle'></i>
                        )}
                        <span onClick={handleEdit}>Edit <i class='bx bx-edit-alt'></i></span>
                        <div className="fn">
                        {editImage &&
                        <div className="labelWrapper">
                            <label onClick={handleUploadBtnClick} for="uploadBtn"><i class='bx bx-upload'></i> Upload pics</label>
                            <input className="uploadBtn" id="uploadBtn" type="file" name="image" accept="image/*" onChange={handleChange}  />
                        </div>
                        }
                        {image && editImage && saved &&
                        <span 
                        onClick={saveImage}>Save</span>
                        }
                        </div>
                    </div>
                </div>

                <div className="userName">
                    <h4>Name</h4>
                    <span>{lastName} {firstName} </span>
                    <span onClick={handleNameChange} className="changes">Change Name</span>
                    {showNamePop && <div className="namePopUp" onClick={handleNameChange}>
                    {success ? (
                        <p className="success">Successfull <i class='bx bx-check-circle'></i></p>
                    ): (
                    <>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form className="PopUp" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
                            <label htmlFor="username">
                                Username:&nbsp; 
                                <span className={validName ? "valid" : "hide"}>
                                    <i class='bx bx-check'></i> 
                                </span>
                                <span className={validName || !newName ? "hide" : "invalid"}>
                                    <i class='bx bx-x'></i>
                                </span>
                            </label>
                            <input
                            type="text"
                            id="username"
                            placeholder='Lastname Firstname'
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setNewName(e.target.value)}
                            required
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => dispatch(settingActions.onUserFocus(true))}
                            onBlur={() => dispatch(settingActions.onUserFocus(false))}
                            style={{ marginBottom: (userFocus && newName && !validName)  ? '0px' : '20px' }}
                            />
                            <p id="uidnote" className={userFocus && newName && !validName ? 'instructions' : "offscreen"}>
                                <i class='bx bx-info-circle'></i>&nbsp;
                                4 to 40 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>
                            <button disabled={!validName  ? true : false}>Save</button>
                        </form>
                        </>)}
                    </div>}
                </div>
                <div className="email">
                    <h4>Email</h4>
                    <span>{email}</span>
                </div>
                <div className="password">
                    <h4>Password</h4>
                    <span className="changes" onClick={handlePwdChange}>Change Passwords</span>
                    {showPwdPop && <div className="namePopUp2" onClick={handlePwdChange}>
                    {success2 ? (
                        <p className="success">Successfull <i class='bx bx-check-circle'></i></p>
                    ): (
                    <>
                    <p ref={errRef} className={errMsg2 ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg2}</p>
                    <form className="PopUp2" onSubmit={handleSubmitPwd} onClick={(e) => e.stopPropagation()}>
                        <label htmlFor="oldpwd">
                            Old password
                        </label>
                        <input 
                            type="password"
                            id="oldpwd"
                            onChange={(e) => setOldPwd(e.target.value)}
                            required
                            style={{ marginBottom:'20px' }}
                        />
                        <label htmlFor="password">
                            Password:&nbsp;
                            <span className={validPwd ? "valid" : "hide"}>
                                <i class='bx bx-check'></i> 
                            </span>
                            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                            <i class='bx bx-x'></i>
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            aria-invalid={validPwd ? "false" : "true"}
                            aria-describedby="pwdnote"
                            onFocus={() => dispatch(settingActions.onPwdFocus(true))}
                            onBlur={() => dispatch(settingActions.onPwdFocus(false))}
                            style={{ marginBottom: pwdFocus && !validPwd ? '0px' : '20px' }}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                            <i class='bx bx-info-circle'></i>&nbsp;
                                8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">! </span>
                            <span aria-label="at symbol">@ </span><span aria-label="hashtag"># </span>
                            <span aria-label="dollar sign">$ </span> <span aria-label="percent">% </span>
                        </p>

                        <label htmlFor="confirm_pwd">
                            Confirm Password:&nbsp;
                            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                                <i class='bx bx-check'></i> 
                            </span>
                            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                                <i class='bx bx-x'></i>
                            </span>
                        </label>
                        <input 
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => dispatch(settingActions.onMatchFocus(true))}
                            onBlur={() => dispatch(settingActions.onMatchFocus(false))}
                            style={{ marginBottom: matchFocus && !validMatch ? '0px' : '20px' }}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <i class='bx bx-info-circle'></i>&nbsp;
                            8 to 24 characters.<br />
                            Must match the first password input field.
                        </p>
                        <button disabled={!validPwd || !oldPwd || !validMatch ? true : false}>Save</button>
                        </form>
                    </>)}
                    </div>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings