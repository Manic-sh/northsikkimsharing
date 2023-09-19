var crypto = require('crypto');

exports.encrypt = function (plainText, workingKeyHex) {
  try {
    // Convert the 'workingKey' from hex to binary
    var key = Buffer.from(workingKeyHex, 'hex');

    // Verify that the key buffer is 16 bytes (128 bits) long
    if (key.length !== 16) {
      throw new Error('Hex-encoded working key must be 16 bytes (128 bits) long');
    }

    // IV should also be 16 bytes (you can generate a random IV)
    var iv = Buffer.from('\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f', 'binary');

    var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);

    var encoded = cipher.update(plainText, 'utf8', 'hex');
    encoded += cipher.final('hex');

    return encoded;
  } catch (error) {
    console.error('Encryption error:', error.message);
    throw error; // Rethrow the error to handle it at a higher level
  }
};


exports.decrypt = function (encText, workingKey) {
    	var m = crypto.createHash('md5');
    	m.update(workingKey)
    	var key = m.digest('binary');
	var iv = '\x00\x01\x02\x03\x04\x05\x06\x07\x08\x09\x0a\x0b\x0c\x0d\x0e\x0f';	
	var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    	var decoded = decipher.update(encText,'hex','utf8');
	decoded += decipher.final('utf8');
    	return decoded;
};

