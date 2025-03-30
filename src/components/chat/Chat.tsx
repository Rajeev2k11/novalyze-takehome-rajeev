import { useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";

import { v4 as uuidv4 } from "uuid";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";

type MessageRole = "user" | "bot";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
}

const Chat: React.FC = () => {
  const [chatState, setChatState] = useState<ChatState>({
    messages: [],
    isLoading: false,
  });

  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = (msg: string) => {
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: msg,
    };

    setChatState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    setTimeout(() => {
      setChatState((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { id: uuidv4(), role: "bot", content: "This is a bot reply!" },
        ],
        isLoading: false,
      }));
    }, 1000);
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
      }
  }, [chatState.messages]);

  return (
    <Card className="flex flex-col h-[600px] w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between border-b px-4 py-2">
        <h2 className="text-lg font-semibold">Chatbot</h2>
      </div>

      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: "500px" }}
      >
        {chatState.messages.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            Send a message to start the conversation
          </div>
        ) : (
          chatState.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}
      </div>

      <div className="border-t p-4">
        <ChatInput sendMsg={handleSendMessage} />
      </div>
    </Card>
  );
};

export default Chat;
