import React from "react";
import Header from '../components/Header';
import Chat from "../components/chat/Chat";

const Home: React.FC = () => {
  return (
    <>
        <Header />
        <div className="flex h-screen bg-gray-background-dark">
          {/* Left side Chat bot */}
        <div className="w-1/3 p-4 bg-white shadow-md flex flex-col">
        <h1 className="text-2xl font-bold mb-8 text-center">Novalyze Chatbot</h1>
        <Chat />
        </div>
        {/* Right side  */}
        <div className="w-2/3 p-4 flex justify-center items-center">
          <iframe
            src="/src/resources/sample.pdf"
            className="w-full h-full border rounded-lg shadow"
            title="Embedded PDF"
          ></iframe>
          </div>
          </div>
    </>
  );
};

export default Home;
