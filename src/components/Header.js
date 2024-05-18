import styled from "styled-components";
import Container from "../ui/Container";
import Search from "../ui/Search";

function Header() {
    return (
        <Root>
            <Container>
                <HeaderInner>
                    <Logo href={"/"}>New For You</Logo>
                    <Search/>
                </HeaderInner>
            </Container>
        </Root>
    )
}

const Root = styled.div`
    height: 80px;
    width: 100%;
    background-color: var(--gray);
    display: flex;
    align-items: center;
`

const HeaderInner = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 220px auto;
    gap: 24px; 
    
    //position: relative;
    //left: -110px;
`

const Logo = styled.a`
    user-select: none;
    font-weight: 500;
    font-size: 25px;
    color: var(--main-text-light-gray);
    text-decoration: none;
    line-height: 52px;
`



export default Header;

