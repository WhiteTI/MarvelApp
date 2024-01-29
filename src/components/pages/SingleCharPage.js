import './singleComic.scss';

import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SingleCharPage = () => {
    const {id} = useParams();
    const [char, setChar] = useState(null);
    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [id])

    const updateComic = () => {
        clearError();
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
            <Link to='/comics' className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharPage;