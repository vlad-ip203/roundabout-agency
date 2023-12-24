import {useRouteError, Link} from "react-router-dom"
import {Container} from "react-bootstrap"
import Header from "../component/Header"
import Footer from "../component/Footer"
import {App} from "../lib/consts"


export default function ErrorPage() {
    const error = useRouteError()
    console.error(error)

    return <>
        <Header/>

        <main className="mt-4">
            <Container>
                <h1>Опаньки!</h1>
                <p>Схоже, що ви запитуєте сторінку, якої у нас немає</p>

                <p className="text-info">
                    Помилка: {error.status}
                    <br/>
                    Деталі: {error.statusText || error.data.message}
                </p>

                <p>Перехід на <Link to={App.ABOUT}>головну сторінку</Link> - теж непогана ідея</p>
            </Container>
        </main>

        <Footer/>
    </>
}