import axios from 'axios';

const API_URL = '/kanji/';

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

const deleteKanji = async (kanji, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + kanji, config)
        .catch(function (error) {
            if (error.response.data) {
                console.log(error.response.data)
            }
            })
    return response.data
}

// Get user kanji list 
const getKanjiList = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)
        .catch(function (error) {
            if (error.response.data) {
                console.log(error.response.data)
            }
            })
    return response.data
}

const kanjiService = {
    createKanji,
    getKanjiList,
    deleteKanji,
}

export default kanjiService