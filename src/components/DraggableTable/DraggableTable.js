/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-shadow */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorderTable } from '../../store/actions';

const DraggableTable = ({ tableData, reorderTable, children, tableType, userId, isFiltered }) => {
  const onDragEnd = useCallback(
    ({ destination, source }) => {
      if (!destination) return;

      reorderTable(tableType, tableData, source.index, destination.index, userId);
    },
    [reorderTable, tableData, tableType, userId],
  );

  const isDragDisabled = children.length <= 1 || isFiltered;

  const tableRows = React.Children.map(children, (child) => React.cloneElement(child, { isDragDisabled }));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable'>
        {({ droppableProps, placeholder, innerRef }) => (
          <tbody id='drag-n-drop-container' {...droppableProps} ref={innerRef}>
            {tableRows}
            {placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const mapStateToProps = ({ sort: { isFiltered } }) => {
  return { isFiltered };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ reorderTable }, dispatch);
};

DraggableTable.defaultProps = {
  userId: '',
};

DraggableTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])))
    .isRequired,
  reorderTable: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  tableType: PropTypes.string.isRequired,
  userId: PropTypes.string,
  isFiltered: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableTable);
