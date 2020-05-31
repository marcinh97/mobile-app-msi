import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IUser, defaultValue } from 'app/shared/model/user.model';
import { act } from 'react-dom/test-utils';

export const ACTION_TYPES = {
  FETCH_ROLES: 'userManagement/FETCH_ROLES',
  FETCH_USERS: 'userManagement/FETCH_USERS',
  FETCH_USER: 'userManagement/FETCH_USER',
  CREATE_USER: 'userManagement/CREATE_USER',
  UPDATE_USER: 'userManagement/UPDATE_USER',
  DELETE_USER: 'userManagement/DELETE_USER',
  RESET: 'userManagement/RESET',
  GET_USER_IMGS: 'userManagement/GET_USER_IMGS',
  ADD_IMAGE: 'userManagement/ADD_IMAGE'
};

export interface IUserImg {
  username?: string;
  imageUrl?: string;
}

const initialState = {
  loading: false,
  errorMessage: null,
  users: [] as ReadonlyArray<IUser>,
  authorities: [] as any[],
  user: defaultValue,
  updating: false,
  updateSuccess: false,
  totalItems: 0,
  userImgs: [] as ReadonlyArray<IUserImg>
};

export type UserManagementState = Readonly<typeof initialState>;

// Reducer
export default (state: UserManagementState = initialState, action): UserManagementState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state
      };
    case REQUEST(ACTION_TYPES.FETCH_USERS):
    case REQUEST(ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_USER):
    case REQUEST(ACTION_TYPES.UPDATE_USER):
    case REQUEST(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_USERS):
    case FAILURE(ACTION_TYPES.FETCH_USER):
    case FAILURE(ACTION_TYPES.FETCH_ROLES):
    case FAILURE(ACTION_TYPES.CREATE_USER):
    case FAILURE(ACTION_TYPES.UPDATE_USER):
    case FAILURE(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROLES):
      return {
        ...state,
        authorities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.GET_USER_IMGS):
      return {
        ...state,
        userImgs: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_USERS):
      return {
        ...state,
        loading: false,
        users: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_USER):
      return {
        ...state,
        loading: false,
        user: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_USER):
    case SUCCESS(ACTION_TYPES.UPDATE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_USER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        user: defaultValue
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    case ACTION_TYPES.ADD_IMAGE:
      return {
        ...state,
        userImgs: [...state.userImgs, { username: action.payload.username, imageUrl: action.payload.url }]
      };
    default:
      return state;
  }
};

const apiUrl = 'api/users';
// Actions
export const getUsers: ICrudGetAllAction<IUser> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_USERS,
    payload: axios.get<IUser>(requestUrl)
  };
};

export const getRoles = () => ({
  type: ACTION_TYPES.FETCH_ROLES,
  payload: axios.get(`${apiUrl}/authorities`)
});

export const getUser: ICrudGetAction<IUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_USER,
    payload: axios.get<IUser>(requestUrl)
  };
};

export const getUserImages: ICrudGetAction<IUser> = username => {
  const requestUrl = `api/userImgsBy?username=${username}`;
  return {
    type: ACTION_TYPES.GET_USER_IMGS,
    payload: axios.get(requestUrl)
  };
};

export const createUser: ICrudPutAction<IUser> = user => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_USER,
    payload: axios.post(apiUrl, user)
  });
  dispatch(getUsers());
  return result;
};

export const updateUser: ICrudPutAction<IUser> = user => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_USER,
    payload: axios.put(apiUrl, user)
  });
  dispatch(getUsers());
  return result;
};

export const deleteUser: ICrudDeleteAction<IUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_USER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getUsers());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const addImg = (username, url) => dispatch => {
  dispatch({
    type: ACTION_TYPES.ADD_IMAGE,
    payload: { username, url }
  });
};

export const uploadImage = (imageList, account) => dispatch => {
  // data for submit
  console.log('I UPPPLOADDD');
  const CLOUDINARY_URL = 'https://cors-anywhere.herokuapp.com/https://api.cloudinary.com/v1_1/dwlxoosyr/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'hkyzllo0';
  console.log(imageList);
  const form = new FormData();
  form.append('file', imageList[0].file);
  form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  axios({
    url: CLOUDINARY_URL,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: form
  }).then(function(res) {
    const url = res.data.url;
    // document.getElementById("photo-icon").style.backgroundImage = "url('"+url+"')"
    console.log(url);
    console.log(account.login);
    // const username = account.login
    // const imageUrl = url
    const data = {
      username: account.login,
      imageUrl: url
    };
    const form2 = new FormData();
    form2.append('username', data.username);
    form2.append('imageUrl', url);
    axios
      .post('/api/userImgs', {
        username: data.username,
        imageUrl: data.imageUrl
      })
      .then(res2 => {
        console.log(res2.data);
        const imageUrl = res2.data.imageUrl;
        const user: IUser = res2.data.user;
        console.log(imageUrl);
        console.log(user.login);
        const myData = {
          username: user.login,
          url: imageUrl
        };
        dispatch({
          type: ACTION_TYPES.ADD_IMAGE,
          payload: myData
        });
      });
  });
};
