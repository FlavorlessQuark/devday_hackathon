import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFlags } from "launchdarkly-react-client-sdk";
import w1 from "../assets/wall1.webp"
import w2 from "../assets/wall2.webp"
import Filters from "@/components/Filters";
import { useConvex} from "convex/react";
import { api } from "../../convex/_generated/api";

const Rate = () => {
    const dummydata = [
        {img: w1, tags: ["v1", "overhang"]},
        {img: w2, tags: ["v2"]},
        {img: w1, tags: ["v2", "Slab"]},
        {img: w2, tags: ["v4", "overhang"]},
        ];

    const [selected, setSelected] = useState(-1);
    const [value, setValue] = useState(0);
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState<any>(undefined)

    const {vselect} = useFlags();
    const convex = useConvex();
    // const getGeneratedImage = useQuery(api.myFunctions.getGeneratedImage, "skip");

    const getImagesFiltered = async() => {
        convex.query(api.myFunctions.getGeneratedImage, filters).then((res) => {
                setData(res);
            console.log("Query res", res)
            })
    }


    useEffect(() => {
            // console.log("Query", getGeneratedImage)
            convex.query(api.myFunctions.getGeneratedImage).then((res) => {
                setData(res);
            console.log("Query res", res)
            })
        }, [])

    return (
        <Container>
            {selected >= 0 &&
            <SelectedContainer>
                <Popup>
                    <Cross onClick={() => setSelected(-1)}> X </Cross>
                    <SelectedImage src={data[selected].value}/>
                    <SliderContainer>
                        <SelectedSlider onChange={(e) => setValue(e.target.valueAsNumber)} type="range" orient="vertical" stpe="1" min="0" max="10" list="Svalues"/>
                        <datalist id="Svalues">
                            <option value="0" label="Lame"></option>
                            <option value="1"></option>
                            <option value="2"></option>
                            <option value="3" ></option>
                            <option value="4" ></option>
                            <option value="5" label="Neutral"></option>
                            <option value="6"></option>
                            <option value="7"></option>
                            <option value="8" ></option>
                            <option value="9" ></option>
                            <option value="10" label="Awesome!"></option>
                        </datalist>
                        <SliderValue> {value} / 10</SliderValue>

                        <SliderSubmit onClick={() => setSelected(-1)}> Rate it </SliderSubmit>
                    </SliderContainer>
                        {/* <Row>
                            <Button onClick={() => setSelected(-1)}> Meh</Button>
                            <Button onClick={() =>setSelected(-1)}> Okay</Button>
                            <Button onClick={() =>setSelected(-1)}> Best router ever!</Button>
                        </Row> */}
                </Popup>
            </SelectedContainer> }
            <Row>
                {
                    data.map((e,i) => (
                    <RouteContainer>
                        <ImgTile>
                            <Im onClick={() => {setSelected(i); setValue(0)}} src={e.value}/>
                        </ImgTile>
                        <FlagContainer>
                            {
                                (Object.keys(e)).map((flag) => flag !== "value" && flag[0] != '_' &&<Flag>{e[flag]}</Flag>)
                            }
                        </FlagContainer>
                    </RouteContainer>
                    ))
                }
            </Row>

            <FilterArea>
                <Filters fields={vselect} setFilters={setFilters}/>
                <Button onClick={() =>getImagesFiltered()}> Filter </Button>
            </FilterArea>
        </Container>
    )
}

    const FilterArea = styled.div`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    `

    const Container = styled.div`
        display: flex;
        flex-direction: row;
        width: 90%;
        height: 100%;
        justify-content: center;
    `

    const Cross = styled.div`
        display: flex;
        border: 1px solid black;
        height: fit-content;
        font-size: 80px;
        padding: 10px 20px;
        color: red;
        &:hover {
            cursor:pointer;
        }
    `

    const SliderContainer = styled.div`
        display: flex;
        width: 100%;
        height: 100%;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        justify-content: center;
    `

    const SliderValue = styled.div`
        font-size: 20px;
    `

    const SliderSubmit = styled.div`
    display: flex;
    border: 1px solid black;
    padding: 10px 10px;
    font-size: 30px;
    background: #1aff3e5e;

    &:hover {
        cursor:pointer;
        background: #22e341e3;
    }
    `

    const RouteContainer  = styled.div`
        display: flex;
        flex-direction: column;
        gap: 20px;
        border: 2px solid grey;
        padding: 20px 20px;
        border-radius: 4px;
        align-items: center;
    `

    const Popup = styled.div`
        display: flex;
        flex-direction: row;
        height: 60%;
        width: 50%;
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
        width: 100%;
        height:100%;
        top: 0;
        left: 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    `
    const SelectedImage = styled.img`
    // width: 400px;
    //     height: 400px;
    border: 1px solid black;
    `
    const SelectedSlider = styled.input`
         writing-mode: vertical-lr;
        direction: rtl;
        appearance: slider-vertical;
        width: 30px;
        height: 90%;
        vertical-align: bottom;
        &::-moz-range-track  {
             width: 100%;
            height: 100%;
            cursor: pointer;
            animate: 0.2s;
            background: rgba(131, 238, 255, 0.57);
            border-radius: 16px;
            border: 1px solid #000000;
        }

        &::-moz-range-thumb {
            border: 1px solid #000000;
            // height: 30px;
            // width: 25px;
            width: 110%;
            height: 10%;
            border-radius: 40px;
            background: #FFFFFF;
            cursor: pointer;
        }
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
        border: 1px solid black;
        padding: 10px 40px;
        font-size: 30px;
        background: #1aff3e5e;
        width: fit-content;
        border-radius: 8px;
        &:hover {
            cursor:pointer;
            background: #22e341e3;
        }
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
