const inputsChangeHandler = (value, id, data) => {
  const coppiedObj = { ...data };
  coppiedObj[id] = value;
  return coppiedObj;
};

export default inputsChangeHandler;
