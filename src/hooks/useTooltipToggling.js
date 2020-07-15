import { useCallback, useState } from 'react';

const useTooltipToggling = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const toggle = useCallback(() => {
    setTooltipOpen(!tooltipOpen);
  }, [tooltipOpen]);

  return [tooltipOpen, toggle];
};

export default useTooltipToggling;
