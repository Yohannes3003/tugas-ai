import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const MyComponent = () => {
  const [prompt, setPrompt] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const selectedModel = 'gemini-pro';

  const handleGenerateMessage = async () => {
    setLoading(true);
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);

    const model = genAI.getGenerativeModel({ model: selectedModel });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = await response.text();
      setMessage(text);
    } catch (error) {
      console.error('Error generating message:', error);
    }

    setLoading(false);
  };

  const handleClear = () => {
    setPrompt('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">AI</h1>
        <textarea className="w-full p-2 mb-4 border border-gray-300 rounded" rows="5" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Enter your message here..."></textarea>
        <div className="flex justify-between">
          <button className={`w-1/2 mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading && 'opacity-50 cursor-not-allowed'}`} onClick={handleGenerateMessage} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Message'}
          </button>
          <button className="w-1/2 ml-2 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      {message && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-2 text-center">Message</h2>
          <p className="text-gray-700">{message}</p>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
