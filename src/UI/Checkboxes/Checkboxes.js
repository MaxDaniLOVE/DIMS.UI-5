import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import { setAssignedMembers } from '../../store/actions';
import './checkboxes.scss';

class Checkboxes extends PureComponent {
  componentWillUnmount() {
    const { assignUser } = this.props;
    assignUser([]);
  }

  onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const { assignUser, assignedMembers } = this.props;
    const updatedMembers = new Set();
    assignedMembers.map((el) => updatedMembers.add(el));
    if (checked) {
      updatedMembers.add(id);
    } else {
      updatedMembers.delete(id);
    }
    assignUser([...updatedMembers]);
  };

  render() {
    const { members, assignedMembers } = this.props;
    return (
      <div className='members-checkboxes__wrapper'>
        Assign members:
        <div className='members-checkboxes'>
          {members.map(({ name, lastName, id }) => {
            return (
              <FormGroup className='form-inputs' key={id}>
                <Label htmlFor={id}>
                  {`${name} ${lastName}:`}
                  <CustomInput
                    value={id}
                    type='checkbox'
                    id={id}
                    onChange={this.onCheckboxChange}
                    checked={assignedMembers.includes(id)}
                  />
                </Label>
              </FormGroup>
            );
          })}
        </div>
      </div>
    );
  }
}

Checkboxes.propTypes = {
  assignedMembers: PropTypes.arrayOf(PropTypes.string).isRequired,
  assignUser: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ members, assignedMembers }) => ({ members, assignedMembers });

const mapDispatchToProps = (dispatch) => {
  return {
    assignUser: (users) => dispatch(setAssignedMembers(users)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkboxes);
