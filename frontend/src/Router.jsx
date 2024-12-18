import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Error from "./Content/Error/Error";
import Home from "./Content/Home/Home";
import Stats from "./Content/DisplayPage/Stats";
import UploadFile from "./Content/UploadFile/UploadFile";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />} errorElement={<Error />}>
            <Route index element={<Home />} />
            <Route path="display" element={<Stats />} />

            <Route
                path="*"
                loader={() => {
                throw { status: 404, message: "Page Not Found" };
                }}
            />

            <Route path="upload" element={<UploadFile />} />
        </Route>
    )
)