import React, { useEffect, useState } from 'react';
import { getJobs } from '../api/api'; // You need to create this function in api.js

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState('');

    const fetchJobs = async () => {
        try {
            const response = await getJobs();
            setJobs(response.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div>
            <h2>Available Jobs</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {jobs.map(job => (
                    <li key={job._id}>
                        <h3>{job.title}</h3>
                        <p>{job.description}</p>
                        <p>Experience Level: {job.experienceLevel}</p>
                        <p>End Date: {new Date(job.endDate).toLocaleDateString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobList;
