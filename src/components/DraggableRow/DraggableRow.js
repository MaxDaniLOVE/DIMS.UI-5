/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useDraggable } from '../../hooks';

const DraggableRow = ({ children, draggableId, index, isDarkMode }) => {
  const isDragDisabled = useDraggable();

  const backgroundColor = isDarkMode ? '#2a2e36' : '#d4d3d3';

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    backgroundColor: isDragging && backgroundColor,
    border: isDragging && 'none',
    transition: 'all 0.3s ease',
    ...draggableStyle,
  });

  return (
    <Draggable isDragDisabled={isDragDisabled} draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <tr
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        >
          {children}
        </tr>
      )}
    </Draggable>
  );
};

const mapStateToProps = ({ data: { isDarkMode } }) => {
  return { isDarkMode };
};

DraggableRow.propTypes = {
  children: PropTypes.element.isRequired,
  draggableId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(DraggableRow);