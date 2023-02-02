import React from 'react'
import { TwitterTimelineEmbed } from 'react-twitter-embed'

const News = () => {
    return (
        <div className="breakingNews">
                <TwitterTimelineEmbed
                sourceType='profile'
                screenName='BBCBreaking'
                options={{ height: 400 }} />

            <br />

            {/* <TwitterTimelineEmbed
                sourceType='profile'
                screenName='ChelseaFC'
                options={{ height: 400 }} /> */}
        </div>
    )
}

export default News