import React, { useState, useEffect } from 'react';
import Header from "../components/Header";
import Container from "../ui/Container";
import styled from "styled-components";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {instance} from "../services/axios-instance";

function ProfilePage() {
    const [imgUrl, setImgUrl] = useState('/images/profile.png');

    useEffect(() => {
        instance.get("/api/users/me")
            .then(res => {
                const userData = JSON.stringify(res.data);
                Cookies.set('user', userData, {expires: 7});

                const userCookie = Cookies.get("user");
                const parsedUser = JSON.parse(userCookie);

                if (parsedUser['image_path'] !== null) {
                    setImgUrl(`${process.env.REACT_APP_DOMAIN}/images/${parsedUser['image_path']}`);
                }
            })
            .catch(error => {
                console.error("Ошибка при получении данных пользователя:", error);
            });
    }, []);

    const navigate = useNavigate();
    const logout = () => {
        Cookies.remove("news_token");
        navigate("/");
    };

    return (
        <>
            <Header/>
            <Container>
                <ProfileInner>
                    <ImgWrapper>
                        <ProfileImg src={imgUrl}/></ImgWrapper>
                    <LogoutBtn href={"/"} onClick={logout}>Выйти из аккаунта</LogoutBtn>
                </ProfileInner>
            </Container>
        </>
    )
}

const ProfileInner = styled.div`
    display: flex;
    margin-top: 24px;
    height: auto;
    justify-content: space-between;
`


const LogoutBtn = styled.a`
    text-decoration: none;
    background-color: #9b2b2b;
    color: var(--main-text-light-gray);
    height: 52px;
    text-align: center;
    line-height: 52px;
    border-radius: 10px;
    padding: 0 25px;
    cursor: pointer;
    font-size: 20px;
`

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 220px;
    height: 220px;
    overflow-y: hidden;
    border-radius: 5px;
`

const ProfileImg = styled.img`
    width: 100%;
`

export default ProfilePage;

