import React, { useState, useEffect } from 'react';
import { GoPaperAirplane, GoDependabot, } from "react-icons/go";
import { RiCriminalLine } from "react-icons/ri";
import axios from 'axios'; 
import Loading from "./Loading";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Conversation {
  id: number;
  message: Message[];
}

interface ChatAppProps {
  selectedConversation?: Conversation;
  onChathistory: (conversation: Conversation[]) => void;
  onSetisloading : (isLoading: boolean) => void;
  isLoading : boolean;
}


const ChatApp : React.FC<ChatAppProps> = ({selectedConversation, onChathistory, onSetisloading, isLoading}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (selectedConversation) {
      setMessages(selectedConversation.message);
    } else {
      setMessages([]);
    }
  }, [selectedConversation]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages((messages) => [...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      onSetisloading(true);
      try {
        
        const response = await axios.post("http://127.0.0.1:8000/api/testapi/", {message : inputValue});
        const botMessage = response.data.message;

        const response_update = await axios.post("http://127.0.0.1:8000/api/updatedb/", 
        {user_info: {"username" : "John", "usermessage": inputValue, "aimessage" : botMessage, "id" : selectedConversation?.id}});
        // ここに会話履歴を更新するやつを書く
        const res_chathistory = await axios.get("http://127.0.0.1:8000/api/getdb/");
        const chathistory = res_chathistory.data.content;
        onChathistory(chathistory);

        setMessages((messages) => [...messages, {text:botMessage, sender:"bot"}]);

        console.log(messages)
      } catch (error) {
        console.error("API error:" , error);
      } finally {
        onSetisloading(false);
      }
    }
  };

  return (
    //<div className="bg-black">
      <div className="h-screen bg-white text-white flex flex-col">
        <div className="w-full bg-gray-600 shadow-md flex flex-col overflow-hidden flex-grow">
          <div className="message-list overflow-y-auto flex-1 flex-grow w-full">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message flex py-4 px-4 ${
                  message.sender === 'user' ? 'bg-gray-500 self-end' : 'bg-gray-600 self-start'
                }`}
              >
                <div className='mx-2 h-10 w-10'>{message.sender === 'user' ? <RiCriminalLine size={24}/> : <GoDependabot size={24}/>}</div>
                <div className='flex-1'>{message.text}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-700 flex-shrink-0 py-4">
          <form onSubmit={handleSubmit} className="flex mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="メッセージを入力..."
              className="flex-grow px-4 py-2 bg-gray-700 text-white outline-none focus:outline-none focus:ring-0 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="flex-gorw bg-gray-700 text-white px-4 py-2 "
            >
              {isLoading ? <Loading /> :  <GoPaperAirplane/>}
            </button>
          </form>
        </div>  
      </div>
  );
};

export default ChatApp;