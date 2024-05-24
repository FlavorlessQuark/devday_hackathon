import { useState } from "react";
import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";
import w1 from "../assets/wall1.webp"
import w2 from "../assets/wall2.webp"
import Filters from "@/components/Filters";

const Rate = () => {
    const dummydata = [
        {img: w1, tags: ["v1", "overhang"]},
        {img: w2, tags: ["v2"]},
        {img: w1, tags: ["v2", "Slab"]},
        {img: w2, tags: ["v4", "overhang"]},
        ];

    const [selected, setSelected] = useState(-1);
    const {vselect} = useFlags();

    return (
        <Container>
            {selected >= 0 &&
            <SelectedContainer>
                <SelectedImage src={dummydata[selected].img}/>
                <Row>

                <Button onClick={() => setSelected(-1)}> Meh</Button> <Button onClick={() =>setSelected(-1)}> Okay</Button> <Button onClick={() =>setSelected(-1)}> Best router ever!</Button>
                </Row>
            </SelectedContainer> }
            <Row>
                {
                    Object.keys(dummydata).map((e,i) => (
                    <RouteContainer>
                        <ImgTile>
                            <Im onClick={() => setSelected(i)} src={dummydata[e].img}/>
                        </ImgTile>
                        <FlagContainer>
                            {
                                (dummydata[e].tags).map((flag) =><Flag>{flag}</Flag>)
                            }
                        </FlagContainer>
                    </RouteContainer>
                    ))
                }
            </Row>
            <Filters fields={vselect}/>
        </Container>
    )
}
    const Container = styled.div`
        display: flex;
        flex-direction: row;
        width: 90%;
        height: 100%;
        justify-content: center;
    `

    const RouteContainer  = styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 2px solid grey;
        padding: 20px 20px;
        border-radius: 4px;
    `
    const ImgTile = styled.div`
        height: 80%;
        border: 1px solid black;
        border-radius: 4px;
    `

    const FlagContainer = styled.div`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 5px;
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
        flex-wrap: wrap;
        width: 80%;
        height: fit-content;
    `
    const Button = styled.button`
        display: flex;
        background: white;
        border: 1px solid black;
        height: 20px;
    `
const Flag = styled.div`
    display: flex;
    min-width: 50px;
    min height: 15px;
    padding: 7px 15px;
    border: 2px solid grey;
    border-radius: 8px;
`


export default Rate
