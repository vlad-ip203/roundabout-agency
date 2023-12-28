import {Link} from "react-router-dom"
import {App} from "../../lib/consts"


export default function ForbiddenPage({referrer}) {
    return <>
        <h2 className="fw-bold">Ай-ай-ай!</h2>

        <p>Схоже, що ви запитуєте сторінку, яку у вас немає права переглядати</p>

        <p className="text-info font-monospace">
            Помилка: 403
            <br/>
            Деталі: {referrer}
        </p>

        <p>Якщо це не так, вам на <Link to={App.AUTH}>сторінку авторизації</Link></p>
    </>
}