"use client";

import React, { useState } from 'react';
import { AiOutlineComment, AiOutlineSend } from 'react-icons/ai';
import { MdOutlineSupportAgent, MdClose } from 'react-icons/md';
import Button from '../button';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  const systemMessage = {
    role: 'system',
    content: 'Introducción: Eres un chatbot inteligente diseñado para ayudar a los visitantes de DoubleClics, una empresa que ofrece servicios de automatización...',
  };

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (input.trim() === '' || isSending) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setInput('');

    setIsSending(true);

    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    const apiRequestBody = {
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...messages, { role: 'user', content: input }],
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(apiRequestBody),
      });

      const data = await response.json();

      setMessages([
        ...messages,
        { role: 'user', content: input },
        { role: 'assistant', content: data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const content = (<div className="bg-white shadow-lg rounded-lg w-80 mt-2 relative animate-growing">
  <div className="text-lg font-semibold text-black p-4 bg-blue-300 rounded-t-lg flex justify-between items-center">
    <div className="flex items-center gap-2">
      <MdOutlineSupportAgent size={30} /> DoubleClics Assistant
    </div>
    <button onClick={toggleChat} className="text-blue-900 transition duration-150  hover:text-red-800">
      <MdClose size={20} />
    </button>
  </div>

  <div className="py-4 px-2">
    <div className="flex flex-col h-80 overflow-auto gap-2 ">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`p-2 rounded-md text-sm text-white ${
            message.role === 'user' ? 'bg-primary self-end px-4 ml-4' : 'bg-amber-500 self-start px-4 mr-4'
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
    <div className="flex mt-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        className="border rounded-l p-2 w-full"
        placeholder="Escribe tu mensaje..."
      />
      <button
        onClick={sendMessage}
        className="bg-primary text-white rounded-r p-2"
        disabled={isSending}
      >
        <AiOutlineSend />
      </button>
    </div>
  </div>
</div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-20 flex-col justify-end justify-items-end justify-self-end">
      {/* Ocultar el botón de abrir chat si el chat está abierto */}
      {isOpen && (content)}

        <div className="w-full flex justify-end">
        <Button
          className={`rounded-full  mt-4 ${isOpen ? 'opacity-60' : ''}`}
          onClick={toggleChat}
        >
          <AiOutlineComment size={30} />
        </Button>
        </div>




    </div>
  );
};

export default ChatBot;