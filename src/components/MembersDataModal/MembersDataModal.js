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
    <div>
      <p>
        Address:
        {address}
      </p>
      <p>
        BirthDate:
        {new Date(birthDate).toLocaleDateString()}
      </p>
      <p>
        DirectionId:
        {directionId}
      </p>
      <p>
        Education:
        {education}
      </p>
      <p>
        E-mail:
        {email}
      </p>
      <p>
        Last name:
        {lastName}
      </p>
      <p>
        Math score:
        {mathScore}
      </p>
      <p>
        mobilePhone:
        {mobilePhone}
      </p>
      <p>
        Name:
        {name}
      </p>
      <p>
        Sex:
        {sex}
      </p>
      <p>
        Skype:
        {skype}
      </p>
      <p>
        Start date:
        {new Date(startDate).toLocaleDateString()}
      </p>
      <p>
        University average score:
        {universityAverageScore}
      </p>
    </div>
  );
};

MembersDataModal.propTypes = {
  registerData: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MembersDataModal;
