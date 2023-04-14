import firestore from '@react-native-firebase/firestore';
import {COLLECTION} from '@config/constants';

const userRef = firestore().collection(COLLECTION.USERS);
const conversationRef = firestore().collection(COLLECTION.MESSAGES);

class Chat {
  async createUser(userObj) {
    const userData = await userRef.doc(`${userObj.id}`).get();
    if (!userData.exists) {
      const _data = {
        userInfo: {
          userId: userObj.id,
          email: userObj.email,
          name: userObj.name,
          profile_picture: userObj.profile_picture,
        },
        hasUnreadMsg: false,
        isOnline: true,
        last_seen: new Date(),
      };
      await userRef.doc(`${userObj.id}`).set(_data);
    } else {
      const _data = {
        userInfo: {
          userId: userObj.id,
          email: userObj.email,
          name: userObj.name,
          profile_picture: userObj.profile_picture,
        },
        isOnline: true,
        last_seen: new Date(),
      };
      await userRef.doc(`${userObj.id}`).update(_data);
    }
  }

  createConversationId(chatterID, chateeID) {
    if (!chatterID && chatterID !== 0) {
      throw 'Unable to create conversation ID. Chatter or Chatee ID is null';
    }
    if (!chateeID && chateeID !== 0) {
      throw 'Unable to create conversation ID. Chatter or Chatee ID is null';
    }
    const chatIDpre: any = [];
    chatIDpre.push(chatterID);
    chatIDpre.push(chateeID);
    chatIDpre.sort();
    return chatIDpre.join('_');
  }

  async addConversationToUserIfNotExists(userId, friendId, conversationId) {
    const conversationDoc = userRef
      .doc(`${userId}`)
      .collection('conversations');
    const friendDoc = conversationDoc.doc(`${friendId}`);
    const friendSnapshot = await friendDoc.get();
    if (!friendSnapshot.exists) {
      const friendData = await userRef.doc(`${friendId}`).get();
      const _friendData = friendData.data();
      const friendInfo = _friendData ? _friendData.userInfo : null;

      await friendDoc.set({
        conversationId,
        friendsData: friendInfo,
        unreadCount: 0,
        lastMessage: null,
      });
      return;
    } else {
      this.addFriendInfoIfNotExists(friendDoc, friendSnapshot, friendId);
    }
  }

  async addFriendInfoIfNotExists(friendDoc, friendSnapshot, friendId) {
    const _friendsData = friendSnapshot.data();

    if (!_friendsData.friendsData) {
      const friendData = await userRef.doc(`${friendId}`).get();
      const _friendData = friendData.data();
      const friendInfo = _friendData ? _friendData.userInfo : null;

      await friendDoc.update({
        friendsData: friendInfo,
      });
      return;
    }
  }

  async sendMessage(conversationId, senderId, receiverId, message) {
    const conversationObj: any = conversationRef.doc(conversationId);
    await conversationObj.collection('messages').add(message);
    await this.addConversationToUserIfNotExists(
      senderId,
      receiverId,
      conversationObj.id,
    );
    this.updateNewMessage(
      senderId,
      receiverId,
      conversationObj,
      message,
      conversationId,
    )
      .then()
      .catch((ex) => console.log('[Error updating sent message data]', ex));
    return;
  }

  async updateNewMessage(
    userId,
    friendId,
    conversationObj,
    lastMessage,
    conversationId,
  ) {
    await this.addConversationToUserIfNotExists(
      friendId,
      userId,
      conversationId,
    );

    await this.updateUnreadCountForFriend(friendId, userId, lastMessage);
  }

  async updateUnreadCountForFriend(friendId, userId, lastMessage) {
    const friendRef = userRef.doc(`${friendId}`);
    const conversationDoc = friendRef.collection('conversations');
    const friendDoc = conversationDoc.doc(`${userId}`);
    const snapshot: any = await friendDoc.get();
    const unreadCount = snapshot.data().unreadCount;

    await friendDoc.update({
      unreadCount: unreadCount + 1,
      lastMessage,
    });

    await friendRef.update({
      hasUnreadMsg: true,
    });
  }

  setAsRead(userId, friendId) {
    // const friendRef = userRef.doc(`${friendId}`);
    const userRefDoc = userRef.doc(`${userId}`);
    const conversationDoc = userRef
      .doc(`${userId}`)
      .collection('conversations');
    const friendDoc = conversationDoc.doc(`${friendId}`);

    userRefDoc
      .update({
        hasUnreadMsg: false,
      })
      .then(() => {})
      .catch((ex) => {
        console.log('[ERROR SETTING hasUnreadMsg to false]', ex);
      });

    return friendDoc.update({
      unreadCount: 0,
    });
  }

  listenToMessagesOnChannel(conversationId) {
    const conversationObj: any = conversationRef.doc(conversationId);
    return conversationObj.collection('messages').orderBy('createdAt', 'desc');
  }

  transformMyMessageToUIType(messages) {
    return messages.docs.map((msg) => {
      const _data = msg.data();
      const t: any = _data.createdAt;
      const date = new firestore.Timestamp(t.seconds, t.nanoseconds);
      return {
        ..._data,
        createdAt: date.toDate(),
      };
    });
  }

  async getConversationList(userId) {
    const conversationDoc = userRef
      .doc(`${userId}`)
      .collection('conversations')
      .orderBy('unreadCount', 'desc');

    return conversationDoc;
  }

  async getUserInfo(userId) {
    const friendData = await userRef.doc(`${userId}`).get();
    const _userData = friendData.data();
    return _userData;
  }

  transformMyConversationsListToUIType(converstionList) {
    return converstionList.map((_list) => {
      const _data = _list.data();
      const _friendData = _data.friendsData ? _data.friendsData : {};
      const _lastMessage = _data.lastMessage ? _data.lastMessage : {};
      return {
        unreadCount: _data.unreadCount,
        conversationId: _data.conversationId,
        ..._friendData,
        ..._lastMessage,
      };
    });
  }

  async goOffline(userId, to) {
    return userRef.doc(`${userId}`).update({
      isOnline: to,
      last_seen: new Date(),
    });
  }

  startListeningToUnreadMessages(userId) {
    const conversationDoc = userRef.doc(`${userId}`);

    return conversationDoc;
  }

  changeUserName(id, userObj) {
    const userRefDoc = userRef.doc(`${id}`);

    userRefDoc
      .update({
        userInfo: {
          userId: userObj.id,
          email: userObj.email,
          name: userObj.name,
          profile_picture: userObj.profile_picture,
        },
      })
      .then(() => {})
      .catch((ex) => {
        console.log('[ERROR SETTING hasUnreadMsg to false]', ex);
      });
  }
}

export default new Chat();
