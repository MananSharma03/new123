import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fetch from 'node-fetch';

// Define the response type from Groq API
interface GroqApiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

// System prompt to instruct the LLM about its purpose
const getSystemPrompt = () => {
  return `You are a virtual assistant for Manan Sharma, a Data Analysis & DevOps professional.
Your purpose is to provide concise and accurate information about Manan's professional background.

Key information about Manan:
- Professional skills: Data Analysis (Python, R, statistical modeling), DevOps (CI/CD, Docker, Kubernetes), Programming (Python, C++, JavaScript, SQL)
- Projects: Data Visualization Dashboard (real-time analytics), DevOps Automation Tool (streamlined deployment)
- Experience: Expertise in transforming complex data into actionable insights, cloud infrastructure optimization, and software development
- Background: Strong knowledge in statistical analysis and technological processes

When asked about Manan's skills, projects, experience, or contact information, provide relevant details from the above information.
Keep responses concise (under 150 words), professional, and helpful.
If asked something outside of your knowledge scope, politely explain you can only provide information about Manan's professional background.`;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for chatbot message processing
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      // Get GROQ API key from environment
      const apiKey = process.env.GROQ_API_KEY;
      
      if (apiKey) {
        try {
          // Make request to Groq API
          const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
          const requestBody = {
            model: 'llama3-8b-8192',  // Using Llama 3 model for better responses
            messages: [
              {
                role: 'system',
                content: getSystemPrompt()
              },
              {
                role: 'user',
                content: message
              }
            ],
            temperature: 0.7,
            max_tokens: 200
          };
          
          const groqResponse = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
          });
          
          if (!groqResponse.ok) {
            throw new Error(`Groq API request failed with status ${groqResponse.status}`);
          }
          
          const groqData = await groqResponse.json() as GroqApiResponse;
          
          const response = groqData.choices[0].message.content;
          
          return res.json({ response });
        } catch (error) {
          console.error('Error with Groq API call:', error);
          // Fall back to predefined responses
        }
      }
      
      // Fallback response logic if Groq API fails or key is not available
      const lowercaseMessage = message.toLowerCase();
      let response;
      
      if (lowercaseMessage.includes('skill') || 
          lowercaseMessage.includes('know') || 
          lowercaseMessage.includes('can')) {
        response = "I specialize in Data Analysis (Python, R, statistical modeling), DevOps (CI/CD, Docker, Kubernetes) and Programming (Python, C++, JavaScript, SQL). I'm also experienced with cloud technologies.";
      } 
      else if (lowercaseMessage.includes('project') || 
              lowercaseMessage.includes('work') || 
              lowercaseMessage.includes('portfolio')) {
        response = "I've worked on several key projects including a Data Visualization Dashboard that provides real-time analytics, and a DevOps Automation Tool that streamlines deployment processes.";
      }
      else if (lowercaseMessage.includes('experience') || 
              lowercaseMessage.includes('background') || 
              lowercaseMessage.includes('history')) {
        response = "I'm a Data Analysis & DevOps professional with extensive experience transforming complex data into actionable insights. My background includes work in statistical analysis, cloud infrastructure optimization, and software development.";
      }
      else if (lowercaseMessage.includes('contact') || 
              lowercaseMessage.includes('reach') || 
              lowercaseMessage.includes('email')) {
        response = "You can contact me through the contact form on this website, or directly via email. I'm also available on LinkedIn and GitHub - the links are provided in the social section of my portfolio.";
      }
      else if (lowercaseMessage.includes('hello') || 
              lowercaseMessage.includes('hi') || 
              lowercaseMessage.includes('hey')) {
        response = "Hello! I'm Manan's virtual assistant. I can tell you about my skills, projects, experience, or how to contact me. What would you like to know?";
      }
      else {
        response = "I'm not sure I understand that query. I can provide information about my skills, projects, professional experience, or contact details. How can I help you today?";
      }
      
      res.json({ response });
    } catch (error) {
      console.error('Error processing chat message:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
