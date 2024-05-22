import React from "react"
import styled from "styled-components"


 const NavBar = () => {
    return (
        <Container>
            <Row>
                <SiteLink href="/home"> Home </SiteLink>
                <SiteLink href="/rate"> Rate </SiteLink>
            </Row>
        </Container>
    )
}
 const Container = styled.div`
	display:flex;
	justify-content: space-around;
	width: 100vw;
	position: fixed;
	background: #fff7b87a;
	z-index: 42;
	align-items: center;
	height: 8%;
	box-shadow: 0 4px 15px #0000004f;

 `

const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	width: 40%;

`

const SiteLink = styled.a`
	display: flex;
	text-decoration: none;
	color: ${props=> props.theme.shadow};
	text-transform: uppercase;
	font-size: 36px;
    &&:hover {
        border-bottom: 2px solid black;
    }
    transition: all 0.1s;
`

export default NavBar;
