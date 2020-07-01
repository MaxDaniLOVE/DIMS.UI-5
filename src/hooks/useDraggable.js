import { useState, useEffect } from 'react';

const useDraggable = () => {
  const [isDragDisabled, setIsDragDisabled] = useState(false);

  useEffect(() => {
    const { childElementCount } = document.getElementById('drag-n-drop-container');
    setIsDragDisabled(childElementCount <= 1);
  }, []);

  return isDragDisabled;
};

export default useDraggable;
