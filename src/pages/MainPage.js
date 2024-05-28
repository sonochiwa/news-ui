import Header from "../components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Container from "../ui/Container";
import Feed from "../components/Feed";

function MainPage() {
    return (
        <>
            <Header/>
            <ContainerWrapper>
                <Container>
                    <Content>
                        <Sidebar/>
                        <Feed/>
                    </Content>
                </Container>
            </ContainerWrapper>
        </>
    )
}

const ContainerWrapper = styled.div`
    display: flex;
`

const Content = styled.div`
    margin-top: 25px;
    display: flex;
`

export default MainPage;

