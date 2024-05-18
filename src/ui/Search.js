import styled from "styled-components";

function Search() {
    return (
        <Root>
            <SearchImg className="svg" src="/images/icon-search.svg" draggable="false"/>
            <SearchInput placeholder="Поиск" size="32"/>
        </Root>
    )
}

const Root = styled.div`
    width: 100%;
    align-items: center;
    background-color: var(--main-dark-gray);
    border-radius: 10px;
    padding-left: 11px;
    height: 52px;
    display: flex;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0 20px 0 10px;
    background-color: transparent;
    color: white;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 20px;
`

const SearchImg = styled.img`
    display: block;
    color: var(--header-search-gray);
    width: 25px;
    height: 25px;
    line-height: 52px;
    fill: currentColor;
    transition: all .3s ease;
    user-select: none;
`

export default Search;
