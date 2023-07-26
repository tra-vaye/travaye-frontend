// import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

// import { PersistGate } from "redux-persist/integration/react";
// import storage from "redux-persist/lib/storage";
import App from "./App";
import "./index.css";
// import authReducer from "./state";
import { store } from "./redux/store";

// const persistConfig = { key: "root", storage, version: 1 };
// const persistedReducer = persistReducer(persistConfig, authReducer);
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <PersistGate loading={null} persistor={persistStore(store)}> */}
        <App />
        {/* </PersistGate> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
