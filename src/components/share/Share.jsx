import { Delete, Image } from '@mui/icons-material'
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './share.css'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable  } from 'firebase/storage';
import storage from '../../firebase';
import EmojiPicker from './EmojiPicker';
import { SendAction } from '../../status/SendSlice';

const Share = () => {
    const {user} = useSelector((store) => store.user);
    const shareInput = useRef();
    const [previewImage, setPreviewImage] = useState("");
    const [imageurl, setImageUrl] = useState("");
    const [delimg, setDelImg] = useState("");
    const [emoji, setEmoji] = useState('');
    const [uploading, setUploading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    let imageloading = false;
    //dispatch
    const dispatch = useDispatch();

    //上存及預視圖片
    const ImageUpload = (e) => {
        const file = e.target.files[0];
        let preview = new FileReader();
        preview.readAsDataURL(file);
        preview.onload = (display) => {
            setPreviewImage(display.target.result);
            document.getElementsByClassName('Preview')[0].style.display = 'block'
        }
        setDelImg(file);

        if(file.name) {
            const storageRef = ref(storage, 'posts/' + file.name);
            const uploadImage = uploadBytesResumable(storageRef, file);
            uploadImage.on(
                'state_changed',
                (snapshot) => {
                    imageloading = true;
                    setUploading(true);
                },
                (err) => {
                    imageloading = false;
                    setUploading(false);
                },
                () => {
                    imageloading = false;
                    getDownloadURL(ref(storage, 'posts/' + file.name)).then((url) => {
                        setImageUrl(url);
                    })
                    setUploading(false);
                }
            )
        }
    }

    //刪除圖片
    const handleClean = (e) => {
        setPreviewImage('');
        document.getElementsByClassName('Preview')[0].style.display = 'none'
        if(delimg.name) {
            const desertRef = ref(storage, 'posts/' + delimg.name);
            deleteObject(desertRef).then(() => {
                setDelImg('');
            }).catch((err) => {
                console.log(err)
            });
        };

    }
    
    //提交新的貼文
    const handleSubmit = async(e) => {
        e.preventDefault();

        const newPost = {
            userId: user.user._id,
            desc: shareInput.current.value,
            img: imageurl,
        };

        try {
            await axios.post('/posts', newPost);
            setPreviewImage('');
            document.getElementsByClassName('Preview')[0].style.display = 'none'
            shareInput.current.value = '';
            dispatch(SendAction());
        } catch (err) {
            console.log(err)
        }
    }

    //Emoji
    const onEmojiContent = (newIcon) => {
        const icon = newIcon.toString();
        let pretext = icon;
        pretext = pretext.toString().split(',');
        setEmoji(pretext);
    }

    useEffect(() => {
        shareInput.current.value = shareInput.current.value + emoji;
    },[emoji])

    //button for uploading
    useEffect(() => {
        if(uploading === true) {
            document.getElementById('shareButton').setAttribute('disabled', 'disabled');
            document.getElementById('shareButton').innerHTML = '傳送中';
        } else {
            document.getElementById('shareButton').removeAttribute('disabled');
            document.getElementById('shareButton').innerHTML = '傳送';
        }
    },[uploading])


    
  return (
    <div className='share w-full shadow-md shadow-[#65789f] rounded-[10px] bg-white'>
        <div className="shareWrapper p-2.5">
            <div className="shareTop flex">
                <div className='flex-[1.5]'>
                    <img src={user.user.profilePicture || '/assets/person/noAvatar.png'} alt="" className="shareProfileImg w-12 h-12 rounded-full object-cover mr-2.5" />
                </div>
                <textarea className='shareInput border-none flex-[10] focus:outline-none resize-none mt-3' ref={shareInput} placeholder='你想分享D咩' rows="5" wrap='100' maxLength='200'></textarea>
                <Delete className="cancel cursor-pointer mt-2" htmlColor='red' onClick={(e) => {handleClean(e)}}/>
            </div>
            <img src={previewImage || ""} alt="" className="Preview w-[90%] max-h-[600px] rounded-xl  hidden" />

            <hr className="shareHr m-5" />
            
            <form className="shareButtons flex items-center justify-between" onSubmit={(e) => handleSubmit(e)}>
                <div className="shareOptions flex ml-5">
                    <label className="shareOption" htmlFor='file'>
                        <Image className='shareIcon' htmlColor='green'/> 
                        <span className="shareOptionText">照片</span>
                        <input type='file' className='file hidden' id='file' accept='.png, .jpeg, .jpg' onChange={ImageUpload} />
                    </label>
                    <div className="shareOption">
                        <EmojiPicker onChange={onEmojiContent} />
                        <span className="shareOptionText">Emoji</span>
                    </div>
                </div>
                <button id='shareButton' className="shareButton" type='submit'>傳送</button>
            </form>
        </div>
    </div>
  )
}

export default Share