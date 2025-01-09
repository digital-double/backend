exports.updateEnvVariables = (keys) => {
  keys.map((key) => {
    return delete process.env[key];
  });
};