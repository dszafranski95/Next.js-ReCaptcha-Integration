// Import necessary types from Next.js and axios for making HTTP requests.
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface RecaptchaResponseData {
  success: boolean;
  score: number;
  error?: string;
}

interface PostData {
  gRecaptchaToken: string;
}

export async function handler(req: NextApiRequest, res: NextApiResponse<RecaptchaResponseData>) {
  // Ensure the method is POST, enhancing security by rejecting unwanted request methods.
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  // Retrieve the secret key from environment variables for the ReCaptcha verification.
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    // If the secret key is not found, log an error and return an appropriate response.
    console.error("RECAPTCHA_SECRET_KEY is not set in environment variables.");
    return res.status(500).json({ success: false, error: "Server configuration error" });
  }

  let postData: PostData;
  try {
    postData = await req.json();
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return res.status(400).json({ success: false, error: "Bad request" });
  }

  const { gRecaptchaToken } = postData;

  // Define the form data for the POST request to the ReCaptcha API.
  const formData = `secret=${secretKey}&response=${gRecaptchaToken}`;

  try {
    // Make a POST request to the Google ReCaptcha verify API.
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      formData,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Check the ReCaptcha response for success and a score above a certain threshold.
    if (response.data.success && response.data.score > 0.5) {
      console.log("ReCaptcha score:", response.data.score);
      // Return a success response if the verification passes.
      return res.status(200).json({
        success: true,
        score: response.data.score,
      });
    } else {
      // Log the failure and return a response indicating the verification did not pass.
      console.error("ReCaptcha verification failed:", response.data);
      return res.status(403).json({ success: false, error: "ReCaptcha verification failed" });
    }
  } catch (error) {
    // Handle any errors that occur during the API request.
    console.error("Error during ReCaptcha verification:", error);
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
