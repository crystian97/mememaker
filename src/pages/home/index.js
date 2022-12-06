import React from "react";
import { Wrapper } from "./styles";
import Logo from '../../images/logo.svg'
export default function Home(){
    return (
        <Wrapper>
            <img src={Logo}/>
        </Wrapper>
    )
}