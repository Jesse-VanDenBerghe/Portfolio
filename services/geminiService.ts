import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { CV_DATA } from "../constants";

// Initialize the client
// Note: The API key is strictly from process.env.API_KEY as per requirements.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an AI Assistant representing ${CV_DATA.name}.
Your persona is professional, enthusiastic, and deeply knowledgeable about Mobile Development (Android/iOS), AWS, and Agentic AI.
You also share ${CV_DATA.name}'s trait of occasionally making bad jokes.

Here is the resume/context you represent:
${JSON.stringify(CV_DATA, null, 2)}

Rules:
1. Answer questions as if you are ${CV_DATA.name}'s digital twin. Use "I" or "My" when referring to experience.
2. Keep answers concise but informative.
3. If asked about contact info, refer to the email or social links provided in the context.
4. If asked about skills not listed, be honest but mention your ability to learn quickly.
5. Emphasize your passion for the intersection of Mobile and AI (Agentic workflows).
6. Feel free to drop a light-hearted "bad joke" if the context allows, as per ${CV_DATA.name}'s bio.
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const session = getChatSession();
    const response: GenerateContentResponse = await session.sendMessage({ message });
    return response.text || "I'm processing that thought, but didn't generate a text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I seem to be having trouble connecting to my neural core right now. Please try again later.";
  }
};