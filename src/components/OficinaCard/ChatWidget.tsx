// src/components/ChatWidget/ChatWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import { FaComments, FaPaperPlane, FaTimes, FaRobot, FaMicrophone, FaStopCircle } from 'react-icons/fa';
import './ChatWidget.css';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ia';
    timestamp: Date;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [isRecording, setIsRecording] = useState(false);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && messages.length === 0) {
            setMessages([{
                id: `ia-${Date.now()}`,
                text: "Olá! Sou o assistente virtual OFIX. Como posso te ajudar hoje?",
                sender: 'ia',
                timestamp: new Date()
            }]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };

    const simulateIAResponse = (userMessage: string) => {
        setTimeout(() => {
            let iaText = "Desculpe, não entendi. Poderia reformular?";
            if (userMessage.toLowerCase().includes("horário")) {
                iaText = "As oficinas geralmente funcionam em horário comercial, mas você pode verificar os detalhes na página de cada uma.";
            } else if (userMessage.toLowerCase().includes("agendar")) {
                iaText = "Para agendar, encontre uma oficina, escolha o serviço e selecione um horário disponível.";
            } else if (userMessage.toLowerCase().includes("melhor oficina")) {
                iaText = "A 'melhor' oficina depende das suas necessidades! Use nossos filtros para encontrar uma que se encaixe no seu perfil e leia as avaliações.";
            } else if (userMessage.toLowerCase().match(/oi|olá|ola|tudo bem/i)) {
                iaText = "Olá! Tudo ótimo. Em que posso ser útil?";
            }

            setMessages(prevMessages => [
                ...prevMessages,
                { id: `ia-${Date.now()}`, text: iaText, sender: 'ia', timestamp: new Date() }
            ]);
        }, 1000);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (inputText.trim() === '') return;

        const newUserMessage: Message = {
            id: `user-${Date.now()}`,
            text: inputText,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prevMessages => [...prevMessages, newUserMessage]);
        simulateIAResponse(inputText);
        setInputText('');
    };

    const handleAudioInput = () => {
        if (isRecording) {
            console.log("Parando gravação de áudio...");
            const simulatedAudioText = "Isso foi uma simulação de mensagem de áudio.";
            const newUserMessage: Message = {
                id: `user-audio-${Date.now()}`,
                text: `🎤 (Áudio): ${simulatedAudioText}`,
                sender: 'user',
                timestamp: new Date()
            };
            setMessages(prevMessages => [...prevMessages, newUserMessage]);
            simulateIAResponse(simulatedAudioText);
        } else {
            console.log("Iniciando gravação de áudio...");
        }
        setIsRecording(!isRecording);
    };


    return (
        <div className={`chat-widget-container-ofix ${isOpen ? 'open' : 'closed'}`}>
            {isOpen ? (
                <div className="chat-window-ofix">
                    <header className="chat-header-ofix">
                        <FaRobot style={{ marginRight: '8px' }} />
                        Assistente OFIX
                        <button onClick={toggleChat} className="close-chat-button-ofix">
                            <FaTimes style={{ marginRight: '4px' }} />
                            Fechar
                        </button>
                    </header>
                    <div className="chat-messages-ofix">
                        {/* === CORREÇÃO AQUI: Adicionando o map para renderizar as mensagens === */}
                        {messages.map(msg => (
                            <div key={msg.id} className={`message-bubble-ofix ${msg.sender}`}>
                                <p>{msg.text}</p>
                                <span className="timestamp-ofix">
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* Elemento para scroll */}
                        {/* === FIM DA CORREÇÃO === */}
                    </div>
                    <form onSubmit={handleSendMessage} className="chat-input-form-ofix">
                        <input
                            type="text"
                            value={inputText}
                            onChange={handleInputChange}
                            placeholder="Digite sua pergunta..."
                        />
                        <button
                            type="button"
                            onClick={handleAudioInput}
                            className={`audio-button-ofix ${isRecording ? 'recording' : ''}`}
                            aria-label={isRecording ? "Parar gravação" : "Iniciar gravação de áudio"}
                        >
                            {isRecording ? <FaStopCircle /> : <FaMicrophone />}
                        </button>
                        <button type="submit" className="send-button-ofix" aria-label="Enviar mensagem">
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            ) : (
                <button onClick={toggleChat} className="fab-ofix" aria-label="Abrir chat com assistente OFIX">
                    <div className="fab-icon-container"><FaComments /></div>
                    <span className="fab-text">Chat</span>
                </button>
            )}
        </div>
    );
};

export default ChatWidget;