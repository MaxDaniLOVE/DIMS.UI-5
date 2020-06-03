import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'reactstrap';
import { millisecondsToDate } from '../../utils/convertDate';
import './DataModal.scss';

const DataModal = ({ data, inputFields, header }) => {
  const dataStrings = inputFields.map(({ label, id }) => ({
    label,
    value: data[id],
  }));
  return (
    <>
      {header}
      <Table className='data-modal-table'>
        <tbody>
          {dataStrings.map(({ label, value }) => {
            const newValue = label.includes('date') ? millisecondsToDate(value) : value;
            return (
              <tr key={label}>
                <th>{label}</th>
                <th>{newValue}</th>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

DataModal.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  inputFields: PropTypes.arrayOf(PropTypes.object).isRequired,
  header: PropTypes.element.isRequired,
};

export default DataModal;
