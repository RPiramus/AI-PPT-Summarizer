import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'


export default function ChatQnA({summary}) {
    const [messages, setMessage] = useState([]);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        if (!summary) return

        const initialAIMessage = summary
        .split ('\n')
        .filter(line => line.trim())
        .map((line) => ({
            sender: 'AI',
            text: line,
        }));
        setMessage(initialAIMessage);
    },[summary])

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question.trim()) return;
      
        setLoading(true);
        setMessage(prev => [...prev, { sender: 'User', text: question }]);
        setQuestion('');
      
        try {
          const response = await axios.post('http://localhost:8000/chat', {
            summary,    
            question,
          });
          const aiResponse = response.data.answer;
          setMessage(prev => [...prev, { sender: 'AI', text: aiResponse }]);
        } catch (error) {
          console.error('Error fetching AI response:', error.response || error);
          setMessage(prev => [
            ...prev,
            { sender: 'AI', text: 'Sorry, I could not process your request.' },
          ]);
        } finally {
          setLoading(false);
        }
      };
      
    return (
    <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto space-y-2 ">
            {messages.map((m,i) => (
                <div
                key={i}
                className={`
                    max-w-[90%] p-3 rounded-lg
                    ${m.sender==='User'
                    ? 'self-end  text-right'
                    : 'self-start  text-left'}
                     text-zinc-700 dark:text-zinc-100`}
                >
                {m.text}
                </div>
            ))}
            {loading && (
                <div
                className="
                    max-w-[90%] p-3 rounded-lg
                    self-start text-left
                    text-zinc-700 dark:text-zinc-100
                    animate-pulse
                    "
                >
                AI is responding…
                </div>
                )}
            <div ref={bottomRef} />
        </div>

        <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 p-2"
        >
        <input
            type="text"
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Ask a question…"
            className="flex-1 p-2  rounded-full focus:outline-none text-zinc-700 dark:text-zinc-100 text-left"
            disabled={loading}
        />
        <button
            type="submit"
            disabled={loading}
            className="px-4 py-2  text-zinc-700 dark:text-zinc-100 rounded-full
                    disabled:opacity-50"
        >
            {loading ? '…' : 'Send'}
        </button>
        </form>
    </div>
    )
  }
  