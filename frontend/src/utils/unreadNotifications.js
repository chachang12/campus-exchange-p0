
export const unreadNotificationsFunc = (notifications, currentUserId) => {
    return notifications.filter((n) => n.isRead === false && n?.senderId !== currentUserId?._id)
}

export const unreadNotificationsSpecificChat = (notifications, currentUserId, currentChatId) => {
    return notifications.filter((n) => n.isRead === false && n?.senderId !== currentUserId?._id && n?.chatId === currentChatId?._id)
}