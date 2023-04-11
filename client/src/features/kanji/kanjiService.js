import axios from 'axios';

const API_URL = '/';

const createKanji = async (kanjiData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post(API_URL, kanjiData, config)
        .catch(function (error) {
            if (error.response.data) {
                console.log(error.response.data)
            }
            })
    return response.data
}

const kanjiService = {
    createKanji,
}

export default kanjiService