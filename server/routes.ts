import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route for chatbot message processing
  app.post('/api/chat', async (req, res) => {
    try {
      const { message } = req.body;
      
      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }
      
      // In a more complex implementation, you might store conversation history
      // or implement more sophisticated processing logic
      
      // Here we'll just pass through the message and simulate a response
      // This endpoint can be extended to connect with Groq/Together.ai if needed
      
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
