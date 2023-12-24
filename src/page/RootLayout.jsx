import {Outlet} from "react-router-dom"
import {Container} from "react-bootstrap"
import Header from "../component/Header"
import Footer from "../component/Footer"


export default function RootLayout() {
    return <>
        <Header/>

        <main className="mt-4">
            <Container>
                <Outlet/>
            </Container>
        </main>

        <Footer/>
    </>
}