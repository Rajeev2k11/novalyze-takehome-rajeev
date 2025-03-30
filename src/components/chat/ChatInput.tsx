import { SendIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useState } from "react";


interface ChatInputProps {
    sendMsg: (message: string) => void;
   
  }
const ChatInput = ({sendMsg}: ChatInputProps)=>{
    const [input, setInput] = useState("");

    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log(input)
        sendMsg(input)
        setInput("")
    }

    return(
        <>
<form onSubmit={handleSubmit} className="flex items-end gap-2">
      <Textarea
        placeholder="Type your message..."
        className="min-h-[60px] resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button
        type="submit"
        size="icon"
     
      >
        <SendIcon className="h-4 w-4" />
        <span className="sr-only">Send message</span>
      </Button>
    </form>
        </>
    )
}

export default ChatInput;