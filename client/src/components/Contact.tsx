import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would send the form data to a server
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success",
        description: "Your message has been sent successfully",
      });
      
      // Clear form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 relative after:content-[''] after:absolute after:w-20 after:h-1 after:bg-[#2ecc71] after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:rounded pb-4">
          Get In Touch
        </h2>
        
        <form 
          className="max-w-md mx-auto space-y-4"
          onSubmit={handleSubmit}
        >
          <div>
            <input 
              type="text" 
              name="name"
              placeholder="Your Name" 
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#515151] focus:border-transparent"
            />
          </div>
          <div>
            <input 
              type="email" 
              name="email"
              placeholder="Your Email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#515151] focus:border-transparent"
            />
          </div>
          <div>
            <textarea 
              name="message"
              placeholder="Your Message" 
              required 
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#515151] focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full px-4 py-3 bg-[#515151] text-white rounded-lg hover:bg-[#2ecc71] transition-colors duration-300 shadow-md"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
