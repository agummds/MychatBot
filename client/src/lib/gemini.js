import { GoogleGenerativeAI } from "@google/generative-ai";

const safety_settings = [
  {
    category: safety_types.HarmCategory.HARM_CATEGORY_DEROGATORY,
    threshold: safety_types.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
  {
    category: safety_types.HarmCategory.HARM_CATEGORY_VIOLENCE,
    threshold: safety_types.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
  },
];

const genAI = new GoogleGenerativeAI(import.meta.enc.VITE_GEMINI_PUBLIC_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  safety_settings,
});

export default model;
