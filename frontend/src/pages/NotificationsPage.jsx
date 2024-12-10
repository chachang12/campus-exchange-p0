import { IoNotifications } from "react-icons/io5";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { useUser } from "../context/UserContext";
import { unreadNotificationsFunc } from "../utils/unreadNotifications";
import moment from "moment";

import { useNavigate } from 'react-router-dom';



const NotificationsPage = () => {
    const {user} = useUser();
    const {notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);

    const unreadNotifications = unreadNotificationsFunc(notifications, user);
    const navigate = useNavigate();


    const modifiedNotifications = notifications
        .filter((n) => n.senderId !== user._id) // Exclude notifications from the current user
        .map((n) => {
            const sender = allUsers.find((user) => user._id === n.senderId);
            return {
                ...n,
                senderName: sender?.firstName,
            };
        });


    return ( <div className="text-white">
        {/* {unreadNotifications?.length === 0 ? null : (
            <span>{unreadNotifications?.length}</span>
        )} */}
        <div className="flex flex-col h-full items-center">
        <h2 className="text-white text-xl font-semibold mb-4 text-center pt-4">Notifications</h2>
            <button className="bg-transparent py-2 px-4 text-white border border-white" onClick={()  => markAllNotificationsAsRead(notifications)}>
                Mark all as read
            </button>
            <div className="">
                {modifiedNotifications?.length === 0 ? <div className="absolute inset-0 flex items-center justify-center">No new notifications</div> : null}
                {modifiedNotifications && modifiedNotifications.map((n, index) => {

                    return <div onClick = {()=> navigate(`/chat/${n.chatId}`)} key={index} className="relative flex w-screen items-center p-4 border-b border-gray-700">

                        <img src={n.senderPicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4 object-cover" />
                        <div className="flex-1">
                            <div>{`${n.senderName}`}</div>
                            <div className="text-gray-300 text-sm truncate">{`${n.text}`}</div>
                        </div>
                        <div className="text-gray-400 text-xs absolute top-2 right-2">{moment(n.date).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}</div>
                        {n.isRead ? null : <div className="absolute top-8 right-2 rounded-full bg-blue-500 w-4 h-4"> </div>}
                    </div>
                })}
            </div>
        </div>
    </div> )
}
 
export default NotificationsPage;