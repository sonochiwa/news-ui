import styled from "styled-components";
import SidebarBtn from "./SidebarBtn";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        instance.get('/api/categories').then(response => {
            setCategories(response.data)
        })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    function wordToUpper(word) {
        let result = ""

        if (word.length > 0) {
            result = word[0].toUpperCase() + word.substring(1, word.length)
        }

        return result
    }

    return (
        <Root id={"sidebar"}>
            <SidebarInner id={"sidebar_inner"}>
                <SidebarBtn
                    key={'All'}
                    title={"All"}
                />
                {categories.map((category, key) => (
                    <SidebarBtn
                        key={key}
                        title={wordToUpper(category.title)}
                    />
                ))}
            </SidebarInner>
        </Root>
    )
}

const Root = styled.div`
    position: fixed;
    width: 220px;
    background-color: transparent;
    height: 450px;
    margin-top: 5px;
    padding-right: 5px;
    overflow-y: scroll;
    scrollbar-color: var(--main-text-gray);
`

const SidebarInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`


export default Sidebar;

