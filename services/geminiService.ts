
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const queryCeriumAI = async (prompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the CeriumOS System Assistant. You help users manage their virtual workspace. 
      Context: ${context}
      User Command: ${prompt}`,
      config: {
        systemInstruction: "You are an AI kernel integrated into CeriumOS. Keep responses concise, technical, and helpful. You can simulate terminal outputs, write code, or explain OS features.",
      }
    });
    return response.text;
  } catch (error) {
    console.error("AI Query Error:", error);
    return "Error communicating with Cerium Kernel.";
  }
};
