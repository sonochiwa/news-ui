import styled from "styled-components";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";
import SidebarBtn from "./SidebarBtn";

function Feed() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        instance.get('/api/posts/').then(response => {
            setPosts(response.data)
        })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <Root>
            {posts.map(post => (
                <Post key={post.id}>
                    <Title>{post.title}</Title>
                    <Body>{post.body}</Body>
                </Post>
            ))}
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

