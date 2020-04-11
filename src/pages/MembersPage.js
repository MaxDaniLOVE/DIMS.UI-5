import React from 'react';

const MembersPage = ({ members }) => {
  return (
    <ul>
      {members.map(({ name, id }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default MembersPage;
