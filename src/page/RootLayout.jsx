import {Container} from "react-bootstrap"
import Footer from "../component/Footer"
import Header from "../component/Header"


export default function RootLayout({children}) {
    return <>
        <Header/>

        <main className="m-3 mt-4 mb-5">
            <Container>
                {children}
            </Container>
        </main>

        <Footer/>
    </>
}