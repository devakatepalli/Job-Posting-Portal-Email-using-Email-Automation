import React, { useState } from 'react';
import { registerCompany } from '../api/api';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        mobile: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerCompany(formData);
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Company Registration</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Company Name" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <input type="text" name="mobile" placeholder="Mobile" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default RegistrationForm;
