import {useEffect} from "react"
import {getAppTheme, listenSystemThemeChanges, useGlobalState} from "./context"


//Available themes
export const THEME_SYSTEM = "system"
export const THEME_LIGHT = "light"
export const THEME_DARK = "dark"
export const THEMES = [
    THEME_SYSTEM,
    THEME_LIGHT,
    THEME_DARK,
]


export default function ThemeProvider() {
    const [state, dispatch] = useGlobalState()

    const theme = getAppTheme(state)
    document.documentElement.setAttribute("data-bs-theme", theme)

    useEffect(() => listenSystemThemeChanges(state, dispatch))
}