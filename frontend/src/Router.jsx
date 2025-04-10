import {
    Navigate,
    Route,
    createHashRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./Content/Error/Error";

import Bus from "./utils/Bus";

import Home from "./Content/Home/Home";
import Header from "./Content/Header/Header";
import Feed from "./Content/Feed/Feed";
import NewPost from "./Content/NewPost/NewPost";

import Login from "./Content/Login/Login";
import SignUp from "./Content/Login/SignUp";

window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<Navigate to={"/home"} />} />
            <Route path="home" element={<Header />}>
                <Route index element={<Feed />} />
                <Route path="newPost" element={<NewPost />} />
                <Route path="editPost" element={<Feed />} />
                <Route path="comment" element={<Feed />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

        </Route>
    ),
    
)