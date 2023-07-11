import { createStore,combineReducers  } from "redux";

const initialState = {
  loggedIn: false,
  iconImageURL: '',
  uid: '',
  isLoading: true, //ローディングが完了したらfalseにする
};

const accountReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return {
                ...state,
                loggedIn: true,
            }
        case 'SET_LOGGED_OUT':
            return {
                ...state,
                loggedIn: false,
            }
        case 'SET_ICON_IMAGE_URL':
            return {   
                ...state,
                iconImageURL: action.payload,
            }
        case 'SET_UID':
            return {
                ...state,
                uid: action.payload,
            }
        case 'SET_IS_LOADING':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state;
    }
};

const scrollReducer=(state={position:0,direction:"up",over200:false},action)=>{
    switch(action.type){
        case 'SET_SCROLL_POSITION':
            return {
                ...state,
                position: action.payload,
            }
        case 'SET_SCROLL_DIRECTION':
            return {
                ...state,
                direction: action.payload,
            }
        case 'SET_OVER_200':
            return {
                ...state,
                over200: action.payload,
            }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    account: accountReducer,
    scroll: scrollReducer
  });
  
const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

// const store = createStore(accountReducer,scrollReducer);

// export default store;