import OpenAI from "openai";
import "dotenv/config";

export async function getRecommendationsFromApi(title: string, year: string) {
  const apikey = process.env.NEXT_PUBLIC_CGPT_APIKEY;

  const openai =
    document.location.hostname === "localhost"
      ? new OpenAI({
          apiKey: apikey,
          dangerouslyAllowBrowser: true,
        })
      : new OpenAI({
          apiKey: apikey,
        });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Give me movie recommendations in a serializable json format (just title and year) that are similar to the movie ${title} from the year ${year}`,
      },
    ],
  });

  return completion.choices[0].message.content;
}
