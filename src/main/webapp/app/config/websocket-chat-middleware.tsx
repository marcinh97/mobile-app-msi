import SockJS from 'sockjs-client';

import Stomp from 'webstomp-client';
import { Observable } from 'rxjs';
import { Storage } from 'react-jhipster';

import { ACTION_TYPES as AUTH_ACTIONS } from 'app/shared/reducers/authentication';
import { FAILURE } from 'app/shared/reducers/action-type.util';
import {ACTION_TYPES} from "app/modules/chat/chat.reducer";
import * as React from "react";

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

export const sendMessage = payload => {

  console.log("before: ")
  console.log(payload)

  //dirty haxy -dopoki nie ogarniemy promise (czy mamy na to czas? XDD)
    console.log(stompClient)
    console.log("Send mess: ")
    console.log(payload)
    stompClient.send('/app/message', JSON.stringify({
        senderName: currentUser,
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

const subscribe = (store) => {
  connection.then(() => {
    subscriber = stompClient.subscribe('/user/chat', data => {
      //listenerObserver.next(JSON.parse(data.body));
      console.log('Cos przyszlo');
      const result = JSON.parse(data.body)
      const type = result.type
      //TODO JESLI type "TEXT" , to wtedy pokaz wiadomosc na gui i usun widaomosc z pola tekstowego
      //TODO jesli wiadomosc typu "LEAVE" - to wtedy pokaz komunikat, ze user sie rozlaczyl i wylacz czat.
      if (type === "MATCHED") {
        console.log(result)
        otherUser = result.content;
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
          username: otherUser,
          hobbies: ['manicure', 'Adele', 'music', 'Español'],
          images: [
            "https://ocs-pl.oktawave.com/v1/AUTH_2887234e-384a-4873-8bc5-405211db13a2/splay/2019/09/BoJack.jpg",
            "https://3.bp.blogspot.com/-fyUiBNhkXEg/W6e5Vu_IyDI/AAAAAAAAIbE/LtAxxswfyToRjAyp4Nht1beSky6dp8iCACLcBGAs/s1600/bojack-horseman.jpg"
          ],
          aboutme: "Jestem bardzo fajna!!!!!! ",
          age: Math.random()*50
        }
        store.dispatch({
          type: ACTION_TYPES.FOUND_USER_DETAILS,
          payload: foundUser
        })
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
