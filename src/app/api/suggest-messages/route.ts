// import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await openai.completions.create({
//       model: 'gpt-3.5-turbo-instruct',
//       max_tokens: 400,
//       stream: true,
//       prompt,
//     });

//     const stream = OpenAIStream(response);
    
    
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     if (error instanceof OpenAI.APIError) {
//       // OpenAI API error handling
//       const { name, status, headers, message } = error;
//       return NextResponse.json({ name, status, headers, message }, { status });
//     } else {
//       // General error handling
//       console.error('An unexpected error occurred:', error);
//       throw error;
//     }
//   }
// }
// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const prompt =
//       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

//     const response = await fetch('https://chatgpt-api8.p.rapidapi.com/', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//         'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Your RapidAPI key
//         'X-RapidAPI-Host': 'openai80.p.rapidapi.com',
//       },
//       body: JSON.stringify({
//         model: 'gpt-3.5-turbo-instruct',
//         prompt: prompt,
//         max_tokens: 400,
//         stream: false, // Adjust based on whether streaming is supported by RapidAPI
//       }),
//     });

//     if (!response.ok) {
//       const errorDetails = await response.json();
//       return NextResponse.json(
//         { status: response.status, headers: response.headers, message: errorDetails },
//         { status: response.status }
//       );
//     }

//     const data = await response.json();
//     return NextResponse.json(data);
//   } catch (error) {
//     console.error('An unexpected error occurred:', error);
//     return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
//   }
// }


// ///////////////////

// // import { NextResponse } from 'next/server';
// // import { OpenAIStream, StreamingTextResponse } from 'ai';

// // export const runtime = 'edge';

// // export async function POST(req: Request) {
// //   try {
// //     const prompt =
// //       "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

// //     const response = await fetch('https://chatgpt-api8.p.rapidapi.com/', {
// //       method: 'POST',
// //       headers: {
// //         'Content-Type': 'application/json',
// //         'x-rapidapi-key': process.env.RAPIDAPI_KEY || '2369218286msh87d63798c6217b4p1c8a24jsn091cc8ebbd43',
// //         'x-rapidapi-host': 'chatgpt-api8.p.rapidapi.com',
// //       },
// //       body: JSON.stringify({
// //         prompt,
// //         max_tokens: 400,
// //         model: 'gpt-3.5-turbo', // Specify the correct model name if required
// //       }),
// //     });

// //     if (!response.ok) {
// //       throw new Error(`Failed to generate response: ${response.statusText}`);
// //     }

// //     const body = await response.json();

// //     // Assuming you want to stream the response back
// //     const stream = OpenAIStream(body);

// //     return new StreamingTextResponse(stream);
// //   } catch (error) {
// //     console.error('An unexpected error occurred:', error);
// //     return NextResponse.json({ message: error.message }, { status: 500 });
// //   }
// // }



/////////////////

import { GoogleGenerativeAI } from "@google/generative-ai";

export const runtime = 'edge';

// Initialize the model with your API key
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Generate text using the Gemini model
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return new Response(text, { status: 200 });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return new Response('An error occurred', { status: 500 });
  }
}
