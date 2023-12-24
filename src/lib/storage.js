import {THEME_SYSTEM, THEMES} from "./theme"


const KEYS = {
    THEME: "theme",
}


export function readTheme(): string {
    const theme = window.localStorage.getItem(KEYS.THEME)
    return THEMES.some(value => value === theme) ?
        theme :
        THEME_SYSTEM
}
export function putTheme(value: string) {
    window.localStorage.setItem(KEYS.THEME, value)
}