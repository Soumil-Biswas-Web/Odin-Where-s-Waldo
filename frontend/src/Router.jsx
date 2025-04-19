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
import Game from "./Content/Game/Game";
import Score from "./Content/Score/Score";

window.flash = (message, type = "success") =>
    Bus.emit("flash", { message, type });

export const router = createHashRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<Home/>} />
            <Route path="game" element={<Game />} />
            <Route path="score" loader={Score.loader} element={<Score />} />

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

        </Route>
    ),
    
)