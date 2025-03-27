import { apiRequest } from './queryClient';

// Select which LLM provider to use
const LLM_PROVIDER = 'groq'; // or 'together'

// Get API key from environment variables with fallback
const getApiKey = () => {
  if (LLM_PROVIDER === 'groq') {
    return process.env.GROQ_API_KEY || process.env.VITE_GROQ_API_KEY || '';
  } else {
    return process.env.TOGETHER_API_KEY || process.env.VITE_TOGETHER_API_KEY || '';
  }
};

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

// Function to send message to LLM API and get response
export async function sendChatMessage(userMessage: string): Promise<string> {
  try {
    let apiUrl, requestBody;
    
    if (LLM_PROVIDER === 'groq') {
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
      requestBody = {
        model: 'llama2-70b-4096',
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
        max_tokens: 150
      };
    } else {
      // together.ai
      apiUrl = 'https://api.together.xyz/v1/chat/completions';
      requestBody = {
        model: 'togethercomputer/llama-2-70b-chat',
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
        max_tokens: 150
      };
    }

    // Get API key
    const apiKey = getApiKey();
    
    // If no API key is available, use a fallback response pattern
    if (!apiKey) {
      return getFallbackResponse(userMessage);
    }

    // Make request to the LLM API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending chat message:', error);
    return getFallbackResponse(userMessage);
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
