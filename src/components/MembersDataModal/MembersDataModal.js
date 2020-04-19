import React from 'react';
import PropTypes from 'prop-types';

const MembersDataModal = ({ registerData }) => {
  const {
    address,
    birthDate,
    directionId,
    education,
    email,
    lastName,
    mathScore,
    mobilePhone,
    name,
    sex,
    skype,
    startDate,
    universityAverageScore,
  } = registerData;
  return (
    <table>
      <tbody>
        <tr>
          <th>Address:</th>
          <th>{address}</th>
        </tr>
        <tr>
          <th>BirthDate:</th>
          <th>{new Date(birthDate).toLocaleDateString()}</th>
        </tr>
        <tr>
          <th>Direction:</th>
          <th>{directionId}</th>
        </tr>
        <tr>
          <th>Education:</th>
          <th>{education}</th>
        </tr>
        <tr>
          <th>E-mail:</th>
          <th>{email}</th>
        </tr>
        <tr>
          <th>Last name:</th>
          <th>{lastName}</th>
        </tr>
        <tr>
          <th>Math score:</th>
          <th>{mathScore}</th>
        </tr>
        <tr>
          <th>Mobile phone:</th>
          <th>{mobilePhone}</th>
        </tr>
        <tr>
          <th>Name:</th>
          <th>{name}</th>
        </tr>
        <tr>
          <th>Sex:</th>
          <th>{sex}</th>
        </tr>
        <tr>
          <th>Skype:</th>
          <th>{skype}</th>
        </tr>
        <tr>
          <th>Start date:</th>
          <th>{new Date(startDate).toLocaleDateString()}</th>
        </tr>
        <tr>
          <th>University average score:</th>
          <th>{universityAverageScore}</th>
        </tr>
      </tbody>
    </table>
  );
};

MembersDataModal.propTypes = {
  registerData: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
};

export default MembersDataModal;
