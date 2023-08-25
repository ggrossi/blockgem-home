import type { NextApiRequest, NextApiResponse } from 'next';

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('Request body:', req.body);

  const { email } = req.body;
  if (!email) {
    res.status(401).json({ error: 'Email is required' });
    return;
  }

  // Beehiiv data structure for adding subscribers
  const beehiivData = {
    email: email,
    reactivate_existing: false,
    send_welcome_email: false,
    // Add any other required fields for Beehiiv here, such as utm_source, utm_campaign, etc.
  };

  try {
    const URL = `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`; // Replace 'publicationId' with your specific publication ID
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${BEEHIIV_API_KEY}`, // Assuming you've set BEEHIIV_API_KEY in your environment variables
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(beehiivData)
    });

    let data;
    try {
      data = await response.json();
    } catch (e) {
      res.status(500).json({
        error: 'Response from Beehiiv API is not correctly formatted JSON'
      });
      return;
    }

    // Update this section based on Beehiiv's error response format
    if (data.errors && data.errors[0]?.error) {
      return res.status(401).json({ error: data.errors[0].error });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: 'Something went wrong, please try again later.' });
  }
}
