import styled from "styled-components";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        instance.get('/api/posts').then(response => {
            setPosts(response.data)
        })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    return (
        <Root>
            {posts.map(post => (
                <Post key={post.id}>
                    <Title>{post.title}</Title>
                    <InfoWrapper>
                        <CreatedAt>{formatDate(post.created_at)}</CreatedAt>
                        <Category>#{post.category}</Category>
                    </InfoWrapper>
                    <Body>{post.body}</Body>
                </Post>
            ))}
        </Root>
    )
}

const Root = styled.div`
    //width: 100%;
    margin-left: 244px;
    display: flex;
    flex-direction: column;
    gap: 12px;
`

const Post = styled.div`
    //width: 100%;
    background-color: var(--gray);
    cursor: pointer;
    border-radius: 10px;
    padding: 15px;
`

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    
`

const CreatedAt = styled.p`
    color: #dadada;
    width: fit-content;
    margin-top: 10px;
`

const Category = styled.a`
    color: #c8f9b2;
    width: fit-content;
    margin-top: 10px;
`

const Title = styled.p`
    font-size: 21px;
    font-weight: 700;
    color: var(--main-text-light-gray);
    width: 100%;
    
`

const Body = styled.div`
    font-weight: 300;
    font-size: 18px;
    color: var(--main-text-gray);
    margin-top: 15px;
    text-align: justify;
    width: 100%;
    
`

export default Feed;

