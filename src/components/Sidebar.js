import styled from "styled-components";
import SidebarBtn from "./SidebarBtn";
import {useEffect, useState} from "react";
import {instance} from "../services/axios-instance";

function Sidebar() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        instance.get('/api/categories/').then(response => {
            setCategories(response.data)
        })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <Root>
            <SidebarInner>
                {categories.map(category => (
                    <SidebarBtn key={category.id} title={category.title} tag={category.tag}/>
                ))}
            </SidebarInner>
        </Root>
    )
}

const Root = styled.div`
    background-color: transparent;
    height: 460px;
    width: 220px;
    overflow-y: scroll;
    scrollbar-color: var(--main-text-gray);
`

const SidebarInner = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`


export default Sidebar;

