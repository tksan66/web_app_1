import React, { useState, useEffect } from 'react';
import { CiMemoPad } from "react-icons/ci";
import { LiaAccessibleIcon } from "react-icons/lia";


interface Message {
    text: string;
    sender: 'user' | 'bot';
  }
  
interface Conversation {
id: number;
message: Message[];
}

interface ChatHistoryProps {
  onConversationSelect: (conversation: Conversation) => void;
  Chathistory : Conversation[];
  onChathistory: (conversation: Conversation[]) => void;
  isLoading : boolean;
  }

const ChatHistory: React.FC<ChatHistoryProps> = ({
    onConversationSelect,
    Chathistory,
    onChathistory,
    isLoading
  }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    setConversations(Chathistory);
  }, [Chathistory]);

  const handleConversationClick = (conversation: Conversation) => {
    onConversationSelect(conversation);
  };

  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Chathistory.length + 1,
      message: [],
    };
    onChathistory([...Chathistory, newConversation]);
    onConversationSelect(newConversation);
  };

  return (
    <div className="flex flex-col items-start overflow-y-auto h-full">
      <button
        className="bg-blue-300 text-white px-4 py-2 rounded-lg mb-4 w-5/6 items-center mx-auto flex justify-center"
        onClick={handleNewConversation}
        disabled = {isLoading}
      > 
        <LiaAccessibleIcon className="mr-6 h-5 w-5"/>
        <div>Create New Conversation</div>
      </button>
        <div className="w-full mx-auto">
        {conversations.map((conversation, index) => (
            <button
            key={index}
            className="bg-gray-500 rounded-lg p-4 mb-4 w-3/4 truncate text-white mx-auto flex items-center"
            onClick={() => handleConversationClick(conversation)}
            disabled = {isLoading}
            >
                <CiMemoPad className="mr-2 h-7 w-7"/>
                <div>{conversation.message.length > 0 ? (
              conversation.message[0].text
            ) : ("")}
              </div>
            </button>
        ))}
        </div>
    </div>
  );
};

export default ChatHistory;