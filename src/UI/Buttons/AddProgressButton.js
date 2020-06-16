import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const AddProgressButton = ({ userTasks, onAddSubtaskModalOpen }) => {
  const [isOpen, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen(!isOpen);
  }, [isOpen]);

  const dropdownItems = userTasks.map(({ name, taskId }) => {
    const onClick = () => onAddSubtaskModalOpen(taskId);
    return (
      <DropdownItem key={taskId} onClick={onClick}>
        {name}
      </DropdownItem>
    );
  });

  return (
    <ButtonDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret color='success'>
        Track
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>
          {dropdownItems.length ? 'Availiable tasks for you:' : 'You have no availiable tasks'}
        </DropdownItem>
        {dropdownItems}
      </DropdownMenu>
    </ButtonDropdown>
  );
};

AddProgressButton.propTypes = {
  userTasks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
  onAddSubtaskModalOpen: PropTypes.func.isRequired,
};
const mapStateToProps = ({ data: { userTasks } }) => ({ userTasks });

export default connect(mapStateToProps, null)(AddProgressButton);
