import {Link, useRouteError} from "react-router-dom"
import {App} from "../lib/consts"


export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return <>
        <h2 className="fw-bold">Опаньки!</h2>

        <p>Схоже, що ви запитуєте сторінку, якої у нас немає</p>

        <p className="text-info font-monospace">
            Помилка: {error.status}
            <br/>
            Деталі: {error.statusText || error.data.message}
        </p>

        <p>Перехід на <Link to={App.HOME}>головну сторінку</Link> - теж непогана ідея</p>
    </>
}