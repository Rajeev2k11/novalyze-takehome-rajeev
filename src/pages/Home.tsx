import React from "react";
import Header from '../components/Header';
import Chat from "../components/chat/Chat";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

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
        <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
      <div className="w-full h-full border rounded-lg shadow-lg">
        <Viewer fileUrl="/src/resources/sample.pdf" />
      </div>
    </Worker>
          </div>
          </div>
    </>
  );
};

export default Home;
