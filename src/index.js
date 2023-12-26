import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.scss"
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import SessionProvider from "./lib/db/auth/SessionProvider"
import {App} from "./lib/consts"
import {GlobalStateProvider} from "./lib/context"
import ThemeProvider from "./lib/theme/ThemeProvider"
import AboutPage from "./page/AboutPage"
import AuthPage from "./page/auth/AuthPage"
import DatabaseManager from "./lib/db/db"
import ErrorPage from "./page/ErrorPage"
import HomePage from "./page/HomePage"
import RootLayout from "./page/RootLayout"
import SearchPage from "./page/SearchPage"
import ProfilePage from "./page/user/ProfilePage"
import reportWebVitals from "./test/reportWebVitals"


export const DB = new DatabaseManager()


const router = createBrowserRouter([{
    path: App.HOME,
    element: <RootLayout><Outlet/></RootLayout>,
    errorElement: <RootLayout><ErrorPage/></RootLayout>,
    children: [
        {index: true, element: <HomePage/>},
        {path: App.SEARCH, element: <SearchPage/>},
        {path: App.ABOUT, element: <AboutPage/>},
        {path: App.AUTH, element: <AuthPage/>},
        {path: App.PROFILE, element: <ProfilePage/>},
    ],
}])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <GlobalStateProvider>
            <SessionProvider/>
            <ThemeProvider/>
            <RouterProvider router={router}/>
        </GlobalStateProvider>
    </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()