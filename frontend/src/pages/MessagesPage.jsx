import React from 'react'
import {useContext} from "react";
import {ChatContext} from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import UserChat from "../components/ChatComponents/UserChat";
import ChatBox from "../components/ChatComponents/ChatBox";

const MessagesPage = () => {
<<<<<<< HEAD
    //const {user} = useContext(AuthContext);
    
    const user = {
      _id: '671ff74a17e6c584dddf74ee',
      firstName: 'Carson',
      lastName: 'Chang',
      email: 'cadchang@gmail.com',
      profilePicture: 'https://avatars.githubusercontent.com/u/136373179?v=4',
      listings: 5,
      rating: 4.5,
    };

=======
    const {user} = useUser();
>>>>>>> merging

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