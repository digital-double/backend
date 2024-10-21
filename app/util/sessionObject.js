exports.sessionObject = (userObject) => ({
    id: userObject.id,
    userName: userObject.userName,
    email: userObject.email,
    avatar: userObject.avatar,
  });