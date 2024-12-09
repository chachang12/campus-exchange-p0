import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import "../../index.css";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";
import { unreadNotificationsSpecificChat } from "../../utils/unreadNotifications";
import { useFetchLatestMessage } from "../../hooks/useFetchLatestMessage";

const UserChat = ({ chat, user }) => {
    const { recipientUser, currentProduct } = useFetchRecipientUser(chat, user);
    const { notifications, markThisUserNotificationsAsRead } = useContext(ChatContext);
    const unreadNotifications = unreadNotificationsSpecificChat(notifications, user, chat);
    const {latestMessage} = useFetchLatestMessage(chat);

    return (
        <section onClick= {() => {if(unreadNotifications?.length !== 0) {markThisUserNotificationsAsRead(unreadNotifications, notifications)}}}role="button" className="rounded p-4 mb-2 hover:bg-gray-600 cursor-pointer">
            <div className="relative flex">
                <img src={currentProduct?.image} crossOrigin="anonymous" className="w-[50px] h-[50px] aspect-square mr-4 object-cover" />
                <div className="flex-1 truncate">
                    <div className="text-white font-semibold"><span className="font-normal"></span> {recipientUser?.firstName}</div>
                    <div className="text-gray-300 text-sm truncate">{latestMessage?.text}</div>
                </div>
                <div className="items-center">
                    <div className="text-gray-400 text-xs">{moment(latestMessage?.createdAt).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}</div>
                </div>
                {unreadNotifications.length > 0 ? <div className="absolute bottom-0 right-0 w-5 rounded-full bg-blue-500 text-sm text-white text-center">{unreadNotifications.length}</div> : (null)}
            </div>
        </section>
    );
};

export default UserChat;