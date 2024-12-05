export const unreadNotificationsFunc = (notifications, currentUserId) => {
    return notifications.filter((n) => n.isRead === false && n?.senderId !== currentUserId?._id)
}