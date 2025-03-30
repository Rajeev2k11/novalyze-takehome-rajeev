import { FaUser } from "react-icons/fa";
import { FaUserAstronaut } from "react-icons/fa";
import { Message } from "./Chat";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  return (
    <>
      <div className="flex w-full items-start gap-4 p-4">
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border">
          {isUser ? (
            <FaUser className="h-4 w-4" />
          ) : (
            <FaUserAstronaut className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-medium">
            {isUser ? "You" : "Chatbot"}
          </div>
          <div className="prose-sm">{message.content}</div>
        </div>
      </div>
    </>
  );
};
export default ChatMessage;
