import styled from "styled-components";
import {useNavigate} from "react-router-dom";

function SidebarBtn({title, tag}) {
    const navigate = useNavigate();

    // todo: заменить навигацию на фильтр для данных

    function handleClick() {
        // navigate(`/${tag}`);
    }

    return (
        <Root type="button" onClick={handleClick}>
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
`

export default SidebarBtn;

