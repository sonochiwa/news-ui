import styled from "styled-components";
import Container from "../ui/Container";
import Header from "../components/Header";
import {useState} from "react";
import {instance} from "../services/axios-instance";

function CreateNewPage() {
    const [hasError, setHasError] = useState(false);
    const [hasSuccess, setHasSuccess] = useState(false);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");

    const addNewPost = () => {
        if (title.length === 0) {
            setHasError(`Поле "Заголовок" не заполнено`);
            return
        }

        if (body.length === 0) {
            setHasError(`Поле "Новость" не заполнено`);
            return
        }

        if (country.length === 0) {
            setHasError(`Поле "Категория" не заполнено`);
            return
        }

        if (category.length === 0) {
            setHasError(`Поле "страна" не заполнено`);
            return
        }

        instance.post("/api/posts", {
            title: title,
            body: body,
            country: country,
            category: category
        })
            .then(res => {
                if (res.status === 200) {
                    setHasSuccess(true);
                }
            })
            .catch(error => {
                console.error('Произошла ошибка:', error.message);
                setHasError(error.message);
            });
    }

    const handleKeyPress = (event) => {
        setHasSuccess(false)
        setHasError(false)
        if (event.key === 'Enter') {
            addNewPost()
        }
    };

    return (
        <Root>
            <Header/>
            <Container>
                <Create onKeyDown={handleKeyPress} onChange={() => setHasError(false) & setHasSuccess(false)}>
                    <Input placeholder={"Заголовок"} onChange={(e) => setTitle(e.target.value)} value={title}/>
                    <InputArea placeholder={"Новость"} onChange={(e) => setBody(e.target.value)} value={body}/>
                    <Input placeholder={"Категория"} onChange={(e) => setCategory(e.target.value)} value={category}/>
                    <Input placeholder={"Страна"} onChange={(e) => setCountry(e.target.value)} value={country}/>
                    <NewPostBtn onClick={addNewPost}>Опубликовать</NewPostBtn>
                    {hasError ? <Error>{hasError}</Error> : null}
                    {hasSuccess ? <Success>Запись успешно создана</Success> : null}
                </Create>
            </Container>
        </Root>
    )
}

const Success = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: -10px;
    color: green;
`

const Error = styled.p`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    margin-bottom: -10px;
    color: red;
`

const Create = styled.form`
    padding: 0 15px;
    max-width: 520px;
    margin: 20px auto;
`

const Root = styled.div`
`

const InputArea = styled.textarea`
    max-width: 520px;
    width: calc(100% - 40px);
    height: 200px;
    border-radius: 10px;
    display: block;
    padding: 20px;
    background-color: #e1e1e1;
    color: black;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 20px;
    margin-bottom: 12px;
`

const Input = styled.input`
    max-width: 520px;
    width: calc(100% - 40px);
    height: 50px;
    border-radius: 10px;
    display: block;
    padding: 0 20px;
    background-color: #e1e1e1;
    color: black;
    border: none;
    box-shadow: none;
    outline: none;
    font-size: 20px;
    margin-bottom: 12px;
`

const NewPostBtn = styled.div`
    display: block;
    line-height: 46px;
    max-width: 520px;
    width: 100%;
    border: 0;
    border-radius: 10px;
    font-size: 18px;
    color: var(--main-text-light-gray);
    background-color: #2c7c48;
    user-select: none;
    cursor: pointer;
    text-align: center;
`

export default CreateNewPage;

