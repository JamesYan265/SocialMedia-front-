import React, { useEffect, useState } from 'react'
import storage from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../Profile.css'



const CoverImg = ({ pageUser, setClicked }) => {
    const { user } = useSelector((store) => store.user);
    const [previewImage, setPreviewImage] = useState("");
    const [imageurl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    const ImageUploading = async (e) => {
        const file = e.target.files[0];
        let preview = new FileReader();
        if (preview) {
            preview.readAsDataURL(file);
            preview.onload = (display) => {
                setPreviewImage(display.target.result);
            }
        }

        const storageRef = ref(storage, 'personCover/' + file.name);
        const uploadImage = uploadBytesResumable(storageRef, file);
        uploadImage.on(
            'state_changed',
            (snapshot) => {
                setUploading(true);
            },
            (err) => {
                setUploading(false);
            },
            async () => {
                await getDownloadURL(ref(storage, 'personCover/' + file.name)).then((url) => {
                    setImageUrl(url);
                    setUploading(false);
                });
            },
        )
    }

    const confirmChange = () => {
        const uploadhandler = async () => {
            if (uploading === false) {
                const newImg = {
                    userId: user.user._id,
                    coverPicture: imageurl
                }
                try {
                    await axios.put(`/users/${user.user._id}`, newImg);
                    console.log('已完成更新');
                    setClicked(false)
                } catch (err) {
                    console.log(err);
                }
            } else {
                console.log(imageurl || 'No url');
                console.log(uploading);
            }
        }
        uploadhandler();
    }

    //button for uploading
    useEffect(() => {
        if (uploading === true) {
            document.getElementById('coverConfirm').setAttribute('disabled', 'disabled');
        } else {
            document.getElementById('coverConfirm').removeAttribute('disabled');
        }
    }, [uploading])


    return (
        <div className='profileImgContainer w-[90%] shadow-md shadow-[#65789f] rounded-[10px] bg-white mt-2 text-center m-auto'>
            <span className='picturedesc font-bold'>橫幅圖片變更</span>
            <label className="w-full" htmlFor='coverfile'>
                <img src={previewImage ? previewImage : pageUser.coverPicture || '/assets/post/8.png'} alt="" className="profileUserImg cursor-pointer h-60 w-[95%] m-auto rounded-[10px] border-white border-[3px] border-solid object-cover" />
                <input type='file' className='cover file hidden' id='coverfile' accept='.png, .jpeg, .jpg' onChange={(e) => ImageUploading(e)} />
                <button onClick={confirmChange} id='coverConfirm' className='confirm'>確認變更</button>
            </label>
        </div>
    )
}

export default CoverImg