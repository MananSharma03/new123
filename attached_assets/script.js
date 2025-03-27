document.addEventListener('DOMContentLoaded', () => {
    // Chatbot Functionality
    class ResumeChatbot {
        constructor() {
            // Initialize the chatbot events when the class is instantiated
            this.initializeChatbotEvents();
        }

        initializeChatbotEvents() {
            // Select all necessary DOM elements
            const chatbotIcon = document.getElementById('chatbot-icon');
            const chatbotWindow = document.querySelector('.chatbot-window');
            const chatbotClose = document.querySelector('.chatbot-close');
            const sendBtn = document.getElementById('send-btn');
            const userInput = document.getElementById('user-input');

            // Debugging: Log elements to console
            console.log('Chatbot Icon:', chatbotIcon);
            console.log('Chatbot Window:', chatbotWindow);
            console.log('Chatbot Close:', chatbotClose);
            console.log('Send Button:', sendBtn);
            console.log('User Input:', userInput);

            // Event listener for chatbot icon (open chatbot)
            if (chatbotIcon) {
                chatbotIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('Chatbot icon clicked');
                    if (chatbotWindow) {
                        chatbotWindow.classList.toggle('active');
                    }
                });
            }

            // Event listener for close button (close chatbot)
            if (chatbotClose) {
                chatbotClose.addEventListener('click', (e) => {
                    e.stopPropagation();
                    console.log('Chatbot close clicked');
                    if (chatbotWindow) {
                        chatbotWindow.classList.remove('active');
                    }
                });
            }

            // Close chatbot when clicking outside
            document.addEventListener('click', (e) => {
                if (!chatbotWindow.contains(e.target) && !chatbotIcon.contains(e.target)) {
                    chatbotWindow.classList.remove('active');
                }
            });
        }

        // Handle user message submission
        async handleUserMessage() {
            const userInput = document.getElementById('user-input');
            const message = userInput.value.trim();

            // Ignore empty messages
            if (!message) return;

            // Display user message
            this.addMessage('user', message);

            // Generate and display bot response
            const response = await this.generateResponse(message);
            this.addMessage('bot', response);

            // Clear input field
            userInput.value = '';
        }

        // Generate response based on user input
        async generateResponse(userMessage) {
            const lowercaseMessage = userMessage.toLowerCase();

            // Predefined response map
            const responseMap = {
                'skills': 'I have expertise in data analysis, DevOps, and programming. My key skills include Python, C++, JavaScript, SQL, statistical modeling, and cloud infrastructure.',
                'projects': 'I\'ve developed two key projects: a Data Visualization Dashboard for real-time data analysis and a DevOps Automation Tool for streamlined deployment processes.',
                'experience': 'As a Data Analysis & DevOps Professional, I specialize in transforming complex data into actionable insights and optimizing technological processes.',
                'contact': 'You can reach me via email or connect with me on LinkedIn. Check out the contact section of my portfolio.',
                'default': 'I can help you learn about my professional background. Feel free to ask about my skills, projects, or experience.'
            };

            // Keywords for matching user intent
            const keywords = {
                'skills': ['skill', 'technical', 'programming', 'technology'],
                'projects': ['project', 'work', 'develop', 'create'],
                'experience': ['work', 'experience', 'background', 'career'],
                'contact': ['contact', 'reach', 'connect']
            };

            // Match user message with predefined keywords
            for (const [key, keywordList] of Object.entries(keywords)) {
                if (keywordList.some(keyword => lowercaseMessage.includes(keyword))) {
                    return responseMap[key];
                }
            }

            // Return default response if no match found
            return responseMap['default'];
        }

        // Add message to chat window
        addMessage(sender, message) {
            const messagesContainer = document.getElementById('chatbot-messages');

            // Error handling for messages container
            if (!messagesContainer) {
                console.error('Messages container not found');
                return;
            }

            // Create message element
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', `${sender}-message`);
            messageElement.textContent = message;
            messagesContainer.appendChild(messageElement);

            // Auto-scroll to bottom of messages
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Initialize the chatbot when DOM is fully loaded
    new ResumeChatbot();
});