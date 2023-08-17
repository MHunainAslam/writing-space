
import './App.css';
import { Header } from './Component/layout/Header';
import { MainRoutes } from './MainRoutes';
import { AppContext } from "./context/AppContext.js";
import { useState, useEffect, useRef } from 'react';
import { URL, APP_NAME, API_TOKEN, SITE_URL, GOOGLE_CLIENT_ID } from './config'
import { BrowserRouter, Link, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { useSelector, useDispatch } from 'react-redux';
import { removeUserData, addUserData, updateUserData, setSubscription, setCartItems, removeCartItems, manageQuantity, setCouponCode } from './actions';
import { EditorState, ContentState } from 'draft-js';
import { Footer1 } from './Component/layout/Footer1';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ConfigProvider, FloatButton } from 'antd';


function App() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cartReducer);
  const subscriptions = useSelector((state) => state.subscriptionsReducer);
  const user = useSelector((state) => state.userReducer.user[0]);
  // const discountCode = useSelector((state) => state.userReducer.couponCode[0]);
  const discountCode = useSelector((state) => state.userReducer.couponCode);


  const [noteValue, setNoteValue] = useState("");
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );

  // console.log(subscriptions); 


  const [Title, setTitle] = useState(`Home${APP_NAME}`);


  document.title = Title;

  var values = {
    EditorState, setNoteValue, ContentState, editorState, setEditorState, noteValue, setCartItems, cartItems, SITE_URL, API_TOKEN, setSubscription, setTitle, Title, APP_NAME, URL, removeCartItems, setCouponCode, discountCode, manageQuantity, removeUserData, addUserData, updateUserData, dispatch, user
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          "colorPrimary": "#03204c",
          "colorPrimaryBg": "#eee"
        },
      }}
    >

      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
        <AppContext.Provider value={values}>
          <BrowserRouter>
            <Header />
            <MainRoutes />
            <Footer1 />
            <Toaster position="top-right" containerStyle={{ "transform": "translateY(104px)" }} />
            {/* <FloatButton.BackTop /> */}
          </BrowserRouter>
        </AppContext.Provider>
      </GoogleOAuthProvider>
    </ConfigProvider>
  );
}

export default App;