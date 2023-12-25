import {useEffect} from "react"
import {getAppTheme, listenSystemThemeChanges, useGlobalState} from "../context"


export default function ThemeProvider() {
    const [state, dispatch] = useGlobalState()

    const theme = getAppTheme(state)
    document.documentElement.setAttribute("data-bs-theme", theme)

    useEffect(() => listenSystemThemeChanges(state, dispatch))
}