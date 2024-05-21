import React, {useState, useEffect} from 'react';
import ChatApp from './ChatApp';
import ChatHistory from './ChatHistory'
import LoginPage from './LoginPage';
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

const App: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>();

  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation);
  };

  const [chathistory, setchathistory] = useState<Conversation[]>([]);

  const handlechathistory = (chathistory: Conversation[]) => {
    setchathistory(chathistory);
  }

  const [isLoading, setIsLoading] = useState(false)

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (loggedIn: boolean) => {
    setIsLoggedIn(loggedIn);
  };

  const [Username, setloginUsername] = useState<User>({"username" : "admin"})
  

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const res_chathistory = await axios.post("http://127.0.0.1:8000/api/getdb/", {user_info : Username});
        const fetchedChathistory = res_chathistory.data.content;
        setchathistory(fetchedChathistory);
      } catch (error) {
        console.error("API error:", error);
      }
    };

    if (isLoggedIn) {
      fetchChatHistory();
    }
  }, [isLoggedIn]); // isLoggedInが変更された際に実行されます
  console.log(chathistory)

  return (
    <div>
      {isLoggedIn ? (
      <div className="flex h-screen bg-black">
        <div className="w-1/3 bg-gray-800">
          <ChatHistory 
            onConversationSelect={handleConversationSelect}
            Chathistory = {chathistory}
            onChathistory = {handlechathistory}
            isLoading = {isLoading}
          />
        </div>
        <div className="w-2/3 flex justify-center items-center">
          <div className="w-full mx-auto ">
            <ChatApp 
              selectedConversation={selectedConversation}
              onChathistory={handlechathistory}
              onSetisloading = {setIsLoading}
              isLoading = {isLoading}
              username = {Username}
            />
          </div>
        </div>
      </div>
      ) : (
        <LoginPage onLogin={handleLogin} onloginusername ={setloginUsername} />
      )}
    </div>
  );
};

export default App;