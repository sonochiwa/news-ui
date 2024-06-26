import React, {useEffect, useState, useCallback} from 'react';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Container from "../ui/Container";
import styled from "styled-components";
import {instance} from "../services/axios-instance";
import Cookies from "js-cookie";

function MainPage() {
    const [filter, setFilter] = useState("");
    const [countryCookie, setCountryCookieState] = useState("all");
    const [countries, setCountries] = useState([]);

    const handleFilter = useCallback((value) => {
        setFilter(value);
    }, []);

    const setCountryCookie = useCallback((value) => {
        Cookies.set('country', value);
        setCountryCookieState(value);
    }, []);

    useEffect(() => {
        instance.get('/api/countries')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });

        const countryValue = Cookies.get('country');
        setCountryCookieState(countryValue || "all");
    }, [setCountries, setCountryCookie]);

    return (
        <Root>
            <Header onChange={handleFilter}/>
            <Container id={"countries_container"}>
                <Countries id={"countries"}>
                    <Country
                        id={"country"}
                        onClick={() => setCountryCookie('all')}
                        style={countryCookie === 'all' ? {outline: "2px solid #eaeaea"} : null}
                    >All</Country>
                    {countries.map(country => (
                        <Country
                            key={country.country_title}
                            onClick={() => setCountryCookie(country.country_title)}
                            style={countryCookie === country.country_title ? {outline: "2px solid #eaeaea"} : null}
                        >{country.country_title}</Country>
                    ))}
                </Countries>
            </Container>
            <ContainerWrapper id={"countries_wrapper"}>
                <Container>
                    <Content id={"content_id"}>
                        <Sidebar/>
                        <Feed filter={filter} countries={123}/>
                    </Content>
                </Container>
            </ContainerWrapper>
        </Root>
    );
}

const Root = styled.div`
    //margin-bottom: 10px;
`

const Countries = styled.div`
    margin-left: 5px;
    position: fixed;
    display: flex;
    gap: 12px;
    margin-top: 2px;
    width: 100%;
    padding-bottom: 15px;
    background-color: var(--main-dark-gray);
`;

const Country = styled.div`
    cursor: pointer;
    display: flex;
    padding: 3px 12px;
    background-color: #969696;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 16px;
`;

const ContainerWrapper = styled.div`
    display: flex;
`;

const Content = styled.div`
    margin-top: 50px;
    display: flex;
`;

export default MainPage;