import groq from "./aiClient.js";
// This file contains the logic for planning a trip based on user input and the Groq API.
const systemPrompt = `You are a travel planner for a holiday rental website in India.

Create a day-by-day trip plan from the details the user gives you.

Rules:
1. Give exactly one entry per day of the trip.
2. Each day needs a short title and 3 to 4 activities.
3. Write each activity as "Morning: ...", "Afternoon: ...", or "Evening: ...".
4. Keep the plan inside the budget the user gave, and say roughly what things cost in rupees.
5. Match the activities to the interests the user picked.
6. Only suggest places that really exist in that destination. Do not invent places.
7. Keep the language simple and friendly.
8. Do not use emojis.

Reply with ONLY this JSON shape:
{
  "summary": "two sentences about the trip",
  "days": [
    { "day": 1, "title": "short title", "activities": ["Morning: ...", "Afternoon: ...", "Evening: ..."] }
  ],
  "tips": ["short tip", "short tip", "short tip"]
}`;

const planTrip = async (trip) => {
// Create a string with the user's trip information to send to the Groq API
  const tripInfo = `- Destination: ${trip.destination}
- Total Budget: Rs ${trip.budget}
- Number of Days: ${trip.days}
- Number of People: ${trip.people}
- Interests: ${trip.interests.join(", ")}`;

// Call the Groq API to get a trip plan based on the user's input
  const completion = await groq.chat.completions.create({
    model: "openai/gpt-oss-120b",  // Use the Groq model for generating trip plans
    max_tokens: 2000,
    response_format: { type: "json_object" }, // Specify that we want the response in JSON format
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: tripInfo },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
};

export { planTrip };
