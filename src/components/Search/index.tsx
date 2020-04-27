import * as React from 'react';
import { useCharactersListQuery } from '../../generated/graphql';
import List
    // , { OwnProps }
    from './List';

interface OwnProps {
    search: string;
}

const ListContainer = ({search}: OwnProps) => {
    const { data, error, loading, refetch } = useCharactersListQuery({
        variables: {name: String(search)}
    });

    React.useEffect(() => {
        refetch();
    }, [search]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !data) {
        return <div>ERROR</div>;
    }

    return <List data={data}  />;
};

export default ListContainer;