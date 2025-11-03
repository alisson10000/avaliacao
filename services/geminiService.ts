
import { GoogleGenAI, Type } from "@google/genai";
import type { FeedbackAnalysis } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Um resumo conciso do feedback em uma frase em português."
    },
    sentiment: {
      type: Type.STRING,
      description: "O sentimento do feedback, classificado como 'Positivo', 'Neutro', ou 'Negativo'."
    },
  },
  required: ["summary", "sentiment"],
};

export const analyzeFeedback = async (comment: string): Promise<FeedbackAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analise o seguinte feedback de um aluno e forneça um resumo e uma classificação de sentimento. O feedback é: "${comment}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    if (
        typeof parsedResponse.summary === 'string' &&
        ['Positivo', 'Neutro', 'Negativo'].includes(parsedResponse.sentiment)
    ) {
        return parsedResponse as FeedbackAnalysis;
    } else {
        throw new Error("Resposta da API inválida.");
    }

  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw new Error("Não foi possível analisar o feedback.");
  }
};
