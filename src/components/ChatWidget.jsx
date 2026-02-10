import React, { useState, useEffect, useRef } from 'react';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState('intro'); // 'intro', 'chat'
    const [messages, setMessages] = useState([]);
    const [lead, setLead] = useState({ id: null, name: '' });
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');
    const lastMsgId = useRef(0);
    const messagesEndRef = useRef(null);

    // Initial config: check local storage or logic
    useEffect(() => {
        const storedLeadId = localStorage.getItem('crm_lead_id');
        const storedLeadName = localStorage.getItem('crm_lead_name');
        if (storedLeadId) {
            setLead({ id: storedLeadId, name: storedLeadName || '' });
        }
    }, []);

    // Scroll to bottom of chat
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Polling logic
    useEffect(() => {
        let interval;
        if (view === 'chat' && lead.id) {
            const poll = async () => {
                try {
                    // Use a mock or real endpoint. Assuming relative path proxy or direct URL.
                    // WARNING: This assumes backend is running on same domain or handling CORS
                    const API_URL = 'https://crm.talvyyo.com/api/chat';
                    const res = await fetch(`${API_URL}/poll.php?lead_id=${lead.id}&last_id=${lastMsgId.current}`);
                    const data = await res.json();

                    if (data.success && data.messages.length > 0) {
                        const newMessages = data.messages
                            .filter(msg => msg.id > lastMsgId.current)
                            .map(msg => ({
                                id: msg.id,
                                text: msg.content,
                                sender: msg.sender,
                                name: msg.sender === 'lead' ? 'You' : (msg.sender === 'ai' ? 'AI Assistant' : 'Support Agent')
                            }));

                        if (newMessages.length > 0) {
                            setMessages(prev => [...prev, ...newMessages]);
                            lastMsgId.current = newMessages[newMessages.length - 1].id;
                        }
                    }
                } catch (e) {
                    console.error("Polling error", e);
                }
            };

            // Initial poll
            poll();
            interval = setInterval(poll, 3000);
        }
        return () => clearInterval(interval);
    }, [view, lead.id]);


    const toggleChat = () => {
        setIsOpen(!isOpen);
        if (!isOpen && lead.id) {
            setView('chat');
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const phone = formData.get('phone');

        try {
            const API_URL = 'https://crm.talvyyo.com/api/chat';
            const res = await fetch(`${API_URL}/init.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone })
            });
            const data = await res.json();

            if (data.success) {
                setLead({ id: data.lead_id, name: name });
                localStorage.setItem('crm_lead_id', data.lead_id);
                localStorage.setItem('crm_lead_name', name);
                setView('chat');
                setError('');
            } else {
                setError(data.error || 'Error submitting details');
            }
        } catch (err) {
            console.error(err);
            setError('Network error');
        }
    };

    const sendMessage = async () => {
        if (!inputValue.trim()) return;
        const widthVal = inputValue.trim();
        setInputValue('');

        // Optimistic update
        const tempMsg = {
            id: Date.now(), // temp id
            text: widthVal,
            sender: 'lead',
            name: 'Me'
        };
        setMessages(prev => [...prev, tempMsg]);

        try {
            const API_URL = 'https://crm.talvyyo.com/api/chat';
            await fetch(`${API_URL}/send.php`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lead_id: lead.id,
                    content: widthVal
                })
            });
        } catch (err) {
            console.error('Send failed', err);
        }
    };

    return (
        <>
            {/* Widget Button */}
            <div
                id="crm-chat-btn"
                onClick={toggleChat}
                className="fixed bottom-5 right-5 z-[99999] w-[60px] h-[60px] rounded-[30px] bg-[#4f46e5] shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
            >
                <svg viewBox="0 0 24 24" className="w-[30px] h-[30px] fill-white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" /></svg>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div id="crm-chat-window" className="fixed bottom-[80px] right-0 sm:right-5 w-full sm:w-[380px] h-[600px] max-h-[80vh] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden border border-gray-200 z-[99999]">
                    {/* Header */}
                    <div className="bg-[#4f46e5] text-white p-4 font-bold flex justify-between items-center shadow-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-[#10b981] rounded-full"></div>
                            <span>Support Chat</span>
                        </div>
                        <span className="cursor-pointer" onClick={toggleChat}>✕</span>
                    </div>

                    {/* Body: Intro View */}
                    {view === 'intro' && (
                        <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                            <div className="text-center mb-5">
                                <h3 className="m-0 text-lg font-bold">Hello! 👋</h3>
                                <p className="text-gray-500 text-sm">We are online. Please introduce yourself.</p>
                            </div>
                            <form onSubmit={handleFormSubmit} className="flex flex-col gap-4 pt-12">
                                <input type="text" name="name" placeholder="Your Name" required className="p-3 border border-gray-200 rounded-lg text-sm" />
                                <input type="tel" name="phone" placeholder="Phone Number" required className="p-3 border border-gray-200 rounded-lg text-sm" />
                                <button type="submit" className="bg-[#4f46e5] text-white p-3 border-none rounded-lg font-bold cursor-pointer hover:bg-indigo-700 transition">Start Conversation</button>
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                            </form>
                        </div>
                    )}

                    {/* Body: Chat View */}
                    {view === 'chat' && (
                        <>
                            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 flex flex-col gap-4">
                                {messages.map((msg, index) => {
                                    const isUser = msg.sender === 'lead';
                                    return (
                                        <div key={index} className={`flex gap-2 max-w-[85%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}>
                                            {!isUser && (
                                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-base shrink-0 ${msg.sender === 'ai' ? 'bg-emerald-500 text-white' : 'bg-indigo-500 text-white'}`}>
                                                    {msg.sender === 'ai' ? '🤖' : '👨‍💼'}
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-0.5">
                                                {!isUser && <span className="text-[11px] text-gray-500 font-semibold ml-0.5">{msg.name}</span>}
                                                <div className={`p-2.5 rounded-xl text-sm leading-relaxed shadow-sm ${isUser ? 'bg-[#4f46e5] text-white rounded-tr-sm' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-sm'}`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="p-3 border-t border-gray-200 flex gap-2 bg-white">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 p-3 border border-gray-200 rounded-3xl outline-none text-sm"
                                    placeholder="Type a message..."
                                />
                                <button onClick={sendMessage} className="bg-[#4f46e5] text-white border-none w-10 h-10 rounded-full cursor-pointer flex items-center justify-center hover:bg-indigo-700 transition">➤</button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default ChatWidget;
