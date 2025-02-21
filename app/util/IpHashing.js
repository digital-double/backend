const crypto = require("crypto");

exports.hashIPAddress = (ipAddress) => {
  const hash = crypto.createHash("sha256"); 
  hash.update(ipAddress);
  return hash.digest("hex");
}