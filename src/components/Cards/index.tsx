import * as React from 'react';
import {useEffect, useState} from 'react';
import {Character, Characters, useCharactersListQuery} from '../../generated/graphql';
import List from './List';
import Maybe from "graphql/tsutils/Maybe";
import {IBanned} from "../../interfaces/IBanned";

interface OwnProps {
    search: string,
    banned: IBanned
}

let f:Number[] = [];

const ListContainer = ({search, banned}: OwnProps) => {

    const [characters, setCharacters] = useState<Maybe<Character>[]>([]);

    const {data, error, loading, refetch} = useCharactersListQuery({
        variables: {name: String(search)},
        onCompleted: (data)=>{
            setCharacters(data.characters!.results!)
        }
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }


    const removeHandler = (id : number) => {
        banned = Object.assign({[id]:id}, banned);
        f.push(id)
        console.log("Исключенные id : " , banned)
        console.log("Исключенные id (array) : " , f)

        const filtered:Maybe<Character>[] = characters.filter((elem:Maybe<Character>)=>{
                return !!elem && !banned[elem.id!];
        });

        setCharacters(filtered)
    }

    return <List data={characters} banned={banned} onRemove={removeHandler}/>;
};

export default ListContainer;