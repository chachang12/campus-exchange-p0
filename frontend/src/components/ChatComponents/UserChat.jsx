import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import "../../index.css";

const UserChat = ({ chat, user }) => {
    const { recipientUser, mostRecentMessage } = useFetchRecipientUser(chat, user);

    return (
        <section role="button" className="rounded p-4 mb-2 hover:bg-gray-600 cursor-pointer">
            <div className="flex items-center">
                <img src={recipientUser?.profilePicture} crossOrigin="anonymous" className="w-[50px] h-[50px] rounded-full mr-4" />
                <div className="flex-1">
                    <div className="text-white font-semibold">{recipientUser?.firstName}</div>
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