import React, { useState } from 'react';
import { postJob } from '../api/api';

const JobPostingForm = ({ token }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        experienceLevel: '',
        endDate: '',
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await postJob(formData, token);
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Post a Job</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
                <textarea name="description" placeholder="Job Description" onChange={handleChange} required />
                <input type="text" name="experienceLevel" placeholder="Experience Level" onChange={handleChange} required />
                <input type="date" name="endDate" onChange={handleChange} required />
                <button type="submit">Post Job</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default JobPostingForm;
