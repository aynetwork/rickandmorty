import * as React from 'react';
import {Character} from '../../generated/graphql';
import './styles.css';
import Maybe from "graphql/tsutils/Maybe";

export interface CardProps {
    rick: Maybe<Character>
    morty: Maybe<Character>
}

const className = 'CardList';

const Cards: React.FC<CardProps> = ({ rick, morty }) => {
    return (<div className={className}>
        <div className={`${className}__container`}>
            <span className={`${className}__item`}>
                {!!rick && !!rick.image ? <img className={`${className}__image`} src={rick!.image!} alt=""/> : <span>Rick</span>}

            </span>
            <span className={`${className}__item`}>
                {!!morty && !!morty.image ? <img className={`${className}__image`} src={morty!.image!} alt=""/> : <span>Morty</span>}
           </span>
        </div>
    </div>)
};

export default Cards;

