import React, { useState, useCallback } from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const TooltipWrapper = ({ children, id, tooltip, maxValuelength }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = useCallback(() => {
    setTooltipOpen(!tooltipOpen);
  }, [tooltipOpen]);

  const { length: tooltipLength } = tooltip;

  const tooltipComponent = tooltipLength > maxValuelength && (
    <Tooltip placement='right' isOpen={tooltipOpen} target={id} toggle={toggle}>
      {tooltip}
    </Tooltip>
  );

  return (
    <>
      {children}
      {tooltipComponent}
    </>
  );
};

TooltipWrapper.propTypes = {
  children: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  maxValuelength: PropTypes.number.isRequired,
};

export default TooltipWrapper;
