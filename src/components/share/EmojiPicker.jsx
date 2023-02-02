import { Face } from '@mui/icons-material'
import React, { useState } from 'react'
import './share.css'
import Picker from '@emoji-mart/react';

const EmojiPicker = (props) => {
    const [showPicker, setShowPicker] = useState(false);
    const [thisemoji, setThisEmoji] = useState([]);
    let style = showPicker ? ' block' : ' hidden';

    const IsshowPicker = () => setShowPicker(!showPicker);
    const selectEmoji = (e) => {
        const emojiCode = e.unified.split('-');
        let codesArray = [];
        emojiCode.forEach((e1) => codesArray.push('0x' + e1));
        const emoji = String.fromCodePoint(...codesArray);
        props.onChange(emoji);
        setThisEmoji([...thisemoji, emoji]);
    }

    // useEffect(() => {
    //     let emoji = thisemoji
    //     props.onChange(emoji);
    // },[thisemoji])
    
    return (
        <div className='emojiContainer'>
            <div className='emojiWrapper cursor-pointer' onClick={IsshowPicker}>
                <Face className='shareIcon' htmlColor='darkorange'></Face>
                <div className={'picker absolute z-10' + style}>
                    <Picker onEmojiSelect={selectEmoji}/>
                </div>
            </div>
        </div>
    )
}

export default EmojiPicker