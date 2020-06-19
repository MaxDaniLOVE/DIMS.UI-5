import React, { useState, useCallback } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const TooltipWrapper = ({ children, id, tooltip }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = useCallback(() => {
    setTooltipOpen(!tooltipOpen);
  }, [tooltipOpen]);

  return (
    <>
      {children}
      <Tooltip placement='right' isOpen={tooltipOpen} target={id} toggle={toggle}>
        {tooltip}
      </Tooltip>
    </>
  );
};

TooltipWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

export default TooltipWrapper;
