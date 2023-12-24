import React from "react"
import ReactDOM from "react-dom/client"
import "./style/fix.css"
import "./style/index.css"
import RootLayout from "./page/RootLayout"
import reportWebVitals from "./test/reportWebVitals"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import ErrorPage from "./page/ErrorPage"
import AboutPage from "./page/AboutPage"
import HomePage from "./page/HomePage"
import {App} from "./lib/consts"
import ThemeSelector from "./lib/theme"


const router = createBrowserRouter([
    {
        path: App.HOME,
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <HomePage/>},
            {path: App.ABOUT, element: <AboutPage/>},
        ],
    },
])

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <ThemeSelector>
            <RouterProvider router={router}/>
        </ThemeSelector>
    </React.StrictMode>,
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()