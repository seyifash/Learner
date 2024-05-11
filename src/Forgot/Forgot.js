import React, { useState } from 'react';
import './forgot.css'
import axios from 'axios';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [msg, setMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(true);
        setMsg('A link has been sent to you email for verification');

        /*try {
            const response = await axios.post('YOUR_API_ENDPOINT', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error occurred while processing your request.');
        }*/
    };
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (
        <div className="fgpwd">
            <form onSubmit={handleSubmit}>
            {msg && <p>{msg}</p>}
            <h2>Forgot Password?</h2>
                <div>
                    <label htmlFor="email">Enter your registered email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" disabled={!email ? true : false}>Submit</button>
            </form>
        </div>
    );
};

export default Forgot;