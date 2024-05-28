import Header from "../components/Header";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import Container from "../ui/Container";
import Feed from "../components/Feed";
import {useState} from "react";

function MainPage() {
    const [filter, setFilter] = useState("")
    const handleFilter = (value) => {
        setFilter(value)
    }

    return (
        <>
            <Header onChange={handleFilter}/>
            <ContainerWrapper>
                <Container>
                    <Content>
                        <Sidebar/>
                        <Feed filter={filter}  />
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

