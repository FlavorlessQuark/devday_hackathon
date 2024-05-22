import React from "react"
import styled from "styled-components"


 const NavBar = () => {
    return (
        <Container>
        </Container>
    )
}
 const Container = styled.div`
	display:flex;
	justify-content: space-around;
	width: 100vw;
	position: fixed;
	background: red;
	z-index: 42;
	align-items: center;
	height: 8%;
	box-shadow: 0 4px 15px #0000004f;

    @media screen and (max-width: ${props =>props.theme.mobile}px) {
        background:  ${props =>props.theme.primary};
        height: 100vh;
        flex-direction: column-reverse;
    }
    @media screen and (max-height: ${props =>props.theme.tablet}px) {
       height: 9%;
    }
 `

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 40%;
     @media screen and (max-width: ${props =>props.theme.mobile}px) {
        flex-direction: column;
         gap: 20px;
    }
`

const Link = styled.a`
	display: flex;
	text-decoration: none;
	color: ${props=> props.theme.shadow};
	text-transform: uppercase;
	font-size: 36px;
    @media screen and (max-width: ${props =>props.theme.mobile}px) {
        font-size: 50px;
    }
`

const SiteLink = styled.a`
	display: flex;
	text-decoration: none;
	color: ${props=> props.theme.shadow};
	text-transform: uppercase;
	font-size: 36px;
    @media screen and (max-width: ${props =>props.theme.mobile}px) {
        font-size: 50px;
        border-bottom: 2px solid black;
    }
    &&:hover {
        border-bottom: 2px solid black;
    }
    transition: all 0.1s;
`

export default NavBar;
