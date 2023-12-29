import React from "react"
import {Container} from "react-bootstrap"
import Avatar from "./Avatar"


export default function ProfilePill({profile}) {
    return (
        <Container className="align-items-center">
            <Avatar size={36}
                    url={profile.avatar_url}/>
            {" "}
            <span>{profile.name}</span>
        </Container>
    )
}