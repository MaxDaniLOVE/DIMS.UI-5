const useLayoutEffect = (isDarkMode) => {
  if (isDarkMode) {
    document.body.style.backgroundColor = '#414754';
  } else {
    document.body.style.backgroundColor = '#e3e8f0';
  }
};

export default useLayoutEffect;
