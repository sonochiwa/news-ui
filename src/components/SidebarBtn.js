import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";

function SidebarBtn({title, tag}) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`/${tag}`, {state: {filter: tag}});
    }

    const location = useLocation();
    let currentPath = location.pathname;
    currentPath = currentPath.substring(1, currentPath.length)

    return (
        <Root type="button" onClick={handleClick} style={currentPath === tag ? {outline: "2px solid #6c6c6c"} : null}>
            {title}
        </Root>
    )
}

const Root = styled.button`
    display: block;
    line-height: 46px;
    width: 210px;
    border: 0;
    border-radius: 10px;
    font-size: 18px;
    color: var(--main-text-light-gray);
    background-color: var(--gray);
    padding-left: 12px;
    text-align: start;
    user-select: none;
    cursor: pointer;
    margin: 2px;
`

export default SidebarBtn;

