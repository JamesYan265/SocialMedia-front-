import React from 'react'
import CoverImg from './edit/CoverImg'
import ProfileImg from './edit/ProfileImg'

const Edit = ({pageUser, setClicked}) => {
    return (
        <div className='profileImg flex-[6] border-l-4 border-dashed '>
            <div className='profileImgWrapper m-2'>
                <ProfileImg pageUser={pageUser} setClicked={setClicked}/>
                <CoverImg pageUser={pageUser} setClicked={setClicked}/>
            </div>
        </div>
    )
}

export default Edit