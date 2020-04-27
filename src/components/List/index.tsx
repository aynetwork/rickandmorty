import * as React from 'react';
import {useState} from 'react';
import {Character, useCharactersListQuery} from '../../generated/graphql';
import List from './List';
import Maybe from "graphql/tsutils/Maybe";
import {IBanned} from "../../interfaces/IBanned";

interface OwnProps {
    search: string,
    setRick: (person: Maybe<Character>) => void
    setMorty: (person: Maybe<Character>) => void
}

//забаненные персонажи
let banned: IBanned = {};

const ListContainer = ({search, setRick, setMorty}: OwnProps) => {

    const [characters, setCharacters] = useState<Maybe<Character>[]>([]);

    //запрос за персонажами
    const {data, error, loading} = useCharactersListQuery({
        variables: {name: String(search)},
        onCompleted: (data)=>{

            const filtered:Maybe<Character>[] = data.characters!.results!.filter((elem:Maybe<Character>)=>{
                return !!elem && !banned[elem.id!];
            });

            setCharacters(filtered)
        }
    });

    //удаляем персонажа из поиска
    const removeHandler = (id : number) => {
        banned = Object.assign({[id]:id}, banned);
        const filtered:Maybe<Character>[] = characters.filter((elem:Maybe<Character>)=>{
            return !!elem && !banned[elem.id!];
        });
        setCharacters(filtered)
    };

    //обрабатываем клик по картинке
    const handleClickRickMorty = (id : number) => {

        let item: Maybe<Character>;

        for(let i=0; i<characters.length; i++){
            if (id === Number(characters[i]!.id)) {
                item = characters[i]
            }
        }

        //found rick
        if (item!.name!.search(/rick/ig) > -1) {
            setRick(item)
        }

        //found morty
        if (item!.name!.search(/morty/ig) > -1) {
            setMorty(item)
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return <List
        data={characters}
        handleClickRickMorty={handleClickRickMorty}
        banned={banned}
        onRemove={removeHandler}
    />;
};

export default ListContainer;