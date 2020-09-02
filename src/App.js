import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';

const base = new Airtable({ apiKey: 'keyTLS0P8OB9AiTlW' }).base(
  'appEDJXKhlklhtwkd'
);

function App() {
  const [goals, setGoals] = useState([]);
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    base('goals')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setGoals(records);
        fetchNextPage();
      });
    base('updates')
      .select({ view: 'Grid view' })
      .eachPage((records, fetchNextPage) => {
        setUpdates(records);
        fetchNextPage();
      });
  }, []);

  return (
    <>
      <h1>My Goals</h1>
    </>
  );
}

export default App;
