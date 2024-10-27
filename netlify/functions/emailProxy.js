// netlify/functions/emailProxy.js

exports.handler = async (event, context) => {
    const webhookUrl = process.env.WEBHOOK_URL;
    const requestBody = JSON.parse(event.body);
  
    // Send the data to your actual webhook
    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.statusText}`);
      }
  
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Success" }),
      };
    } catch (error) {
      console.error("Error:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ message: "Internal Server Error" }),
      };
    }
  };