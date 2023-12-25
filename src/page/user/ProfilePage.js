// noinspection JSUnresolvedReference

import React, {useEffect, useState} from "react"
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {SUPABASE} from "../../index"
import {signOut} from "../../lib/auth/auth"
import {App, Strings} from "../../lib/consts"
import {getSession, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"


export default function ProfilePage() {
    const [state] = useGlobalState()
    const session = getSession(state)

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [picture, setPicture] = useState(null)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        console.log("useEffect", session)
        //User not authorized
        if (!session)
            return

        let ignore = false

        async function getProfile() {
            setLoading(true)
            console.log("getProfile", session)
            const {user} = session

            const {data, error} = await SUPABASE
                .from("profiles")
                .select("name, phone, picture")
                .eq("id", user.id)
                .single()

            if (!ignore) {
                if (error) {
                    Log.w("Error getting profile data: " + error)
                    return
                } else if (data) {
                    setPicture(data.picture)
                    setName(data.name)
                    setEmail(user.email)
                    setPhone(data.phone)
                }
            }

            setLoading(false)
        }
        void getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    useEffect(() => {
        //User not authorized, return to auth page
        console.log("ProfilePage", session)
        if (!session)
            return navigate(App.AUTH)
    }, [navigate, session])

    async function updateProfile(event) {
        event.preventDefault()

        setLoading(true)
        console.log("updateProfile", session)
        const {user} = session

        const updates = {
            id: user.id,
            updated_at: new Date(),
            picture,
            name,
            phone,
        }

        const {error} = await SUPABASE
            .from("profiles")
            .upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            //TODO 25.12.2023: setPictureURL(pictureURL)
        }
        setLoading(false)
    }

    const onNameChange = (e) => setName(e.target.value)
    const onPhoneChange = (e) => setPhone(e.target.value)
    const onPictureChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPicture(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return <>
        <h2 className="fw-bold">{Strings.NAV_PROFILE}</h2>

        <Row>
            <Col md={{span: 6, offset: 3}}>
                <Form onSubmit={event => updateProfile(event)}>
                    <Container className="text-center">
                        <Form.Label htmlFor="pictureControl"
                                    className="user-select-all">
                            <Image className="rounded-circle mb-3 profile-picture"
                                   alt="Профільне фото"
                                   src={picture || "https://via.placeholder.com/150"}/>

                            <Form.Control id="pictureControl"
                                          type="file"
                                          className="d-none"
                                          onChange={onPictureChange}/>
                        </Form.Label>
                    </Container>

                    <Form.Group>
                        <Form.Label htmlFor="nameControl">Ім'я</Form.Label>
                        <Form.Control id="nameControl"
                                      type="text"
                                      placeholder="Введіть ваше ім'я"
                                      value={name}
                                      onChange={onNameChange}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="emailControl">Адреса електронної пошти</Form.Label>
                        <Form.Control id="emailControl"
                                      type="email"
                                      placeholder="Ваш метод входу не надав поштової скриньки"
                                      value={email}
                                      disabled={true}/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label htmlFor="phoneControl">Номер телефону</Form.Label>
                        <Form.Control id="phoneControl"
                                      type="text"
                                      placeholder="Введіть номер телефону"
                                      value={phone}
                                      onChange={onPhoneChange}/>
                    </Form.Group>

                    <Button variant="primary"
                            type="submit"
                            disabled={loading}>
                        {loading ? "Завантаження..." : "Зберегти"}
                    </Button>
                    <Button variant="secondary"
                            type="button"
                            onClick={signOut}>
                        {Strings.SIGN_OUT}
                    </Button>
                </Form>
            </Col>
        </Row>
    </>
}