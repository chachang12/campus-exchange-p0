import { IoNotifications } from "react-icons/io5";
import { useContext, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { useUser } from "../../context/UserContext";
import { unreadNotificationsFunc } from "../../utils/unreadNotifications";
import moment from "moment";

const Notification = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useUser();
    const {notifications, userChats, allUsers, markAllNotificationsAsRead, markNotificationAsRead } = useContext(ChatContext);
    const unreadNotifications = unreadNotificationsFunc(notifications);

    const modifiedNotifications = notifications.map((n) => {
        const sender = allUsers.find((user) => user._id == n.senderId)

        return{
            ...n,
            senderName: sender?.firstName
        };
    });


    return ( <div className="text-white">
        <div onClick={() =>setIsOpen(!isOpen)} className="p-4 bg-[#1F1F1F] rounded-full w-[54px] flex items-center justify-center border border-gray-500">
            <IoNotifications color='#ffffff' size={20}/>
        </div>
        {unreadNotifications?.length === 0 ? null : (
            <span>{unreadNotifications?.length}</span>
        )}
        {isOpen? (<div>
            <h3>Notifications</h3>
            <div onClick={()  => markAllNotificationsAsRead(notifications)}>
                Mark all as read
            </div>
            {modifiedNotifications?.length === 0 ? <span>No new notifications</span> : null}
            {modifiedNotifications && modifiedNotifications.map((n, index) => {
                return <div onClick = {()=> markNotificationAsRead(n, userChats, user, notifications)} key={index} className= {n.isRead ? 'notification' : 'notification not-read'}>
                    <span>{`${n.senderName} sent you a new message`}</span>
                    <span>{moment(n.date).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}</span>
                </div>
            })}
        </div>) : null}
    </div> );
}
 
export default Notification;