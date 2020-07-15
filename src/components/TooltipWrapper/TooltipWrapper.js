import React from 'react';
import { Tooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { useTooltipToggling } from '../../hooks';

const TooltipWrapper = ({ children, id, tooltip, maxValuelength }) => {
  const [isOpenTooltip, toggleTooltip] = useTooltipToggling();

  const { length: tooltipLength } = tooltip;

  const tooltipComponent = tooltipLength > maxValuelength && (
    <Tooltip placement='right' isOpen={isOpenTooltip} target={id} toggle={toggleTooltip}>
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
