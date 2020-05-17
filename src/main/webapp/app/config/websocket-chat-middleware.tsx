import SockJS from 'sockjs-client';

import Stomp from 'webstomp-client';
import { Observable } from 'rxjs';
import { Storage } from 'react-jhipster';

import { ACTION_TYPES as AUTH_ACTIONS } from 'app/shared/reducers/authentication';
import { FAILURE } from 'app/shared/reducers/action-type.util';
import {ACTION_TYPES, toggleFoundUser} from "app/modules/chat/chat.reducer";
import * as React from "react";
import {ACTION_TYPES as ADMIN_ACTIONS} from "app/modules/administration/administration.reducer";

let stompClient;

let subscriber = null;
let connection: Promise<any>;
let connectedPromise: any = null;
let listener: Observable<any>;
let listenerObserver: any;
let alreadyConnectedOnce = false;

const createConnection = (): Promise<any> => new Promise((resolve, reject) => (connectedPromise = resolve));

const createListener = (): Observable<any> =>
  new Observable(observer => {
    listenerObserver = observer;
  });

export const sendMessage = payload => {

  console.log("before: ")
  console.log(payload)
  connection = createConnection();
  console.log(connection)
  console.log(stompClient)
  // stompClient.send('/app/chat', JSON.stringify(payload));
  //
  // connection.then(() => {
  //   console.log("Send mess: ")
  //   console.log(payload)
  //   stompClient.send('/app/chat', JSON.stringify(payload));
  // });
};

const subscribe = (store) => {
  connection.then(() => {
    subscriber = stompClient.subscribe('/user/chat', data => {
      //listenerObserver.next(JSON.parse(data.body));
      console.log('Cos przyszlo');
      const result = JSON.parse(data.body)
      const type = result.type
      if (type === "MATCHED") {
        console.log(result)
        const otherUser = result.content;
        const currentUser = localStorage.getItem("currentUser")
        // window.location.href = `/account/startchat/${otherUser}`

        console.log("OTHER: " + otherUser)
        console.log("CURR: ")
        console.log(store)
        console.log(localStorage.getItem("currentUser"))
        console.log(localStorage.getItem("currentUserStringify"))
        store.dispatch({
          type: ACTION_TYPES.TOGGLE_FOUND_USER,
          payload: JSON.stringify(data.body)
        });

        // todo jakos zmienic stan...

        // window.location.href = `/account/startchat/${user1}&${user2}`
      }
      // if (shouldRedirect) {
      //   console.log("ZAJE")
      //   console.log(data.body)
      //   const obj = JSON.parse(data.body)
      //   console.log(typeof obj)
      //   console.log(obj)
      // }
    });
    //join chat
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
