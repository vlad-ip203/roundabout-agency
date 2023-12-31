import React from "react"
import ReactDOM from "react-dom/client"
import "./style/index.scss"
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom"
import AboutPage from "./component/AboutPage"
import AuthPage from "./component/auth/AuthPage"
import ViewDeclarationPage from "./component/catalog/declaration/ViewDeclarationPage"
import DeclarationsCatalogPage from "./component/catalog/DeclarationsCatalogPage"
import ViewFacilityPage from "./component/catalog/facility/ViewFacilityPage"
import ForbiddenPage from "./component/error/ForbiddenPage"
import NotFoundPage from "./component/error/NotFoundPage"
import HomePage from "./component/home/HomePage"
import RootLayout from "./component/layout/RootLayout"
import EvaluatorDeclarationsCatalogPage from "./component/user/EvaluatorDeclarationsCatalogPage"
import UserContentCatalogPage, {ContentType} from "./component/user/UserContentCatalogPage"
import UserProfilePage from "./component/user/UserProfilePage"
import {App} from "./lib/consts"
import {GlobalStateProvider} from "./lib/context"
import SessionProvider from "./lib/db/auth/SessionProvider"
import DatabaseManager from "./lib/db/manager"
import ThemeProvider from "./lib/theme/ThemeProvider"
import reportWebVitals from "./test/reportWebVitals"


export const DB = new DatabaseManager()


const router = createBrowserRouter([{
    path: App.HOME,
    element: <RootLayout><Outlet/></RootLayout>,
    errorElement: <RootLayout><NotFoundPage/></RootLayout>,
    children: [
        {index: true, element: <HomePage/>},
        {path: App.ERROR_FORBIDDEN, element: <ForbiddenPage/>},

        {path: App.CATALOG, element: <DeclarationsCatalogPage/>},
        {path: App.ABOUT, element: <AboutPage/>},
        {path: App.AUTH, element: <AuthPage/>},

        {path: App.FACILITY_VIEW, element: <ViewFacilityPage/>},
        {path: App.DECLARATION_VIEW, element: <ViewDeclarationPage/>},

        {path: App.USER_PROFILE, element: <UserProfilePage/>},
        {path: App.USER_FACILITIES, element: <UserContentCatalogPage contentType={ContentType.FACILITIES}/>},
        {path: App.USER_DECLARATIONS, element: <UserContentCatalogPage contentType={ContentType.DECLARATIONS}/>},
        {path: App.EVALUATOR_DECLARATIONS, element: <EvaluatorDeclarationsCatalogPage/>},
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