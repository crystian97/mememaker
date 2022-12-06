import React from "react";
import { Card, Templates, Wrapper } from "./styles";
import Logo from '../../images/logo.svg'
export default function Home(){
    return (
        <Wrapper>
            <img src={Logo}/>
            <Card>
                <h2>Selecione um template</h2>
                <Templates>
                    
                </Templates>
            </Card>
        </Wrapper>
    )
}