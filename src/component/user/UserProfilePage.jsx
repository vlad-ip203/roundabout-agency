import React, {useEffect, useState} from "react"
import {Button, Col, Container, Form, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {DB} from "../../index"
import {App, Strings} from "../../lib/consts"
import {getSession, reload, useGlobalState} from "../../lib/context"
import {signOut} from "../../lib/db/auth/auth"
import {Log} from "../../lib/log"
import FormAvatar from "./FormAvatar"


export default function UserProfilePage() {
    const [state] = useGlobalState()
    const session = getSession(state)

    const navigate = useNavigate()

    const [loading, setLoading] = useState(true)
    const [avatarURL, setAvatarURL] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        //User not authorized, return to auth page
        if (!session)
            return navigate(App.AUTH)

        let ignore = false

        async function getProfile() {
            setLoading(true)

            const {user} = session

            const {error, data} = await DB.getProfile(user.id)

            if (!ignore)
                if (error) {
                    //Notify user about a problem
                    alert(error)
                } else if (data) {
                    //Update profile properties
                    setAvatarURL(data.avatar_url)
                    setName(data.name)
                    setEmail(user.email)
                    setPhone(data.phone)
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

        Log.v("Updating user profile")
        setLoading(true)

        const {user} = session

        const updates = {
            updated_at: new Date(),
            avatar_url: avatarURL,
            name: name,
            phone: phone,
        }

        //Update profile data
        const {error} = await DB.updateProfile(user.id, updates)
        if (error) {
            //Notify user about a problem
            alert(error)
        } else {
            //Update profile properties
            //setAvatarURL(avatarURL)
            reload()
        }

        setLoading(false)
    }

    const onNameChange = (e) => setName(e.target.value)
    const onPhoneChange = (e) => setPhone(e.target.value)
    const onPictureChange = (e, path) => setAvatarURL(path)

    return <>
        <h2 className="fw-bold">{Strings.USER_PROFILE}</h2>

        <Row>
            <Col md={{span: 6, offset: 3}}>
                <Form onSubmit={updateProfile}>
                    <Container className="mb-3 text-center">
                        <FormAvatar size={150}
                                    url={avatarURL}
                                    onUpload={onPictureChange}/>
                    </Container>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="nameControl"
                                    className="mb-2">Ім'я</Form.Label>
                        <Form.Control id="nameControl"
                                      type="text"
                                      placeholder="Введіть ваше ім'я"
                                      value={name}
                                      onChange={onNameChange}
                                      disabled={loading}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="emailControl"
                                    className="mb-2">Адреса електронної пошти</Form.Label>
                        <Form.Control id="emailControl"
                                      type="email"
                                      placeholder="Ваш метод входу не надав поштової скриньки"
                                      value={email}
                                      disabled={true}/>
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label htmlFor="phoneControl"
                                    className="mb-2">Номер телефону</Form.Label>
                        <Form.Control id="phoneControl"
                                      type="text"
                                      placeholder="Введіть номер телефону"
                                      value={phone}
                                      onChange={onPhoneChange}
                                      disabled={loading}/>
                    </Form.Group>

                    <Row className="text-center">
                        <Col>
                            <Button className="w-100"
                                    variant="primary"
                                    type="submit"
                                    disabled={loading}>
                                {loading ? "Завантаження..." : "Зберегти"}
                            </Button>
                        </Col>

                        <Col>
                            <Button className="w-100"
                                    variant="secondary"
                                    type="button"
                                    onClick={signOut}
                                    disabled={loading}>
                                {Strings.SIGN_OUT}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
        </Row>
    </>
}