import {THEME_SYSTEM, THEMES} from "./theme"


const KEYS = {
    THEME: "theme",
}


export function getStoredTheme(): string {
    const theme = window.localStorage.getItem(KEYS.THEME)
    return THEMES.some(value => value === theme) ?
        theme :
        THEME_SYSTEM
}
export function setStoredTheme(value: string) {
    window.localStorage.setItem(KEYS.THEME, value)
}