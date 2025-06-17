// src/components/MathiasChat/ChatWidget.tsx
import React, { useState } from 'react';
import './MathiasChat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'mathias';
}

interface ChatWidgetProps {
  onSendMessage: (messageText: string) => Promise<string>; // Simulates sending a message and getting a response
  isVisible: boolean;
  onClose: () => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ onSendMessage, isVisible, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString() + '-user',
      text: inputText,
      sender: 'user',
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const mathiasResponseText = await onSendMessage(inputText);
      const mathiasMessage: Message = {
        id: Date.now().toString() + '-mathias',
        text: mathiasResponseText,
        sender: 'mathias',
      };
      setMessages((prevMessages) => [...prevMessages, mathiasMessage]);
    } catch (error) {
      console.error("Error getting response from Mathias:", error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        text: "Sorry, I couldn't get a response. Please try again.",
        sender: 'mathias',
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="mathias-chat-widget">
      <div className="chat-header">
        <h3>Mathias AI Assistant</h3>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
      <div className="message-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && <div className="message mathias"><p>Mathias is thinking...</p></div>}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
          placeholder="Ask Mathias..."
          disabled={isLoading}
        />
        <button onClick={handleSendMessage} disabled={isLoading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWidget;
