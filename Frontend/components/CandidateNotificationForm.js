import React, { useState } from 'react';
import { sendJobAlert } from '../api/api';

const CandidateNotificationForm = ({ token }) => {
    const [formData, setFormData] = useState({ candidates: [{ email: '' }], jobDetails: { title: '', description: '' } });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, jobDetails: { ...formData.jobDetails, [e.target.name]: e.target.value } });
    };

    const handleCandidateChange = (index, value) => {
        const updatedCandidates = [...formData.candidates];
        updatedCandidates[index].email = value;
        setFormData({ ...formData, candidates: updatedCandidates });
    };

    const handleAddCandidate = () => {
        setFormData({ ...formData, candidates: [...formData.candidates, { email: '' }] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await sendJobAlert(formData, token);
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError(err.response.data.message);
            setSuccess('');
        }
    };

    return (
        <div>
            <h2>Send Job Alerts</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
                <input type="text" name="description" placeholder="Job Description" onChange={handleChange} required />
                {formData.candidates.map((candidate, index) => (
                    <input
                        key={index}
                        type="email"
                        placeholder={`Candidate ${index + 1} Email`}
                        value={candidate.email}
                        onChange={(e) => handleCandidateChange(index, e.target.value)}
                        required
                    />
                ))}
                <button type="button" onClick={handleAddCandidate}>Add Candidate</button>
                <button type="submit">Send Alerts</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default CandidateNotificationForm;
