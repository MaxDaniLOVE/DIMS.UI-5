const getMailLogin = (mail) => {
  const index = mail.indexOf('@');
  return mail.slice(0, index);
};

export default getMailLogin;
