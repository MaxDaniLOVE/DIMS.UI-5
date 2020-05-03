const inputsChangeHandler = (value, id, data) => {
  const coppiedObj = { ...data };
  if (id.includes('_')) {
    const radioId = id.slice(0, id.indexOf('_'));
    coppiedObj[radioId] = value;
    return coppiedObj;
  }
  coppiedObj[id] = value;
  return coppiedObj;
};

export default inputsChangeHandler;
