import { useFetchRecipientUser } from "../../hooks/useFetchRecipient";
import moment from "moment";
import "../../index.css";

const UserChat = ({chat, user}) => {
    const {recipientUser, mostRecentMessage} = useFetchRecipientUser(chat, user);

    return ( <section role="button" className="rounded">
        <div className="pb-4 grid grid-cols-5">
            <a className="col-span-1"><img src={user.profilePicture} className="w-[50px] rounded-full" /></a>
            <div className="col-span-2">
                <div className ="text-white font-semibold">{recipientUser?.firstName}</div>
                <div className="text-white">{mostRecentMessage?.text}</div>
            </div>
            <div className="col-span-2 text-right">
                <div className="text-white date">{moment(mostRecentMessage?.createdAt).calendar({sameDay: 'h:mm A', lastDay: '[Yesterday]', lastWeek:'MMM D', sameElse: 'MMM D, YYYY'})}</div>
                <div className="text-white this-user-notifcations">2</div>
            </div>
        </div>
        <hr class="border-white"/>
    </section> );
};

export default UserChat;

//moment(mostRecentMessage?.createdAt).calendar()