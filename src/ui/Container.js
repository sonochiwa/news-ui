import styled from "styled-components";

const Container = styled.div`
    //min-width: 760px;
    min-width: 340px;
    
    width: 100%;
    max-width: 914px;
    margin: 0 auto;
    padding: 0 15px;

    @media (max-width: 500px) {
        padding: 0 0;
    }
`

export default Container;
