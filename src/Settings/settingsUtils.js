const timeoutFunction = (variable, success, success2, setSuccess, setShowNamePop, setSuccess2, setShowPwdPop) => {
    setTimeout(() => {
        if (variable === 'pwd' && success2) {
            setSuccess2(false);
            setShowPwdPop(false);
        } else if(success) {
            setSuccess(false);
            setShowNamePop(false);
        }
    }, 2000);
};


export {timeoutFunction}