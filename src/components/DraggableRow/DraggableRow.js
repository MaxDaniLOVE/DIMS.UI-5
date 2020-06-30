/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const DraggableRow = ({ children, draggableId, index }) => {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <tr ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
          {children}
        </tr>
      )}
    </Draggable>
  );
};

DraggableRow.propTypes = {
  children: PropTypes.element.isRequired,
  draggableId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default DraggableRow;
