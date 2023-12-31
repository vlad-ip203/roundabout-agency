export const AUTH_FORM_PROVIDERS = [
    "google",
    "apple",
    "facebook",
    "twitter",
]

//Reference: https://github.com/supabase/auth-ui/blob/main/packages/shared/src/theming/Types.ts
export const AUTH_FORM_THEME = {
    default: {
        colors: {
            brand: "#9f3f3f",
            brandAccent: "#873636",
            brandButtonText: "#fffbff",
            defaultButtonBackgroundHover: "#9f3f3f",
            defaultButtonBorder: "#9f3f3f",
            inputBorder: "#dee2e6",
            inputBorderHover: "#dee2e6",
            inputBorderFocus: "#9f3f3f",
            inputPlaceholder: "#4f0000",
            inputText: "black",
            anchorTextColor: "#875300",
            anchorTextHoverColor: "#7f3232",
        },
        space: {
            labelBottomMargin: "8px",
            buttonPadding: "0.375rem 0.75rem",
            inputPadding: "0.375rem 0.75rem",
        },
        borderWidths: {
            buttonBorderWidth: "1px",
            inputBorderWidth: "1px",
        },
        radii: {
            borderRadiusButton: "6px",
            buttonBorderRadius: "6px",
            inputBorderRadius: "6px",
        },
    },
    dark: {
        colors: {
            brandAccent: "#873636",
            inputBorder: "#495057",
            inputBorderHover: "#495057",
            inputBorderFocus: "#873636",
            inputPlaceholder: "#ffadad",
            inputText: "#dee2e6",
            anchorTextColor: "#c58c8c",
            anchorTextHoverColor: "#d1a3a3",
        },
    },
}

export const AUTH_FORM_LOCALE = {
    "sign_up": {
        "email_label": "Адреса електронної пошти",
        "password_label": "Створіть пароль",
        "email_input_placeholder": "Ваша адреса електронної пошти",
        "password_input_placeholder": "Ваш пароль",
        "button_label": "Зареєструватися",
        "loading_button_label": "Реєстрація...",
        "social_provider_text": "Увійти за допомогою {{provider}}",
        "link_text": "Ще не маєте облікового запису? Зареєструйтесь",
        "confirmation_text": "Перевірте свою електронну пошту для отримання посилання на підтвердження",
    },
    "sign_in": {
        "email_label": "Адреса електронної пошти",
        "password_label": "Ваш пароль",
        "email_input_placeholder": "Ваша адреса електронної пошти",
        "password_input_placeholder": "Ваш пароль",
        "button_label": "Увійти",
        "loading_button_label": "Вхід...",
        "social_provider_text": "Увійти за допомогою {{provider}}",
        "link_text": "Вже маєте обліковий запис? Увійдіть",
    },
    "magic_link": {
        "email_input_label": "Адреса електронної пошти",
        "email_input_placeholder": "Ваша адреса електронної пошти",
        "button_label": "Відправити магічне посилання",
        "loading_button_label": "Надсилання магічного посилання...",
        "link_text": "Надіслати лист із магічним посиланням",
        "confirmation_text": "Перевірте свою електронну пошту на наявність магічного посилання",
    },
    "forgotten_password": {
        "email_label": "Адреса електронної пошти",
        "password_label": "Ваш пароль",
        "email_input_placeholder": "Ваша адреса електронної пошти",
        "button_label": "Надіслати інструкції по скиданню пароля",
        "loading_button_label": "Надсилання інструкцій по скиданню пароля...",
        "link_text": "Забули пароль?",
        "confirmation_text": "Перевірте свою електронну пошту на наявність посилання для скидання пароля",
    },
    "update_password": {
        "password_label": "Новий пароль",
        "password_input_placeholder": "Ваш новий пароль",
        "button_label": "Оновити пароль",
        "loading_button_label": "Оновлення пароля...",
        "confirmation_text": "Ваш пароль був оновлений",
    },
    "verify_otp": {
        "email_input_label": "Адреса електронної пошти",
        "email_input_placeholder": "Ваша адреса електронної пошти",
        "phone_input_label": "Номер телефону",
        "phone_input_placeholder": "Ваш номер телефону",
        "token_input_label": "Токен",
        "token_input_placeholder": "Ваш Otp токен",
        "button_label": "Перевірити токен",
        "loading_button_label": "Вхід...",
    },
}