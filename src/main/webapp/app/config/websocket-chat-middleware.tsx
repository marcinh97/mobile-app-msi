import SockJS from 'sockjs-client';

import Stomp from 'webstomp-client';
import { Observable } from 'rxjs';
import { Storage } from 'react-jhipster';

import { ACTION_TYPES as AUTH_ACTIONS } from 'app/shared/reducers/authentication';
import { FAILURE } from 'app/shared/reducers/action-type.util';
import {
  ACTION_TYPES,
  AGREE_TO_TALK,
  DISAGREE_TO_TALK,
  sendMessageAction,
  STOP_CHAT,
  stopChatNow
} from "app/modules/chat/chat.reducer";
import * as React from "react";
import {IMessage} from "app/shared/model/chat.model";

let stompClient;

let subscriber = null;
let connection: Promise<any>;
let connectedPromise: any = null;
let listener: Observable<any>;
let listenerObserver: any;
let alreadyConnectedOnce = false;
let currentUser;
let otherUser;

const createConnection = (): Promise<any> => new Promise((resolve, reject) => (connectedPromise = resolve));

const createListener = (): Observable<any> =>
  new Observable(observer => {
    listenerObserver = observer;
  });

export const sendSystemMessage = payload => {
  sendMessage(payload, true)
}

export const sendMessage = (payload, isSystemMess=false) => {

  console.log("before: ")
  console.log(payload)

  //dirty haxy -dopoki nie ogarniemy promise (czy mamy na to czas? XDD)
    console.log(stompClient)
    console.log("Send mess: ")
    console.log(payload)
    stompClient.send('/app/message', JSON.stringify({
        senderName: isSystemMess ? "system" : currentUser,
        content: payload
    }));
 // connection = createConnection();
 // console.log(connection)

  // todo czy to dziala? xd
 // connection.then(() => {
  //  console.log("Send mess: ")
  //  console.log(payload)
  //  stompClient.send('/app/message', JSON.stringify(payload));
  //});
};

export interface IFoundUser {
  username: string;
  hobbies: Array<string>;
  images: Array<string>;
  aboutme: string;
  age: number
}

export interface IUserInfo {
  hobbies: Array<string>;
  pictures: Array<string>;
  aboutMe: string;
  age: number;
}

const subscribe = (store) => {
  connection.then(() => {
    subscriber = stompClient.subscribe('/user/chat', data => {
      //listenerObserver.next(JSON.parse(data.body));
      console.log('Cos przyszlo');
      const result = JSON.parse(data.body)
      const type = result.type
      //TODO JESLI type "TEXT" , to wtedy pokaz wiadomosc na gui i usun widaomosc z pola tekstowego
      //TODO jesli wiadomosc typu "LEAVE" - to wtedy pokaz komunikat, ze user sie rozlaczyl i wylacz czat.
      currentUser = localStorage.getItem("currentUser")
      if (type === "MATCHED") {
        console.log(result)
        otherUser = result.content;
        const otherUserName:string = result.content
        const otherUserInfo:IUserInfo = result.userInformation

        currentUser = localStorage.getItem("currentUser")

        console.log("OTHER: " + otherUser)
        console.log("CURR: " + currentUser)
        console.log(store)
        console.log(localStorage.getItem("currentUser"))
        console.log(localStorage.getItem("currentUserStringify"))
        store.dispatch({
          type: ACTION_TYPES.TOGGLE_FOUND_USER,
          payload: JSON.stringify(data.body)
        });
        // todo - tutaj szczegoly
        const foundUser:IFoundUser = {
          username: otherUserName,
          hobbies: otherUserInfo.hobbies,
          images: otherUserInfo.pictures,
          aboutme: otherUserInfo.aboutMe,
          age: otherUserInfo.age
        }
        store.dispatch({
          type: ACTION_TYPES.FOUND_USER_DETAILS,
          payload: foundUser
        })
      }
      else if (type === "TEXT") {
        console.log("&&&& I received a message &&&&")

        const senderName = result.senderName
        const messageText = result.content

        if (messageText === STOP_CHAT && result.senderName !== 'system') {
          console.log("THIS IS A SYSTEM MESSAGE TO STOP THIS CHAT XD")
          store.dispatch({
            type: ACTION_TYPES.STOP_CURRENT_CHAT,
            payload: true
          })
        }
        else if (messageText === AGREE_TO_TALK && result.senderName !== 'system') {
          console.log("THIS IS A MESSAGE FROM SOMEONE WHO AGREED")
          store.dispatch({
            type: ACTION_TYPES.AGREE_TO_START_CHAT,
            payload: 1
          })
        }
        else if (messageText === DISAGREE_TO_TALK) {
          console.log("DIS IS A MESSAGE FROM SOMEONE WHO DISAGREED")
          store.dispatch({
            type: ACTION_TYPES.DISAGREE_TO_START_CHAT,
            payload: 1
          })
        }
        else {
          const message:IMessage = {
            id: Math.random()*1000 | 0, // todo change to real ids
            number: 12,
            text: messageText,
            isUserMessage: senderName === currentUser,
            date: new Date()
          }
          // currentUser
          // todo - do dispatch wrzucic w formacie message. To jesli ktos przysyla
          console.log(`FROM: ${senderName} TO: ${currentUser} \n Mess: ${messageText}`)
          store.dispatch(sendMessageAction(JSON.stringify(message)))
        }
      }
    });
    stompClient.send('/app/joinChat', {});
  });
};

export const connect = (store) => {
  if (connectedPromise !== null || alreadyConnectedOnce) {
    // the connection is already being established
    return;
  }
  connection = createConnection();
  listener = createListener();

  // building absolute path so that websocket doesn't fail when deploying with a context path
  const loc = window.location;
  const baseHref = document
    .querySelector('base')
    .getAttribute('href')
    .replace(/\/$/, '');

  const headers = {};
  let url = '//' + loc.host + baseHref + '/websocket';
  const authToken = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (authToken) {
    url += '?access_token=' + authToken;
  }
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket);

  stompClient.connect(headers, () => {
    connectedPromise('success');
    connectedPromise = null;
    subscribe(store);
  });
};

const disconnect = () => {
  if (stompClient !== null) {
    stompClient.disconnect();
    stompClient = null;
  }
  window.onhashchange = () => {};
  alreadyConnectedOnce = false;
};

const receive = () => listener;

const unsubscribe = () => {
  if (subscriber !== null) {
    subscriber.unsubscribe();
  }
  listener = createListener();
};

export default store => next => action => {
  console.log("SSTTOORREE")
  console.log(action.type)
  if (action.type === ACTION_TYPES.FIND_SOMEONE_TO_CHAT) {
    console.log("I am finding someone to chat")
    connect(store);
  } else if (action.type === FAILURE(AUTH_ACTIONS.GET_SESSION)) {
    console.log("XX YY")
    unsubscribe();
    disconnect();
  }
  return next(action);
};
