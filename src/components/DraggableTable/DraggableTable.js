/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderTable } from '../../store/actions';

const DraggableTable = ({ tableData, reorderTable, children, tableType }) => {
  const onDragEnd = ({ destination, source }) => {
    if (!destination) return;

    reorderTable(tableType, tableData, source.index, destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {(provided) => (
          <tbody {...provided.droppableProps} ref={provided.innerRef}>
            {children}
            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ reorderTable }, dispatch);
};

DraggableTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
  reorderTable: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  tableType: PropTypes.string.isRequired,
};

export default connect(null, mapDispatchToProps)(DraggableTable);
