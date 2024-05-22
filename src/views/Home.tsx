// import { useMutation, useQuery } from "convex/react";
import { useFlags } from "launchdarkly-react-client-sdk";
import styled from "styled-components";
import DragDropFile from "drag-drop-file-tk"
// import { api } from "../../convex/_generated/api";

import noimg from "../assets/noimg.png"
import { useEffect, useState } from "react";

const Home = () => {

    // const numbers = useQuery(api.myFunctions.listNumbers, { count: 10 });
    const {vselect, test2} = useFlags();
    const [file, setFile] = useState<any | null>(null);
    const [options, setOptions] = useState<any>({});
    // const addNumber = useMutation(api.myFunctions.addNumber);
    const handleChange = (files:any) => {
        // Handle selected files here
        setFile(files[0])
    };


    const sendData = () => {

    }

    const dummyflags = ["1", "2", "3"]

    useEffect(() => {
        if (vselect)
        {
            let _options:any = {}
            Object.keys(vselect).map((key) => {
                if (vselect[key].unique == true)
                    _options[key] = null
                else
                    _options[key] = []
            })
            setOptions(_options)
        }
    }, [vselect])

    console.log(vselect)

    return (
        <Container>
            <ImgArea><DragDropFile withImagePreview={800} limit={1} handleChange={handleChange}/></ImgArea>
            <FlagsArea>
                {
                    Object.keys(vselect).map((e) => (
                        <FlagsSection>
                            <FlagsSectionTitle key={e}> {e} </FlagsSectionTitle>
                            <FlagsRow>
                                {
                                    vselect[e].values.map(function(val:string, i:number) {
                                        console.log(val, vselect[e], vselect[e].values)
                                        // return (<Flag selected={vselect[e].unique && options[e]? options[e] == val : options[e].includes(val)}>{val}</Flag>)
                                        return (<Flag>{val}</Flag>)
                                    } )
                                }
                            </FlagsRow>
                        </FlagsSection>
                    ))
                }
                <Submit> Generate </Submit>
            </FlagsArea>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items:center;
`

const ImgArea = styled.div`
    // display:flex;
    width: 80%;
    height: 50%;
    align-items: center;
`
const FlagsArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const FlagsSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const FlagsRow = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`
const FlagsSectionTitle = styled.div`
    display: flex;
    flex-direction: row;
    gap: 20px;
`

const Flag = styled.div`
    display: flex;
    min-width: 50px;
    min height: 20px;
    padding: 10px 20px;
    border: 2px solid grey;
    border-radius: 8px;

    &:hover {
        cursor: pointer;
        background-color: cyan;
    }
`

const Submit = styled.div`
    padding: 10px 20px;
    background-color: #8fce96;
    border-radius: 80px;
    border: 1px solid black;
        &:hover {
        cursor: pointer;
        background-color: green;
    }
`


export default Home;
