import React from 'react';
import ChatApp from './ChatApp';

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-full max-w-3xl mx-auto ">
        <ChatApp />
      </div>
    </div>
  );
};

export default App;