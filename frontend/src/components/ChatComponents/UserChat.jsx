import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import "../../index.css";
import { ChatContext } from "../../context/ChatContext";
import { useContext } from "react";

const UserChat = ({ chat, user }) => {
    const { recipientUser, mostRecentMessage, currentProduct } = useFetchRecipientUser(chat, user);

    // let mostRecentMessageData;
    // try {
    //     mostRecentMessageData = mostRecentMessage ? mostRecentMessage.data : null;
    // } catch (error) {
    //     console.error('Error fetching most recent message:', error);
    // }

    return (
        <section role="button" className="rounded p-4 mb-2 hover:bg-gray-600 cursor-pointer">
            <div className="flex">
                <img src={currentProduct?.image} crossOrigin="anonymous" className="w-[50px] h-[50px] aspect-square mr-4 object-cover" />
                <div className="flex-1">
                    <div className="text-white font-semibold"><span className="font-normal">From</span> {recipientUser?.firstName}</div>
                    <div className="text-gray-300 text-sm truncate">{mostRecentMessage?.text}</div>
                </div>
                <div className="text-right">
                    <div className="text-gray-400 text-xs">{moment(mostRecentMessage?.createdAt).calendar({ sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek: 'MMM D', sameElse: 'MMM D, YYYY' })}</div>
                </div>
            </div>
        </section>
    );
};

export default UserChat;