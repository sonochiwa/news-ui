import styled from "styled-components";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";
import {useLocation} from "react-router-dom";
import Cookies from "js-cookie";

function Feed({filter, countries}) {
    const [posts, setPosts] = useState([]);
    const [translatedPosts, setTranslatedPosts] = useState({});
    const location = useLocation();
    let currentPath = location.pathname.substring(1, location.pathname.length);
    let postsLink = '/api/posts?';

    if (filter != null) {
        postsLink += `filter=${filter}&`;
    }

    if (currentPath != null) {
        postsLink += `category=${currentPath}&`;
    }

    let countryCookies = Cookies.get('country');
    if (countryCookies !== 'all') {
        postsLink += `country=${countryCookies}&`;
    }

    let lang = 'ru'
    const user = Cookies.get('user')
    if (user !== null) {
        if (JSON.parse(user).language) {
            lang = JSON.parse(user).language
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await instance.get(postsLink);
                const postsData = response.data;
                const translatedPostsData = {};
                const userLanguage = lang;

                for (const post of postsData) {
                    const cachedTitleTranslation = localStorage.getItem(`title_translation_${post.id}_${userLanguage}`);
                    const cachedBodyTranslation = localStorage.getItem(`body_translation_${post.id}_${userLanguage}`);

                    if (cachedTitleTranslation && cachedBodyTranslation) {
                        translatedPostsData[post.id] = {
                            title: JSON.parse(cachedTitleTranslation),
                            body: JSON.parse(cachedBodyTranslation),
                        };
                    } else {
                        const translatedTitle = await translateText(post.title, userLanguage);
                        const translatedBody = await translateText(post.body, userLanguage);
                        translatedPostsData[post.id] = {
                            title: translatedTitle,
                            body: translatedBody,
                        };
                        localStorage.setItem(`title_translation_${post.id}_${userLanguage}`, JSON.stringify(translatedTitle));
                        localStorage.setItem(`body_translation_${post.id}_${userLanguage}`, JSON.stringify(translatedBody));
                    }
                }

                setPosts(postsData);
                setTranslatedPosts(translatedPostsData);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchPosts();
    }, [filter, postsLink]);

    const translateText = async (text, targetLanguage) => {
        const res = await fetch("http://92.124.138.138:5000/translate", {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto",
                target: targetLanguage,
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        return data.translatedText;
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    return (
        <Root>
            {posts.length > 0 ? posts.map(post => (
                <Post key={post.id}>
                    <Title>{translatedPosts[post.id] ? translatedPosts[post.id].title : post.title}</Title>
                    <InfoWrapper>
                        <CreatedAt>{formatDate(post.created_at)}</CreatedAt>
                        <div>
                            <Category>#{post.category}</Category> <Category>#{post.country_tag}</Category>
                        </div>
                    </InfoWrapper>
                    <Body>{translatedPosts[post.id] ? translatedPosts[post.id].body : post.body}</Body>
                </Post>
            )) : <PostsNotFound>Записей не найдено</PostsNotFound>}
        </Root>
    );
}

const Root = styled.div`
    margin-left: 244px;
    margin-right: 26px;
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
    color: white;
    font-size: 24px;
`;

const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
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
