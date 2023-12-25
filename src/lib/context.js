// noinspection JSUnresolvedReference

import React from "react"
import {Log} from "./log"
import {getStoredTheme, setStoredTheme} from "./storage"
import {THEME_DARK, THEME_LIGHT, THEME_SYSTEM} from "./theme/consts"


const defaultGlobalState = {
    theme: getStoredTheme(),
}

const GlobalStateContext = React.createContext(defaultGlobalState)
const DispatchStateContext = React.createContext(undefined)

export const GlobalStateProvider = ({children}) => {
    const [state, dispatch] = React.useReducer(
        (state, newValue) => ({...state, ...newValue}),
        defaultGlobalState,
    )

    return (
        <GlobalStateContext.Provider value={state}>
            <DispatchStateContext.Provider value={dispatch}>
                {children}
            </DispatchStateContext.Provider>
        </GlobalStateContext.Provider>
    )
}


export const useGlobalState = () => [
    React.useContext(GlobalStateContext),
    React.useContext(DispatchStateContext),
]

const notifyContextChanged = (dispatch) => dispatch({})


const getTheme = (state) => state.theme
export function setTheme(dispatch, theme: string) {
    setStoredTheme(theme)
    dispatch({theme})
}

export function getAppTheme(state) {
    switch (getTheme(state)) {
        default:
        case THEME_SYSTEM:
            return getSystemTheme()
        case THEME_LIGHT:
            return THEME_LIGHT
        case THEME_DARK:
            return THEME_DARK
    }
}

const themeListenerSupported = () =>
    window.matchMedia("(prefers-color-scheme: dark)").media !== "not all"

function getSystemTheme() {
    if (!themeListenerSupported())
        return THEME_LIGHT

    return window.matchMedia("(prefers-color-scheme: dark)").matches ?
        THEME_DARK : //System theme is dark
        THEME_LIGHT  //System theme is light
}

export function listenSystemThemeChanges(state, dispatch) {
    if (!themeListenerSupported())
        return

    window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", event => {
            const theme = event.matches ?
                THEME_DARK :
                THEME_LIGHT

            if (getTheme(state) === THEME_SYSTEM) {
                Log.v("context::listenSystemThemeChanges: EventListener-> theme change approved = " + theme)
                notifyContextChanged(dispatch)
            } else
                Log.v("context::listenSystemThemeChanges: EventListener-> theme change denied = " + theme)
        })
}