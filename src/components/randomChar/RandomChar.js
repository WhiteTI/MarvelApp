import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import setContent from "../../utils/setContent";

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [])


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const upgradeChar = () => {
        updateChar()
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main" onClick={upgradeChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, homepage, thumbnail, wiki} = data;
    const fitCheck = thumbnail?.includes('image_not_available');

    return (
        <div className="randomchar__block">
            <img src={thumbnail}
                 style={fitCheck ? {objectFit: 'contain'} : {objectFit: 'cover'}}
                 alt="Random character"
                 className="randomchar__img"
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? `${description.slice(0, 180)}...` : 'There is no description of this character!'}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;