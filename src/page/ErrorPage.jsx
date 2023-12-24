import {Link, useRouteError} from "react-router-dom"
import {App} from "../lib/consts"


export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return <>
        <h1>Опаньки!</h1>
        <p>Схоже, що ви запитуєте сторінку, якої у нас немає</p>

        <p className="text-info">
            Помилка: {error.status}
            <br/>
            Деталі: {error.statusText || error.data.message}
        </p>

        <p>Перехід на <Link to={App.ABOUT}>головну сторінку</Link> - теж непогана ідея</p>
    </>
}