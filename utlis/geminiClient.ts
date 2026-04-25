import {GoogleGenerativeAI} from "@google/generative-ai";
import {GEMINI_API_KEY} from "@env";

const genAI=new GoogleGenerativeAI(GEMINI_API_KEY);

export async function getGeminiResponse(prompt:string){
    try{
        const model=genAI.getGenerativeModel({model:'models/gemini-2.5-flash'});
        const result=await model.generateContent(prompt);
        const response=result.response;
        const text=response.text();
        return text;
    }catch(error){
            console.error('Gemini API error',error);
            return "Sorry,I coudldn't process that.";
    }
}