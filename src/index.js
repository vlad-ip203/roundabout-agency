import {createClient} from "@supabase/supabase-js"
import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.scss"
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import {App, Supabase} from "./lib/consts"
import {GlobalStateProvider} from "./lib/context"
import ThemeProvider from "./lib/theme"
import AboutPage from "./page/AboutPage"
import AuthPage from "./page/AuthPage"
import ErrorPage from "./page/ErrorPage"
import HomePage from "./page/HomePage"
import RootLayout from "./page/RootLayout"
import SearchPage from "./page/SearchPage"
import reportWebVitals from "./test/reportWebVitals"


export const supabase = createClient(Supabase.URL, Supabase.KEY)


const router = createBrowserRouter([
    {
        path: App.HOME,
        element: (
            <RootLayout>
                <Outlet/>
            </RootLayout>
        ),
        errorElement: (
            <RootLayout>
                <ErrorPage/>
            </RootLayout>
        ),
        children: [
            {index: true, element: <HomePage/>},
            {path: App.SEARCH, element: <SearchPage/>},
            {path: App.ABOUT, element: <AboutPage/>},
            {path: App.AUTH, element: <AuthPage/>},
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <GlobalStateProvider>
            <ThemeProvider/>
            <RouterProvider router={router}/>
        </GlobalStateProvider>
    </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()