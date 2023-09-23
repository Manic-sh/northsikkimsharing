// pages/api/apiPostDataToBuilder.js
export default async function handler(req, res) {

  console.log("🚀 ~ file: apiPostDataToBuilder.js:4 ~ handler ~ req:", req);

  if (req.method === "POST") {
    try {
      // Parse the form data from the request body
      const formData = await parseFormData(req);

      // You can access form fields in the `formData` object
      const name = formData.fullName || "";
      const modelId = formData.modelId || "";
      const published = "draft";
      const urlPath = "";
      const modelName = formData.modelName || "";
      // Extract form field values
      const fullName = formData.fullName || '';
      const email = formData.email || '';
      const phoneNumber = formData.phoneNumber || '';
      const specialRequests = formData.specialRequests || '';

      // Now, you can use these values as needed
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: "Bearer bpk-80313a1e409e45d5ae30456556573640",
          // Add other headers here if needed
        },
        body: JSON.stringify({
          ownerId,
          version,
          name,
          modelId,
          published,
          query: [
            {
              "@type": "@builder.io/core:Query",
              property: "urlPath",
              operator: "is",
              value: urlPath,
            },
          ],
          data: {
            "userName": fullName,
            "email": email,
            "phoneNumber": phoneNumber,
            "specialRequests": specialRequests
          },
        }),
      };
      const url = `https://builder.io/api/v1/write/${modelName}`;

      const response = await fetch(
        url,
        requestOptions
      );

      if (response.ok) {
        const result = await response.text();
        res.status(200).json({ result });
      } else {
        const errorText = await response.text();
        res.status(response.status).json({ error: errorText });
      }
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

async function parseFormData(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        // Parse the form data from the request body
        const formData = require("querystring").parse(data);
        resolve(formData);
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", (error) => {
      reject(error);
    });
  });
}
