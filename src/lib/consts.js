export class App {
    static HOME = "/"
    static SEARCH = "/search"
    static ABOUT = "/about"
    static AUTH = "/auth"
    static PROFILE = "/profile"
}

export class Supabase {
    static URL = "https://mcqwnznlvqkexbxtxjdg.supabase.co"
    static KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcXduem5sdnFrZXhieHR4amRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM0NTgzMTQsImV4cCI6MjAxOTAzNDMxNH0.eIL90ITkD7yuu_kvLBysQsJ9L2puWD2H4Ihlt-KY8Jw"
}

//TODO 25.12.2023: Remove NAV_ prefix
export class Strings {
    static SITE_NAME = "Розворот"

    static NAV_HOME = "Головна"
    static NAV_SEARCH = "Пошук"
    static NAV_ABOUT = "Про нас"
    static NAV_AUTH = "Вхід/Реєстрація"
    static NAV_PROFILE = "Профіль"
    static NAV_THEME = "Тема інтерфейсу"
    static NAV_THEME_LIST = {
        "system": "За вибором системи",
        "light": "Світла",
        "dark": "Темна",
    }
    static SIGN_OUT = "Вийти"
}