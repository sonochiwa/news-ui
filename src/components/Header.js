import styled from "styled-components";
import Container from "../ui/Container";
import {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {instance} from "../services/axios-instance";
import {useNavigate} from "react-router-dom";

function Header({onChange, search}) {
    const [auth, setAuth] = useState(null);
    const [filter, setFilter] = useState("")

    const handleChange = (event) => {
        setFilter(event.target.value)

        if (event.target.value.length === 0) {
            onChange(event.target.value)
        }
    }

    const handleSubmit = (event) => {
        onChange(filter)
    }

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
            <Fix/>
            {auth != null &&
                <Root >
                    <Container id={"header_container"}>
                        <HeaderInner id={"header_inner"}>
                            <Logo id={"logo"} href={"/"}>News For You</Logo>
                            <Logo id={"logo2"} href={"/"}>HOME</Logo>
                            <>
                                <Search>
                                    <SearchImg className="svg" src="/images/icon-search.svg" draggable="false"/>
                                    <SearchInput placeholder="Поиск" size="32" onChange={handleChange}
                                                 onKeyDown={(event) => {
                                                     if (event.key === 'Enter' || event.keyCode == 32) {
                                                         handleSubmit(event)
                                                     }
                                                 }}/>
                                </Search>
                                <SearchButton id={"search_btn"} type={"submit"} onClick={handleSubmit}>Найти</SearchButton>
                            </>
                            {auth ? <ProfileBtn id={"profile_btn"} src={imgUrl} href={"/profile"} onClick={goToProfile}/> :
                                <HeaderButton href={"/sign-in"}>Войти</HeaderButton>}
                        </HeaderInner>
                    </Container>
                </Root>
            }
        </>
    )
}

const SearchButton = styled.button`
    outline: none;
    border: none;
    text-decoration: none;
    display: flex;
    background-color: #1a1a1a;
    color: var(--main-text-light-gray);
    height: 52px;
    text-align: center;
    line-height: 52px;
    border-radius: 0 10px 10px 0;
    padding-left: 25px;
    padding-right: 25px;
    margin-left: -13px;
    cursor: pointer;
    font-size: 20px;
`

const Search = styled.div`
    width: 100%;
    align-items: center;
    background-color: var(--main-dark-gray);
    border-radius: 10px 0 0 10px;
    padding-left: 11px;
    height: 52px;
    display: flex;
`

const SearchInput = styled.input`
    width: 100%;
    height: 100%;
    padding: 0 20px 0 10px;
    background-color: transparent;
    color: white;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 20px;
`

const SearchImg = styled.img`
    display: block;
    color: var(--header-search-gray);
    width: 25px;
    height: 25px;
    line-height: 52px;
    fill: currentColor;
    transition: all .3s ease;
    user-select: none;
`

const Fix = styled.div`
    height: 80px;
    width: 100%;
`

const Root = styled.div`
    position: fixed;
    top: 0;
    height: 80px;
    width: 100%;
    background-color: var(--gray);
    display: flex;
    align-items: center;
    outline: 2px solid #6c6c6c;
`

const HeaderInner = styled.div`
    position: relative;
    width: 100%;
    display: grid;
    grid-template-columns: 220px auto max-content max-content;
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
    background-color: white;
    cursor: pointer;
    object-fit: cover;
`

const HeaderButton = styled.a`
    text-decoration: none;
    display: flex;
    background-color: var(--main-dark-gray);
    color: var(--main-text-light-gray);
    height: 52px;
    text-align: center;
    line-height: 52px;
    border-radius: 10px;
    padding-left: 25px;
    padding-right: 25px;
    cursor: pointer;
    font-size: 20px;
`


export default Header;

