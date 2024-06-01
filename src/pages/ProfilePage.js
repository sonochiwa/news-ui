import React, {useState, useEffect, useRef} from 'react';
import Header from "../components/Header";
import Container from "../ui/Container";
import styled from "styled-components";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {instance} from "../services/axios-instance";

function ProfilePage() {
    const [imgUrl, setImgUrl] = useState('/images/profile.png');
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await instance.get("/api/users/me");
                const userData = JSON.stringify(res.data);
                Cookies.set('user', userData, {expires: 7});

                const parsedUser = res.data;
                if (parsedUser.image_path) {
                    setImgUrl(`${process.env.REACT_APP_DOMAIN}/images/${parsedUser.image_path}`);
                }
            } catch (error) {
                console.error("Ошибка при получении данных пользователя:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file, file.name);

            try {
                const response = await instance.post('/api/upload/img', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(response.data);
                // Обновление изображения после успешной загрузки
                setImgUrl(URL.createObjectURL(file));
                window.location.reload();
            } catch (error) {
                console.error('Ошибка при загрузке файла!', error);
            }
        }
    };

    const handleFileSelect = () => {
        fileInputRef.current.click();
    };

    const logout = () => {
        Cookies.remove('news_token', { path: '/' });
        Cookies.remove('user', { path: '/' });
        Cookies.remove('country', { path: '/' });
        navigate("/");
    };

    return (
        <>
            <Header/>
            <Container>
                <ProfileInner>
                    <NewPhoto onClick={handleFileSelect}>
                        <ImgWrapper>
                            <ProfileImg src={imgUrl}/>
                        </ImgWrapper>
                        <input
                            type="file"
                            id="fileInput"
                            ref={fileInputRef}
                            style={{display: 'none'}}
                            onChange={handleFileChange}
                        />
                    </NewPhoto>
                    <LogoutBtn onClick={logout}>Выйти из аккаунта</LogoutBtn>
                </ProfileInner>
            </Container>
        </>
    );
}

const ProfileInner = styled.div`
    display: flex;
    margin-top: 24px;
    height: auto;
    justify-content: space-between;
`;

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
`;

const ImgWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 220px;
    height: 220px;
    overflow-y: hidden;
    background-color: white;
    border-radius: 5px;
`;

const ProfileImg = styled.img`
    width: 100%;
`;

const NewPhoto = styled.div`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    color: white;
`;

export default ProfilePage;
