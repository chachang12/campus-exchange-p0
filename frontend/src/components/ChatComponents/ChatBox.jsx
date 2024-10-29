import {useContext, useState} from "react";
import { useUser } from "../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";


const ChatBox = () => {
    const {user} = useUser();

    const {currentChat, isMessagesLoading, messages, sendTextMessage} = useContext(ChatContext);
    const {recipientUser} = useFetchRecipientUser(currentChat, user);
    const [textMessage, setTextMessage] = useState("");

    if(!recipientUser) return(
        <p style={{textAlign: "center"}}>
            No conversation selected yet.
        </p>
    );

    if (isMessagesLoading) return (
        <p style={{textAlign: "center"}}>
            Loading conversation...
        </p>
    )

    return <section>
        <div>
            <strong>{recipientUser?.name}</strong>
        </div>
        <section>
            {messages && messages.map((message, index) => 
            <section key={index} className={`${message?.senderId === user?._id ? "text-end": "text-start"}`}>
                <div className="text-white">{message.text}</div>
                <div className="text-white">{moment(message.createdAt).calendar({sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek:'MMM D', sameElse: 'MMM D, YYYY'})}</div>
            </section>)}
        </section>
        <section className="flex items-stretch">
            <input className = "outline-none w-5/6 rounded" placeholder = "Message" type="text" value = {textMessage} onChange = {(e) => setTextMessage(e.target.value)}/>
            <button className="text-white pl-3" onClick={() => sendTextMessage(textMessage, user, currentChat._id, setTextMessage)} variant="primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </section>
    </section>
}

export default ChatBox;