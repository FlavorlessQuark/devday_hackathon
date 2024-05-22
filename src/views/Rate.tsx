import { useState } from "react";
import styled from "styled-components";

import w1 from "../assets/wall1.webp"
import w2 from "../assets/wall2.webp"

const Rate = () => {
    const imgs = [w1,w2, w1];

    const [selected, setSelected] = useState(-1);

    return (
        <Container>
            {selected >= 0 &&
            <SelectedContainer>
                <SelectedImage src={imgs[selected]}/>
                <Row>

                <Button onClick={() => setSelected(-1)}> Meh</Button> <Button onClick={() =>setSelected(-1)}> Okay</Button> <Button onClick={() =>setSelected(-1)}> Best router ever!</Button>
                </Row>
            </SelectedContainer> }
            <Row>
                {
                    imgs.map((e,i) => <Im onClick={() => setSelected(i)} src={e}/>)
                }
            </Row>
        </Container>
    )
}
    const Container = styled.div`
        display: flex;
        width: 100%
        height: 100%;
    `

    const Im = styled.img`
        width: 200px;
        height: 200px;
    `

    const SelectedContainer = styled.div`
        display: flex;
        position: absolute;
        background: #0f0b0b91;
        width: 100vw;
        height:100%;
        flex-direction: column;
        align-items: center;
    `
    const SelectedImage = styled.img`
    width: 400px;
        height: 400px;
    `
    const SelectedSlider = styled.div`

    `
    const SelectedSubmit = styled.div`
    `
    const Row = styled.div`
        display: flex;
        gap:20px;
        flex-direction: row;
    `
    const Button = styled.button`
        display: flex;
        background: white;
        border: 1px solid black;
        height: 20px;
    `


export default Rate
