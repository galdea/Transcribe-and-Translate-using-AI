import React, { useState } from 'react';
import openai from 'openai';

const ChatGPT = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = `User: ${message}\nChatGPT:`;
    const completions = await openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 150,
      n: 1,
      stop: '\n',
    });
    const { choices } = completions.data;
    setResponse(choices[0].text.trim());
    setMessage('');
  };

  return (
    <div>
      <h1>ChatGPT</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Message:
          <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <button type="submit">Send</button>
      </form>
      <p>{response}</p>
    </div>
  );
};

export default ChatGPT;
