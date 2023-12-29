import React, {useState} from "react"
import {Form} from "react-bootstrap"
import {DB} from "../../index"
import {getSession, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"
import Avatar from "./Avatar"


export default function FormAvatar({size, url, onUpload}) {
    const [state] = useGlobalState()

    const [uploading, setUploading] = useState(false)

    async function uploadAvatar(event) {
        setUploading(true)

        let files = event.target.files
        if (!files || files.length === 0) {
            alert("Виберіть зображення, щоб використати як фото профілю")
            setUploading(false)
            return
        }

        const session = getSession(state)
        const {user} = session

        const file = files[0]
        const fileExt = file.name.split(".").pop()
        const fileName = `${Math.random()}.${fileExt}`
        const path = `${user.id}/${fileName}`

        Log.i("Uploading image with URL: " + path)
        const {error} = await DB.uploadAvatar(path, file)

        if (error) {
            //Notify user about a problem
            alert(error)
        } else {
            //Update profile properties
            onUpload(event, path)
        }

        setUploading(false)
    }

    return (
        <Form.Label htmlFor="pictureControl"
                    className="user-select-all">
            <Avatar size={size}
                    url={url}/>

            <Form.Control id="pictureControl"
                          className="d-none mt-3"
                          type="file"
                          onChange={uploadAvatar}
                          disabled={uploading}/>
        </Form.Label>
    )
}