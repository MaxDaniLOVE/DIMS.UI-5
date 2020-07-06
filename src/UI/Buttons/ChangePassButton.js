import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { EditUserIcon } from '../../assets/icons';
import Button from './Button';
import { useTooltipToggling } from '../../hooks';

const ChangePassButton = ({ onClick, children, isPasswordAuth }) => {
  const [isOpenTooltip, toggleTooltip] = useTooltipToggling();

  const icon = !isPasswordAuth && <EditUserIcon />;

  const onClickHandler = !isPasswordAuth ? onClick : null;

  const tooltip = isPasswordAuth && (
    <Tooltip placement='bottom' isOpen={isOpenTooltip} target='change-pass-btn' toggle={toggleTooltip}>
      To change password login with password and email!
    </Tooltip>
  );

  return (
    <>
      <Button onClick={onClickHandler} id='change-pass-btn'>
        {children && (
          <>
            {children}
            {icon}
          </>
        )}
      </Button>
      {tooltip}
    </>
  );
};

ChangePassButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isPasswordAuth: PropTypes.bool.isRequired,
};

export default ChangePassButton;
