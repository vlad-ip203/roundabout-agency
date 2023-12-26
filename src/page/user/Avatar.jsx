import React, {useEffect, useState} from "react"
import {Form, Image} from "react-bootstrap"
import {DB} from "../../index"
import {getSession, useGlobalState} from "../../lib/context"
import {Log} from "../../lib/log"

export default function Avatar({size, url, onUpload}) {
    const [state] = useGlobalState()

    const [avatarUrl, setAvatarUrl] = useState(`https://via.placeholder.com/${size}`)
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        if (url)
            void downloadImage(url)
    }, [url])

    async function downloadImage(path) {
        Log.i("Downloading image with URL: " + path)
        const {data, error} = await DB.avatars()
            .download(path)

        if (error) {
            Log.e("Error downloading image: " + error.message)
            return
        }

        const url = URL.createObjectURL(data)
        setAvatarUrl(url)
    }

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
        const {error: uploadError} = await DB.avatars()
            .upload(path, file)

        if (uploadError) {
            alert(uploadError.message)
            setUploading(false)
            return
        }

        onUpload(event, path)

        setUploading(false)
    }

    return (
        <Form.Label htmlFor="pictureControl"
                    className="user-select-all">
            <Image className="rounded-circle mb-3 profile-picture"
                   height={size}
                   width={size}
                   src={avatarUrl}
                   alt="Фото профілю"/>

            <Form.Control id="pictureControl"
                          type="file"
                          className="d-none"
                          onChange={uploadAvatar}
                          disabled={uploading}/>
        </Form.Label>
    )
}