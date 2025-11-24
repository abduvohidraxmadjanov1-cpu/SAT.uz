
import { GoogleGenAI, Type } from "@google/genai";
import { AgentRole, PracticeQuestion, SearchResult, GraphNode } from "../types";

const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;

try {
    if (apiKey) {
        ai = new GoogleGenAI({ apiKey });
    }
} catch (error) {
    console.error("Error initializing GoogleGenAI", error);
}

const AGENT_PROMPTS: Record<AgentRole, string> = {
    general: "You are the central AI Orchestrator for SAT.uz. You coordinate all learning activities.",
    math: "You are a world-class Mathematics Professor specializing in SAT Math (Algebra, Geometry, Trigonometry, Advanced Math). Provide step-by-step solutions.",
    reading: "You are an expert in Literature and Social Sciences. Help students analyze complex texts, understand context, and answer evidence-based reading questions.",
    writing: "You are a Grammar and Style expert. Correct errors, explain grammatical rules, and improve sentence structure.",
    strategy: "You are a Strategic Coach. Focus on time management, guessing strategies, and mental preparation for the exam."
};

export const generateSATResponse = async (prompt: string, role: AgentRole = 'general'): Promise<string> => {
    if (!ai) return "AI tizimi kalitsiz ishga tushirildi. Iltimos, API kalitini tekshiring.";
    
    try {
        const model = 'gemini-2.5-flash';
        const systemInstruction = `You are an advanced AI agent for SAT.uz, the world's most advanced learning platform.
        Role: ${AGENT_PROMPTS[role]}
        Language: Respond primarily in Uzbek, but use English for specific SAT terminology where appropriate.
        Tone: Professional, Encouraging, Concise, and Extremely Intelligent.
        Context: The user is a student aiming for a 1600 SAT score.
        
        If the user asks for a solution, break it down into logical steps.`;

        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            }
        });

        return response.text || "Javob generatsiya qilinmadi.";
    } catch (error) {
        console.error("Gemini API Error:", error);
        return "Kechirasiz, hozirda AI serverlarida xatolik yuz berdi.";
    }
};

export const generatePracticeQuestion = async (topic: string): Promise<PracticeQuestion | null> => {
    if (!ai) return null;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Generate a challenging SAT practice question about ${topic}. The output must be in Uzbek.`,
            config: {
                systemInstruction: "You are an expert SAT Exam creator. Generate high-quality questions. The explanation must be very detailed, step-by-step (0% to 100%).",
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        id: { type: Type.STRING },
                        topic: { type: Type.STRING },
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctAnswer: { type: Type.STRING },
                        explanation: { type: Type.STRING },
                        difficulty: { type: Type.STRING, enum: ['Easy', 'Medium', 'Hard'] }
                    },
                    required: ["id", "topic", "question", "options", "correctAnswer", "explanation", "difficulty"]
                }
            }
        });
        
        if (response.text) {
            return JSON.parse(response.text) as PracticeQuestion;
        }
        return null;
    } catch (error) {
        console.error("Error generating practice question:", error);
        return null;
    }
}

export const performSemanticSearch = async (query: string): Promise<{ results: SearchResult[], graph: GraphNode[] } | null> => {
    if (!ai) return null;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Perform a deep semantic search for the SAT topic: "${query}".
            Return a JSON object with two arrays:
            1. 'results': 4-5 high-quality learning resources (Video, Podcast, Article, Practice, Concept) tailored to this topic.
            2. 'graph': 5-7 related concepts as nodes for a knowledge graph visualization. 
               - The 'Core' node should be the search query itself or the main concept, positioned near 50,50.
               - 'Sub' nodes are direct children concepts.
               - 'Related' nodes are lateral connections.
               - Position 'x' and 'y' roughly on a 0-100 percentage grid.
            Output in Uzbek language (except for technical terms like 'Linear Algebra').`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        results: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['Video', 'Podcast', 'Article', 'Practice', 'Concept'] },
                                    relevance: { type: Type.STRING },
                                    summary: { type: Type.STRING }
                                }
                            }
                        },
                        graph: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    id: { type: Type.NUMBER },
                                    label: { type: Type.STRING },
                                    type: { type: Type.STRING, enum: ['Core', 'Sub', 'Related'] },
                                    x: { type: Type.NUMBER },
                                    y: { type: Type.NUMBER }
                                }
                            }
                        }
                    }
                }
            }
        });
        
        if (response.text) {
            // Clean potential markdown code blocks if strictly parsing text
            const cleanedText = response.text.replace(/```json/g, '').replace(/```/g, '').trim();
            return JSON.parse(cleanedText);
        }
        return null;
    } catch (e) {
        console.error("Search Error", e);
        return null;
    }
}
