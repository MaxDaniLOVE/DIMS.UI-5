import React from 'react';
import { Label } from 'reactstrap';
import { AvGroup, AvField } from 'availity-reactstrap-validation';
import PropTypes from 'prop-types';

const InputGroup = ({ id, value, type, children, onChange, validate, className }) => {
  return (
    <AvGroup className={className} key={id}>
      <Label htmlFor={id}>
        {children}
        <AvField name={id} value={value} type={type} id={id} onChange={onChange} validate={validate} />
      </Label>
    </AvGroup>
  );
};

InputGroup.defaultProps = {
  className: 'form-inputs',
};

InputGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  validate: PropTypes.objectOf(
    PropTypes.shape({
      pattern: PropTypes.objectOf(PropTypes.string),
      required: PropTypes.objectOf(PropTypes.string, PropTypes.bool),
    }),
  ).isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default InputGroup;
