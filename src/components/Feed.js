import styled from "styled-components";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";
import {useLocation, useParams} from "react-router-dom";

function Feed({filter}) {
    const [posts, setPosts] = useState([]);
    const { category } = useParams();

    const location = useLocation();

    let currentPath = location.pathname;
    currentPath = currentPath.substring(1, currentPath.length)

    let postsLink = '/api/posts?'

    if (filter != null) {
        postsLink += `filter=${filter}&`
    }

    if (currentPath != null) {
        postsLink += `category=${currentPath}&`
    }

    useEffect(() => {
        instance.get(postsLink).then(response => {
            setPosts(response.data)
        })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });

    }, [filter, postsLink, category]);

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    return (
        <Root>
            {posts.length > 0 ? posts.map(post => (
                <Post key={post.id}>
                    <Title>{post.title}</Title>
                    <InfoWrapper>
                        <CreatedAt>{formatDate(post.created_at)}</CreatedAt>
                        <div>
                            <Category>#{post.category}</Category> <Category>#{post.country}</Category>
                        </div>
                    </InfoWrapper>
                    <Body>{post.body}</Body>
                </Post>
            )) : <PostsNotFound>Записей не найдено</PostsNotFound>}
        </Root>
    )
}

const Root = styled.div`
    margin-left: 244px;
    margin-right: 26px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`

const Post = styled.div`
    background-color: var(--gray);
    cursor: pointer;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
`

const PostsNotFound = styled.p`
    color: white;
    font-size: 24px;
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
    text-align: justify;
`

const Body = styled.div`
    font-weight: 300;
    font-size: 18px;
    color: var(--main-text-gray);
    margin-top: 15px;
    text-align: justify;
    width: 100%;
    white-space: break-spaces;
`

export default Feed;

