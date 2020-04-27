import React from 'react';
import './App.css';
import List from './components/List';
import Cards from './components/Cards';
import Search from './components/Search';
import {Character} from "./generated/graphql";
import Maybe from "graphql/tsutils/Maybe";

function App() {

  let throttle: number;
  let searchTimeoutFlag: boolean = true;

  const [search, setSearch] = React.useState("");
  const [morty, setMorty] = React.useState<Maybe<Character>>({});
  const [rick, setRick] = React.useState<Maybe<Character>>({});

  //обрабатываем поисковую строку
  const handleSearchChange = React.useCallback(newSearch => {
      if (searchTimeoutFlag && newSearch.length > 2) {
          searchQuery(newSearch)
      }
  }, []);

  //
  const searchQuery = (newSearch:string)=>{
      throttle = window.setTimeout(function () {
          setSearch(newSearch);
          searchTimeoutFlag = true;
      }, 300);
  };

  return (
    <div className="App">
        <div className={"App__search my-2"}>
            <Search handleSearchParent={handleSearchChange} />
        </div>

        <div className={"App__list my-2"}>
            <List setRick={setRick} setMorty={setMorty} search={search}/>
        </div>

        <div className={"App__cards my-2"}>
            <Cards rick={rick} morty={morty}/>
        </div>
    </div>
  );
}

export default App;
