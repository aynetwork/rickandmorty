import * as React from 'react';
import {Character} from '../../generated/graphql';
import './styles.css';
import Maybe from "graphql/tsutils/Maybe";



export interface OwnProps {
    data: Maybe<Character>[]
    onRemove: (id: number) => void
    banned: object
    handleClickRickMorty: (id: number) => void
}

const className = 'LaunchList';

const List: React.FC<OwnProps> = ({ data, onRemove, banned, handleClickRickMorty }) => {
    return (<div className={className}>
        <span className={`${className}__list`}>
            {!!data &&
            data.map(
                (character, i) =>
                    !!character && (
                        <span
                            key={i} className={`${className}__item`}>
                              <i className={`material-icons ${className}__close`}
                                 onClick={() => onRemove(Number(character.id))}>clear</i>
                             <img className={` materialboxed`} onClick={() => handleClickRickMorty(Number(character.id))} width={"150px"} src={character.image!} alt=""/>
                             <div>{character.name}</div>
                        </span>
                    ),
            )}
        </span>
    </div>)
};

export default List;

