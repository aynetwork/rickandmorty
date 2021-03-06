import * as React from 'react';
import './styles.css';


interface OwnProps {
    handleSearchParent: (search: string) => void;
}

const Search:React.FC<OwnProps> = ({handleSearchParent}: OwnProps) => {
    return <input type={"text"} className={"Search"} onChange={e => handleSearchParent(e.target.value)}  />;
};

export default Search;