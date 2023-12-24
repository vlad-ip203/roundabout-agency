import {Container} from "react-bootstrap"
import Footer from "../component/Footer"
import Header from "../component/Header"


export default function RootLayout({children}) {
    return <>
        <Header/>

        <main className="mt-4">
            <Container>
                {children}
            </Container>
        </main>

        <Footer/>
    </>
}