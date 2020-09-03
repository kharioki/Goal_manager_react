import React, { useEffect, useState } from 'react';
import Airtable from 'airtable';
import styled from 'styled-components';

import { GlobalStyle } from './styles/Global.style';

import Goal from './components/Goal';

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
      <GlobalStyle />
      <h1>My Goals</h1>
      {goals.map(goal => (
        <Goal
          key={goal.id}
          goal={goal}
          updates={updates.filter(
            update => update.fields.goalid[0] === goal.id
          )}
        />
      ))}
    </>
  );
}

export default App;
