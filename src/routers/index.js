import {  createBrowserRouter } from "react-router-dom";
import HomePage from "../page/Home";



export default createBrowserRouter([
    {
        element : <HomePage/>,
        path : '/'
    }
])