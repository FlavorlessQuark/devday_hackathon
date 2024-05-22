// import { useMutation, useQuery } from "convex/react";
import { useFlags } from "launchdarkly-react-client-sdk";
import styled from "styled-components";
import DragDropFile from "drag-drop-file-tk"
// import { api } from "../../convex/_generated/api";

import noimg from "../assets/noimg.png"
import { useEffect, useState } from "react";

import { useMutation, useQuery, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";

const Home = () => {

    // const numbers = useQuery(api.myFunctions.listNumbers, { count: 10 });
    const {vselect, test2} = useFlags();
    const [file, setFile] = useState<any | null>(null);
    const [options, setOptions] = useState<any>({});
    const [sel, setSEl] = useState<any>([]);
    // const addNumber = useMutation(api.myFunctions.addNumber);
    const handleChange = (files:any) => {
        // Handle selected files here
        setFile(files[0])
        console.log(files[0])
    };

    const setGeneratedImage = useMutation(api.myFunctions.setGeneratedImage);
    const generatedImage = useQuery(api.myFunctions.getGeneratedImage);
    const runModelAction = useAction(api.myFunctions.runModel)

    async function getBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
            resolve(reader.result)
            }
            reader.onerror = reject
        })
    }

// usage



    const changeOptionValue = (e:string, val: string) => {
        if (vselect[e].unique === true)
            options[e] = val;
        else if (!options[e].includes(val)){
            options[e].push(val);
        }
        console.log(options);
        console.log(sel)
        sel.push(val)
        setSEl(sel)
        setOptions(options)
    }

    const sendData = async() => {
        await getBase64(file) // `file` your img file
        .then(res => console.log(res)) // `res` base64 of img file
        .catch(err => console.log(err))

    }

    const  isSelected = (e, val) => {
        console.log("Is selected? ", val, vselect[e].unique ,options[e], val)
        if (vselect[e].unique && options[e] == val)
        {
            (console.log("Yes"))
            return "green";
        }
        if (options[e] && options[e].includes(val))
            {(console.log("Yes"))
            return "green";}
        return "red";
    }

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
                                    vselect[e].values.map((val:string) => {
                                        return (<Flag
                                        onClick={() => {changeOptionValue(e, val)}}
                                        >{val}</Flag>)
                                    } )
                                }
                            </FlagsRow>
                        </FlagsSection>
                    ))
                }
                <Submit onClick={() => sendData()}> Generate </Submit>
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
    padding: 40px;
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

    background-color: ${props => props.selected};
    &:hover {
        cursor: pointer;
        background-color: cyan;
    }
`

const Submit = styled.div`
    padding: 10px 20px;
    background-color: #8fce96;
    max-width: 100px;
    border-radius: 80px;
    border: 1px solid black;
        &:hover {
        cursor: pointer;
        background-color: green;
    }
`


export default Home;
