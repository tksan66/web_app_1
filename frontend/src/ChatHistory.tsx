import React, { useState, useEffect } from 'react';
import { CiMemoPad } from "react-icons/ci";
import { LiaAccessibleIcon } from "react-icons/lia";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from 'axios'; 


interface Message {
    text: string;
    sender: 'user' | 'bot';
  }
  
interface Conversation {
id: number;
message: Message[];
}

interface User {
  username: string;
}

interface ChatHistoryProps {
  onConversationSelect: (conversation: Conversation) => void;
  Chathistory : Conversation[];
  onChathistory: (conversation: Conversation[]) => void;
  isLoading : boolean;
  username : User;
  }

const ChatHistory: React.FC<ChatHistoryProps> = ({
    onConversationSelect,
    Chathistory,
    onChathistory,
    isLoading,
    username
  }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
  useEffect(() => {
    setConversations(Chathistory);
  }, [Chathistory]);

  const handleConversationClick = (conversation: Conversation) => {
    onConversationSelect(conversation);
  };
  const handleNewConversation = () => {
    const newConversation: Conversation = {
      id: Chathistory[Chathistory.length-1].id + 1,
      message: [],
    };
    onChathistory([...Chathistory, newConversation]);
    onConversationSelect(newConversation);
  };

  const deleteConversation = async (conversationId: number) => {
    try {
      const response = await axios.post(`${API_ENDPOINT}/api/deletedb/`, {
        index : conversationId,
        username : username.username,
      });
      
      if (response.data.status === 'success') {
        // 会話履歴から削除する処理
        const updatedChathistory = Chathistory.filter(
          (conversation) => conversation.id !== conversationId
        );
        onChathistory(updatedChathistory);
      } else {
        console.error('Error deleting conversation:', response.data.message);
      }
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  const handleConversationDelete = (conversationId: number) => {
    deleteConversation(conversationId);
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
          <div
          key={index}
          className="bg-gray-500 rounded-lg p-4 mb-4 w-3/4 truncate text-white mx-auto flex items-center"
        >
          <button
            className="flex items-center text-left w-full"
            onClick={() => handleConversationClick(conversation)}
            disabled={isLoading}
          >
            <CiMemoPad className="mr-2 h-7 w-7" />
            <div>{conversation.message.length > 0 ? conversation.message[0].text.substr(0,5)+"..." : ""}</div>
          </button>
          <button
            className="ml-auto text-red-500 hover:text-red-700" 
            onClick={() => handleConversationDelete(conversation.id)}
            disabled={isLoading}
          >
            <FaRegTrashCan className="h-6 w-6" />
          </button>
        </div>
      ))}
      </div>

    </div>
  );
};

export default ChatHistory;