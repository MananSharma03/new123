import { apiRequest } from './queryClient';

// Use Groq API for the chatbot
const LLM_PROVIDER = 'groq';

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

// Function to send message to the backend which will handle the Groq API call
export async function sendChatMessage(userMessage: string): Promise<string> {
  try {
    // Try to send the message to our backend API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: userMessage })
    });

    if (!response.ok) {
      throw new Error(`Backend API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending chat message to backend:', error);
    
    // Fallback to direct Groq API call if backend call fails
    try {
      const apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
      const requestBody = {
        model: 'llama3-8b-8192',  // Using Llama 3 model
        messages: [
          {
            role: 'system',
            content: getSystemPrompt()
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        max_tokens: 200
      };
      
      // Try to get the GROQ API key from environment variables
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
      
      if (!apiKey) {
        console.warn('No Groq API key found in environment variables');
        return getFallbackResponse(userMessage);
      }
      
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
      return groqData.choices[0].message.content;
    } catch (groqError) {
      console.error('Error with direct Groq API call:', groqError);
      return getFallbackResponse(userMessage);
    }
  }
}

// Fallback response function when API is not available
function getFallbackResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();
  
  if (lowercaseMessage.includes('skill') || 
      lowercaseMessage.includes('know') || 
      lowercaseMessage.includes('can')) {
    return "Manan specializes in Data Analysis (Python, R, statistical modeling), DevOps (CI/CD, Docker, Kubernetes) and Programming (Python, C++, JavaScript, SQL). He's also experienced with cloud technologies.";
  } 
  else if (lowercaseMessage.includes('project') || 
           lowercaseMessage.includes('work') || 
           lowercaseMessage.includes('portfolio')) {
    return "Manan has worked on several key projects including a Data Visualization Dashboard that provides real-time analytics, and a DevOps Automation Tool that streamlines deployment processes.";
  }
  else if (lowercaseMessage.includes('experience') || 
           lowercaseMessage.includes('background') || 
           lowercaseMessage.includes('history')) {
    return "Manan is a Data Analysis & DevOps professional with extensive experience transforming complex data into actionable insights. His background includes work in statistical analysis, cloud infrastructure optimization, and software development.";
  }
  else if (lowercaseMessage.includes('contact') || 
           lowercaseMessage.includes('reach') || 
           lowercaseMessage.includes('email')) {
    return "You can contact Manan through the contact form on this website, or directly via email. He's also available on LinkedIn and GitHub - the links are provided in the social section of this portfolio.";
  }
  else if (lowercaseMessage.includes('hello') || 
           lowercaseMessage.includes('hi') || 
           lowercaseMessage.includes('hey')) {
    return "Hello! I'm Manan's virtual assistant. I can tell you about his skills, projects, experience, or how to contact him. What would you like to know?";
  }
  else {
    return "I'm not sure I understand that query. I can provide information about Manan's skills, projects, professional experience, or contact details. How can I help you today?";
  }
}
