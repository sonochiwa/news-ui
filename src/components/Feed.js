import styled from "styled-components";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";

function Feed({filter, countries}) {

    const [posts, setPosts] = useState([]);
    const location = useLocation();
    let currentPath = location.pathname.substring(1, location.pathname.length);
    let postsLink = '/api/posts?';

    let user = Cookies.get('user')
    let is_admin = false
    try {
        let parsedUser = JSON.parse(user)

        if (parsedUser.is_admin === true) {
            is_admin = true
        }
    } catch {
        is_admin = false
    }


    if (filter != null) {
        postsLink += `filter=${filter}&`;
    }

    if (currentPath != null) {
        if (currentPath === "All") {
            postsLink += `category=&`;
        } else {
            postsLink += `category=${currentPath}&`;
        }
    }

    let countryCookies = Cookies.get('country');
    if (countryCookies != null && countryCookies !== 'all') {
        postsLink += `country=${countryCookies}&`;
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await instance.get(postsLink);
                const postsData = response.data;

                setPosts(postsData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchPosts();
    }, [filter, postsLink]);


    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }



    const deletePost = (id) => {
        instance.delete(`/api/posts/${id}`)
            .then(() => {
                window.location.reload();
            })
    }

    return (
        <Root id={"feed"}>
            {posts.length > 0 ? posts.map(post => (
                <Post id={"post"} key={post.id}>
                    <TitleWrapper>
                        <Title>{post.title}</Title>
                        {is_admin ? <Delete onClick={() => deletePost(post.id)}>❌</Delete> : <></>}
                    </TitleWrapper>
                    <InfoWrapper>
                        <CreatedAt>{formatDate(post.created_at)}</CreatedAt>
                        <RightWrapper>
                            <Category>#{post.category}</Category><Category>#{post.country}</Category>
                        </RightWrapper>
                    </InfoWrapper>
                    <Body>{post.body}</Body>
                </Post>
            )) : <PostsNotFound>Записей не найдено</PostsNotFound>}
        </Root>
    );
}

const RightWrapper = styled.div`
    display: flex;
    gap: 5px;
`

const Delete = styled.div`
    margin-left: 10px;
`

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

const Root = styled.div`
    margin-left: 244px;
    margin-right: 26px;
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 100%;
`;

const Post = styled.div`
    background-color: var(--gray);
    cursor: pointer;
    border-radius: 10px;
    padding: 15px;
    width: 100%;
`;

const PostsNotFound = styled.p`
    padding: 15px;
    color: white;
    font-size: 24px;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;
`;

const CreatedAt = styled.p`
    color: #dadada;
    width: fit-content;
    margin-top: 10px;
`;

const Category = styled.a`
    color: #c8f9b2;
    width: fit-content;
    margin-top: 10px;
`;

const Title = styled.p`
    font-size: 21px;
    font-weight: 700;
    color: var(--main-text-light-gray);
    width: 100%;
    text-align: justify;
`;

const Body = styled.div`
    font-weight: 300;
    font-size: 18px;
    color: var(--main-text-gray);
    margin-top: 15px;
    text-align: justify;
    width: 100%;
    white-space: break-spaces;
`;

export default Feed;
