const noteConverter = (note, length) => {
  if (note.length > length) {
    const substring = note.slice(0, length);
    const lastSpaceIndex = substring.lastIndexOf(' ');
    if (lastSpaceIndex < 0) {
      return `${substring}...`;
    }
    return `${note.slice(0, lastSpaceIndex)}...`;
  }
  return note;
};

export default noteConverter;
