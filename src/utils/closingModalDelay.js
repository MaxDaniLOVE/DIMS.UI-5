const closingModalDelay = (context, defaultInputs, setForm) => {
  setTimeout(() => {
    setForm(defaultInputs);
    context.setState({
      isEditMode: false,
      isDetailMode: false,
      isFormValid: false,
    });
  }, 300);
  context.setState({
    showModal: false,
  });
};

export default closingModalDelay;
