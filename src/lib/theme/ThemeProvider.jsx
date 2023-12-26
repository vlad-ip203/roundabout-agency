import {useEffect, useRef} from "react"
import {getAppTheme, listenSystemThemeChanges, useGlobalState} from "../context"


export default function ThemeProvider() {
    const [state, dispatch] = useGlobalState()

    const theme = getAppTheme(state)
    document.documentElement.setAttribute("data-bs-theme", theme)

    //Apply listener only once
    let ignore = useRef(false)
    useEffect(() => {
        if (!ignore.current) {
            ignore.current = true
            listenSystemThemeChanges(state, dispatch)
        }
    }, [dispatch, ignore, state])
}