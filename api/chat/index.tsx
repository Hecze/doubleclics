import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

// Define el tipo para la respuesta de OpenAI
interface OpenAIResponse {
  choices: {
    text: string;
  }[];
}

interface Data {
  response: string;
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== 'POST') {
    res.status(405).json({ response: 'Method Not Allowed' });
    return;
  }

  const { message } = req.body;

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    res.status(500).json({ response: 'API key not provided' });
    return;
  }

  const openaiResponse = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    }),
  });

  // Declara el tipo de la respuesta como OpenAIResponse
  const data = (await openaiResponse.json()) as OpenAIResponse;

  // Asegúrate de manejar el caso en que no haya choices o esté vacío
  const responseText = data.choices?.[0]?.text?.trim() || 'No response';

  res.status(200).json({ response: responseText });
};
