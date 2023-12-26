// noinspection JSUnresolvedReference

import React, {useEffect, useState} from "react"
import {Button, Col, Container, Form, Image, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {DB} from "../../index"
import {signOut} from "../../lib/auth/auth"
import {App, Strings} from "../../lib/consts"
import {getSession, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"


export default function ProfilePage() {
    const [state] = useGlobalState()
    const session = getSession(state)

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [avatarURL, setAvatarURL] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        console.log("useEffect", session)
        //User not authorized, return to auth page
        if (!session)
            return navigate(App.AUTH)

        let ignore = false

        async function getProfile() {
            setLoading(true)
            console.log("getProfile", session)
            const {user} = session

            //Query profile data
            const {data, error} = await DB.profiles()
                .select("name, phone, avatar_url")
                .eq("id", user.id)
                .single()

            if (!ignore) {
                if (error) {
                    Log.w("Error getting profile data: " + error)
                    return
                } else if (data) {
                    //TODO 25.12.2023: Add picture as URL
                    setAvatarURL(data.avatar_url)
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
    }, [navigate, session])

    async function updateProfile(event) {
        event.preventDefault()

        setLoading(true)

        const {user} = session

        const updates = {
            updated_at: new Date(),
            avatar_url: avatarURL,
            name: name,
            phone: phone,
        }

        //Update profile data
        const {error} = await DB.profiles()
            .update(updates)
            .eq("id", user.id)

        if (error) {
            alert(error.message)
        } else {
            //TODO 26.12.2023: What???
            //setAvatar(avatarURL)
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
                //setAvatar(reader.result)
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
                                   src={avatarURL || "https://via.placeholder.com/150"}/>

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