import styled from "styled-components";

function Feed() {
    return (
        <Root>
            <Post>
                <Title>Lorem ipsum dolor</Title>
                <Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vestibulum ex massa, a fringilla
                    augue consectetur a. In varius velit at arcu eleifend, quis lobortis ipsum scelerisque. Nam
                    dignissim sit amet.
                </Body>
            </Post>
        </Root>
    )
}

const Root = styled.div`
    width: 100%;
`

const Post = styled.div`
    background-color: var(--gray);
    width: 640px;
    max-height: 550px;
    cursor: pointer;
    border-radius: 10px;
    padding: 15px;
`

const Title = styled.p`
    font-size: 21px;
    font-weight: 700;
    color: var(--main-text-light-gray);
`

const Body = styled.div`
    font-weight: 300;
    font-size: 18px;
    color: var(--main-text-gray);
    margin-top: 15px;
    text-align: justify;
`

export default Feed;

