import styled from "styled-components";
import Container from "../ui/Container";
import Search from "../ui/Search";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {instance} from "../services/axios-instance";
import {useNavigate} from "react-router-dom";

function Header() {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = Cookies.get("news_token")
        if (token != null) {
            setAuth(true)
        } else {
            setAuth(false)
        }
    }, []);

    const [imgUrl, setImgUrl] = useState("/images/profile.png");

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

    const goToProfile = () => {
        navigate("/profile")
    }

    return (
        <>
            {auth != null &&
                <Root>
                    <Container>
                        <HeaderInner>
                            <Logo href={"/"}>News For You</Logo>
                            <Search/>
                            {auth ? <ProfileBtn src={imgUrl} href={"/profile"} onClick={goToProfile} /> :
                                <HeaderButton href={"/sign-in"}>Войти</HeaderButton>}
                        </HeaderInner>
                    </Container>
                </Root>
            }
        </>
    )
}

const Root = styled.div`
    height: 80px;
    width: 100%;
    background-color: var(--gray);
    display: flex;
    align-items: center;
`

const HeaderInner = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 220px auto max-content;
    gap: 24px;
`

const Logo = styled.a`
    user-select: none;
    font-weight: 500;
    font-size: 25px;
    color: var(--main-text-light-gray);
    text-decoration: none;
    line-height: 52px;
`

const ProfileBtn = styled.img`
    display: flex;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    //background-image: url("/images/profile.png");
    background-size: cover;
    cursor: pointer;
`

const HeaderButton = styled.a`
    text-decoration: none;
    display: flex;
    background-color: var(--main-dark-gray);
    color: var(--main-text-light-gray);
    height: 52px;
    width: 107px;
    text-align: center;
    line-height: 52px;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
    cursor: pointer;
    font-size: 20px;
`


export default Header;

