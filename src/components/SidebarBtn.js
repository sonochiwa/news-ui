import styled from "styled-components";
import {useLocation, useNavigate} from "react-router-dom";

function SidebarBtn({title}) {
    const navigate = useNavigate();

    function handleClick() {
        if (title==="All") {
            navigate(`/All`, {state: {filter: ''}});
            return
        }

        navigate(`/${title}`, {state: {filter: title}});
    }

    const location = useLocation();
    let currentPath = location.pathname;
    currentPath = decodeURIComponent(currentPath.substring(1, currentPath.length))

    return (
        <Root id={"sidebar_btn"} type="button" onClick={handleClick} style={
            currentPath === title  ? {outline: "2px solid #6c6c6c"}  : null}>
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

