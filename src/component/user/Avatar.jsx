import React, {useEffect, useState} from "react"
import {Image} from "react-bootstrap"
import {DB} from "../../index"
import {Log} from "../../lib/log"


export default function Avatar({size, url}) {
    const [avatarUrl, setAvatarUrl] = useState(`https://via.placeholder.com/${size}`)

    useEffect(() => {
        if (url)
            void downloadImage(url)
    }, [url])

    async function downloadImage(path) {
        Log.i("Downloading image with URL: " + path)

        const {error, url} = await DB.getAvatarUrl(path)

        if (error) {
            //Notify user about a problem
            alert(error)
        } else {
            //Update profile properties
            setAvatarUrl(url)
        }
    }

    return <Image className="rounded-circle profile-picture"
                  height={size}
                  width={size}
                  src={avatarUrl}
                  alt="Фото профілю"/>
}