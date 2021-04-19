import axios from 'axios';
import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card'

const apiUrl = 'https://api.thecatapi.com/v1/images/search?limit=20&size=full'
const apiKey = 'd276cc96-cd0f-4753-8280-c1fea4ada1b2' // Don't steal please;

const apiConfig = {
    headers: {
        'x-api-key': apiKey
    }
}

function MainCats(props) {

    const [catImages, setCatImages] = useState([])

    let imageCount = 0;

    useEffect(() => {
        axios.get(apiUrl, apiConfig).then((res) => {
            console.log(res.data)
            let tempCatImages = []
            res.data.forEach(item => {
                tempCatImages.push(item.url)
            })
            setCatImages(tempCatImages);
        })
    }, [])

    const fetchMoreCats = () => {
        axios.get(apiUrl, apiConfig).then((res) => {
            console.log(res.data)
            let tempCatImages = []
            res.data.forEach(item => {
                tempCatImages.push(item.url)
            })
            setCatImages(tempCatImages);
            imageCount = 0;
        })
    }

    const outOfFrame = () => {
        imageCount += 1;
        if (imageCount === 20) {
            setCatImages([]);
        }
    }

    return (
        <div className='container'>
            <h1>🐱 Cats For You</h1>
            <div className='cardContainer'>
                {catImages.length > 0 ? catImages.map((item, index) =>
                    <TinderCard className='swipe' key={index.toString()} onCardLeftScreen={outOfFrame}>
                        <img src={item} className='card' alt={'Cat Image'} />
                    </TinderCard>
                ) : <div className='btnContainer'>
                    <button class="mui-button" onClick={fetchMoreCats}>
                        <div class="ripple"></div>
                        <p>MORE CATS!</p>
                    </button>
                </div>}
            </div>
        </div>
    );
}

export default MainCats;