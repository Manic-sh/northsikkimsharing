// fileUpload.js
const fetch = require('node-fetch');
const fs = require('fs/promises'); // Use promises version of fs

async function uploadFile(filePath, filename) {
  try {
    // Read the binary data from the file
    const fileData = await fs.readFile(filePath);

    // Send a POST request to Builder Upload API
    const response = await fetch('https://builder.io/api/v1/upload?name='+filename , {
      method: 'POST',
      body: fileData, // binary data of the file
      headers: {
        // Replace 'builder-private-key' with your actual private key
        'Authorization': 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
        // Set the appropriate content type based on the file type
        'Content-Type': 'application/pdf', // Change this to the appropriate content type
      },
    });

    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    } else {
      throw new Error('File upload failed.');
    }
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadFile };
