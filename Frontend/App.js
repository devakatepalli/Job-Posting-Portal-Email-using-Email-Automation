import React, { useState } from 'react';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import JobPostingForm from './components/JobPostingForm';
import JobList from './components/JobList';
import CandidateNotificationForm from './components/CandidateNotificationForm';

const App = () => {
    const [token, setToken] = useState('');

    return (
        <div>
            <h1>Job Posting Board</h1>
            <RegistrationForm />
            <LoginForm setToken={setToken} />
            {token && <JobPostingForm token={token} />}
            {token && <JobList />}
            {token && <CandidateNotificationForm token={token} />}
        </div>
    );
};

export default App;
