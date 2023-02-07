import React, { useEffect, useState } from 'react'
import storage from '../../../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import '../Profile.css'
import { useCookies } from 'react-cookie';
import { LoginSuccess } from '../../../status/UserSlice';

const ProfileImg = ({ pageUser, setClicked }) => {
    const { user } = useSelector((store) => store.user);
    const [previewImage, setPreviewImage] = useState("");
    const [imageurl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);
    const [cookies] = useCookies('token');
    const dispatch = useDispatch();

    const ImageUpload = async (e) => {

        const file = e.target.files[0];
        let preview = new FileReader();
        if (preview) {
            preview.readAsDataURL(file);
            preview.onload = (display) => {
                setPreviewImage(display.target.result);
            }
        }

        const storageRef = ref(storage, 'icon/' + file.name);
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
                await getDownloadURL(ref(storage, 'icon/' + file.name)).then((url) => {
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
                    profilePicture: imageurl
                }
                try {
                    await axios.put(`/users/${user.user._id}`, newImg)
                    const response = await axios.get(`/users/${user.user._id}`);
                    dispatch(LoginSuccess({user:response.data, token:cookies['token']}));
                    setClicked(false);
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
        if(uploading === true) {
            document.getElementById('confirm').setAttribute('disabled', 'disabled');
            document.getElementById('confirm').innerHTML = '傳送中';
        } else {
            document.getElementById('confirm').removeAttribute('disabled');
            document.getElementById('confirm').innerHTML = '確認變更';
        }
    },[uploading])


    return (
        <div className='profileImgContainer w-[90%] shadow-md shadow-[#65789f] rounded-[10px] bg-white mt-2 text-center m-auto'>
            <span className='picturedesc font-bold'>頭像變更</span>
            <label className="w-full" htmlFor='file'>
                <img src={previewImage ? previewImage : pageUser.profilePicture || '/assets/person/noAvatar.png'} alt="" className="profileUserImg cursor-pointer h-40 w-40 top-40 left-0 right-0 rounded-full m-auto border-white border-[3px] border-solid object-cover" />
                <input type='file' className='pro file hidden' id='file' accept='.png, .jpeg, .jpg' onChange={(e) => ImageUpload(e)} />
            </label>
            <button onClick={confirmChange} id='confirm' className='confirm'>確認變更</button>
        </div>
        
    )
}

export default ProfileImg