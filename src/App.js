import useFetchJobs from './useFetchJobs';
import { Container } from 'react-bootstrap';
import React, { useState } from 'react';
import Job from './Job';

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(1);
  const { jobs, loading, error } = useFetchJobs();

  return (
    <Container className="my-4">
      <h1 className="mb-4">Github Jobs</h1>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try refreshing.</h1>}
      {jobs.map(job => {
        return <Job key={job.id} job={job} />
      })}
    </Container>
  );
}

export default App;
