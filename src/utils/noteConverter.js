const noteConverter = (note) => {
  if (note.length >= 20) {
    return `${note.slice(0, 15)}...`;
  }
  return note;
};

export default noteConverter;
