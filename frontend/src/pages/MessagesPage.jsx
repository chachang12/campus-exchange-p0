import React from 'react'
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import UserChat from "../components/ChatComponents/UserChat";
import ChatBox from "../components/ChatComponents/ChatBox";

const MessagesPage = () => {
    const {user} = useUser();

    const {userChats, isUserChatsLoading, updateCurrentChat} = useContext(ChatContext);

    return <section className="p-5">
        {userChats?.length < 1 ? null : (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                    {isUserChatsLoading && <p>Loading conversation...</p>}
                    {userChats?.map((chat, index) => {
                        return (
                            <div key={index} onClick={() => updateCurrentChat(chat)}>
                                <UserChat chat={chat} user={user}/>
                            </div>
                        )
                    })}
                </div>
                <div className="col-span-1">
                    <ChatBox/>
                </div>
            </section>
        )}
    </section>
}

export default MessagesPage