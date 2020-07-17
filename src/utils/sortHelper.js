const sortHelper = (data, id, type) => {
  let index = type === 'UP' ? 1 : -1;

  if (id === 'birthDate') {
    index *= -1;
  }

  const sortedData = [...data].sort((a, b) => {
    if (typeof a[id] === 'number') {
      return (a[id] - b[id]) * index;
    }
    return index === 1 ? a[id].localeCompare(b[id]) : b[id].localeCompare(a[id]);
  });

  return sortedData;
};

export default sortHelper;
