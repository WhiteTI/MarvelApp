import './singleComic.scss';

import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import {Helmet} from "react-helmet";
import setContent from "../../utils/setContent";

const SingleComicsPage = () => {
    const {comicsId} = useParams();
    const [comics, setComics] = useState(null);
    const {getComics, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicsId])

    const updateComic = () => {
        clearError();
        getComics(comicsId)
            .then(onComicLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onComicLoaded = (comic) => {
        setComics(comic);
    }

    return (
        <>
            {setContent(process, View, comics)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, pageCount, price, thumbnail} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicsPage;