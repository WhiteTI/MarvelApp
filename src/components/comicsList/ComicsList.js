import './comicsList.scss';
import React, {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import {Link} from "react-router-dom";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state');
    }
}

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onComicsListLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicsListLoaded = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) ended = true;

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    const renderComics = (arr) => {
        const items = arr.map((item, i) => {
            const fitCheck = item.thumbnail.includes('image_not_available');
            const availability = item.price ? `${item.price}$` : 'Not available'

            return (
                <li className="comics__item" key={i}>
                    <Link to={`${item.id}`}>
                        <img src={item.thumbnail}
                             alt={item.title}
                             // style={fitCheck ? {objectFit: 'contain'} : {objectFit: 'cover'}}
                             className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{availability}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    return (
        <div className="comics__list">
            {setContent(process, () => renderComics(comicsList), newItemLoading)}
            <button onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: comicsEnded ? 'none' : 'block'}}
                    className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;