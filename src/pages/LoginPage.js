import styled from "styled-components";
import {useState} from "react";
import {instance} from "../services/axios-instance";
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';

function LoginPage() {
    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const signIn = () => {
        instance.post("/auth/sign-in", {login: login, password: password})
            .then(res => {
                if (res.status === 200) {
                    Cookies.set('news_token', res.data["token"], {expires: 7, path: ''});
                    Cookies.set('country', 'all', {expires: 7, path: ''});
                    navigate('/');
                    return instance.get("/api/users/me"); // Возвращаем новый Promise
                }
            })
            .then(res => {
                if (res.status === 200) {
                    const userData = JSON.stringify(res.data);
                    Cookies.set('user', userData, { expires: 7 });
                }
            })
            .catch(error => {
                console.error('Произошла ошибка:', error.message);
                setHasError(true);
            });
    }


    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            signIn()
        }
    };

    return (
        <Root id={"login"}>
            <Header href={"/"}>
                <Img src="/images/close-svgrepo-com.svg" alt="logo"/>
            </Header>
            <Content onKeyDown={handleKeyPress} onChange={() => setHasError(false)}>
                <Logo>N4Y</Logo>
                <TextAuth>Вход в аккаунт</TextAuth>
                <Authorization id={"auth"}>
                    <Input id={"profile_input"} placeholder={"Почта"} onChange={(e) => setLogin(e.target.value)} value={login}/>
                    <Input id={"profile_input"} placeholder={"Пароль"} type={"password"} onChange={(e) => setPassword(e.target.value)}
                           value={password}/>
                    <GoToRegisterText>
                        Нет аккаунта? <GoToRegisterLink href={"/sign-up"}>Зарегистрироваться</GoToRegisterLink>
                    </GoToRegisterText>
                    {hasError ? <Error>Не удалось войти в аккаунт</Error> : null}
                </Authorization>
                <AuthBtn onClick={signIn}>Войти</AuthBtn>
            </Content>
        </Root>
    )
}

const Root = styled.div`
    width: 520px;
    background-color: var(--gray);
    border-radius: 12px;
    padding: 20px;
    user-select: none;
    animation: auth-enter .5s ease;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    outline: 2px solid rgba(255, 255, 255, 0.24);

`

const Header = styled.a`
    height: 20px;
    display: flex;
    justify-content: flex-end;
`

const Content = styled.form`
    display: grid;
    justify-items: center;
    position: relative;
`

const Logo = styled.div`
    font-weight: 600;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 25px;
    width: 65px;
    height: 65px;
    background-color: var(--main-text-light-gray);
    color: var(--gray);
    border-radius: 10px;
`

const TextAuth = styled.div`
    color: var(--main-text-light-gray);
    font-size: 26px;
    text-align: center;
    margin-top: 20px;
`

const Authorization = styled.div`
`

const AuthBtn = styled.div`
    margin-top: 25px;
    background-color: var(--color-href);
    color: var(--main-text-light-gray);
    border-radius: 10px;
    font-size: 22px;
    border: none;
    width: 350px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    cursor: pointer;
`

const Input = styled.input`
    width: 480px;
    height: 50px;
    border-radius: 10px;
    display: block;
    padding: 0 20px;
    background-color: var(--main-dark-gray);
    color: var(--main-text-light-gray);
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 20px;
    margin-top: 20px;
`

const Img = styled.img`
    cursor: pointer;
    width: 20px;
    height: 20px;
`

const GoToRegisterText = styled.div`
    margin-top: 20px;
    color: var(--main-text-light-gray);
    font-size: 16px;
    text-align: center;
`

const GoToRegisterLink = styled.a`
    color: var(--color-href);
    text-decoration: none;
    cursor: pointer;
`

const Error = styled.p`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: -10px;
    color: red;
`

export default LoginPage;

