import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=e4f830aef934ec12c5752189a881bb74';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const result = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return result.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const result  = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(result.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const getAllComics = async (offset = _baseOffset) => {
        const result = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return result.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const result = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(result.data.results[0])
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            price: comics.prices[0].price,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            images: comics.images.path + '.' + comics.images.extension
        }
    }

    return {
        process,
        setProcess,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComics,
        getCharacterByName,
        clearError
    }
}

export default useMarvelService;