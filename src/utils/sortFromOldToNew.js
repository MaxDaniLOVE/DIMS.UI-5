const sortFromOldToNew = (progress) => {
  const sorted = [...progress];
  sorted.sort((a, b) => (a.trackDate > b.trackDate ? 1 : -1));
  return sorted;
};

export default sortFromOldToNew;
