import React from 'react';
import Preloader from '../components/Preloader';
const MembersPage = ({ members }) => {
  return (
    <>
      <ul>
        {members.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      <Preloader />
    </>
  );
};

export default MembersPage;
