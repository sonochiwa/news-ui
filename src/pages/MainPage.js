import Header from "../components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Container from "../ui/Container";
import Feed from "../components/Feed";

function mainPage() {
    return (
        <>
            <Header/>
            <Container>
                <Content>
                    <Sidebar/>
                    <Feed />
                </Content>
            </Container>
        </>
    )
}

const Content = styled.div`
    margin-top: 25px;
    width: 100%;
    display: grid;
    grid-template-columns: 220px auto;
    gap: 24px;
`

export default mainPage;

