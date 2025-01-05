exports.sessionObject = (userObject) => ({
    id: userObject.id,
    userName: userObject.userName,
    email: userObject.email,
    companyID: userObject.companyID,
  });