/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderTable } from '../../store/actions';

const DraggableTable = ({ members, reorderTable, children }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(members);
  }, [members]);

  const onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    const updatedItems = reorderTable(items, source.index, destination.index);

    setItems(updatedItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <tbody id='draggable-table' {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = ({ data: { members } }) => {
  return { members };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ reorderTable }, dispatch);
};

DraggableTable.propTypes = {
  members: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  reorderTable: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableTable);
