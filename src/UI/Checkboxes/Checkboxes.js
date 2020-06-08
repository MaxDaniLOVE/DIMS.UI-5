/* eslint-disable no-shadow */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import { setAssignedMembers } from '../../store/actions';
import { DangerSubtitle } from '../Titles';
import './checkboxes.scss';

class Checkboxes extends PureComponent {
  componentWillUnmount() {
    const { setAssignedMembers } = this.props;
    setAssignedMembers([]);
  }

  onCheckboxChange = (e) => {
    const { id, checked } = e.target;
    const { setAssignedMembers, assignedMembers } = this.props;
    const updatedMembers = new Set();
    assignedMembers.map((el) => updatedMembers.add(el));
    if (checked) {
      updatedMembers.add(id);
    } else {
      updatedMembers.delete(id);
    }
    setAssignedMembers([...updatedMembers]);
  };

  render() {
    const { members, assignedMembers } = this.props;
    if (!members.length) {
      return <DangerSubtitle>To assign tasks to users, add them!</DangerSubtitle>;
    }
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
  setAssignedMembers: PropTypes.func.isRequired,
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
};

const mapStateToProps = ({ data: { members, assignedMembers } }) => ({ members, assignedMembers });

const mapDispatchToProps = (dispatch) => bindActionCreators({ setAssignedMembers }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Checkboxes);
