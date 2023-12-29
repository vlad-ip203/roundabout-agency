import {useEffect, useState} from "react"
import {Button, Col, Container, Image, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import Slider from "react-slick"
import {DB} from "../../index"
import {App} from "../../lib/consts"
import ExchangeDeclarationCard from "../catalog/declaration/ExchangeDeclarationCard"
import PurchaseDeclarationCard from "../catalog/declaration/PurchaseDeclarationCard"
import SaleDeclarationCard from "../catalog/declaration/SaleDeclarationCard"
import LogoBanner from "../logo/LogoBanner"
import {cardSliderSettings, imageSliderSettings, sliderImages} from "./config"
import styles from "./styles.module.css"


export default function HomePage() {
    const [saleDeclarations, setSaleDeclarations] = useState(null)
    const [exchangeDeclarations, setExchangeDeclarations] = useState(null)
    const [purchaseDeclarations, setPurchaseDeclarations] = useState(null)

    useEffect(() => {
        async function getData() {
            {
                const {error, data} = await DB.getAllSaleDeclarations()

                if (!error)
                    setSaleDeclarations(data.map((value, index) =>
                        <Container key={`sale${index}`} className="mr-4">
                            <SaleDeclarationCard declaration={value}/>
                        </Container>,
                    ))
            }
            {
                const {error, data} = await DB.getAllExchangeDeclarations()

                if (!error)
                    setExchangeDeclarations(data.map((value, index) =>
                        <Container key={`exchange${index}`} className="mr-4">
                            <ExchangeDeclarationCard declaration={value}/>
                        </Container>,
                    ))
            }
            {
                const {error, data} = await DB.getAllPurchaseDeclarations()

                if (!error)
                    setPurchaseDeclarations(data.map((value, index) =>
                        <Container key={`purchase${index}`} className="mr-4">
                            <PurchaseDeclarationCard declaration={value}/>
                        </Container>,
                    ))
            }
        }
        void getData()
    }, [])

    return <>
        <Row className="pb-5">
            <Col md={8}>
                <Container>
                    <Slider {...imageSliderSettings}>
                        {sliderImages.map((image, index) => (
                            <div key={index} className={styles.imageContainer}>
                                <Image src={image}/>
                            </div>
                        ))}
                    </Slider>
                </Container>
            </Col>

            <Col md={4} className="align-self-center">
                <LogoBanner/>

                <Link to={App.CATALOG}>
                    <Button variant="primary">Переглянути оголошення</Button>
                </Link>
            </Col>
        </Row>

        <Container fluid className="pb-5">
            <h2 className="text-center mb-4">Уже в каталозі</h2>

            <Slider {...cardSliderSettings}>
                {saleDeclarations && saleDeclarations}
            </Slider>
        </Container>

        <Container fluid className="pb-5">
            <h2 className="text-center mb-4">Готові обмінятися</h2>

            <Slider {...cardSliderSettings}>
                {exchangeDeclarations && exchangeDeclarations}
            </Slider>
        </Container>

        <Container fluid className="pb-5">
            <h2 className="text-center mb-4">У пошуку затишного кутка</h2>

            <Slider {...cardSliderSettings}>
                {purchaseDeclarations && purchaseDeclarations}
            </Slider>
        </Container>
    </>
}