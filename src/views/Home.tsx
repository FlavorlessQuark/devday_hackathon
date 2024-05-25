// import { useMutation, useQuery } from "convex/react";
import { useFlags } from "launchdarkly-react-client-sdk";
import styled from "styled-components";
import React from 'react'
import Dropzone from 'react-dropzone'

import DragDropFile from "drag-drop-file-tk";
// import { api } from "../../convex/_generated/api";

import { useEffect, useState } from "react";

import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import wall1 from "../assets/wall1.webp"
import Filters from "@/components/Filters";
import { action } from "convex/_generated/server";

import w1 from "../assets/wall1.webp"
import w2 from "../assets/wall2.webp"
import w3 from "../assets/wall3.webp"
import w4 from "../assets/wall4.webp"
import w5 from "../assets/wall5.webp"
import w6 from "../assets/wall6.webp"

const Home = () => {
    // const numbers = useQuery(api.myFunctions.listNumbers, { count: 10 });
    const {vselect, test2} = useFlags();
    const [file, setFile] = useState<any | null>(null);
    const [options, setOptions] = useState<any>({});
    const [imgData, setisImg] = useState(undefined)
    const [res, setRes] = useState<any>(undefined);

    // const addNumber = useMutation(api.myFunctions.addNumber);
    const handleChange = (files:any) => {
        // Handle selected files here
        setFile(files[0])
        console.log(files[0])
    };
    const walls = [w1, w2, w3, w4, w5, w6]

    const setGeneratedImage = useMutation(api.myFunctions.setGeneratedImage);


    async function get_files(file:any) {
        // return new Promise((resolve, reject) => {
            console.log("here os file", file)
            const reader = new FileReader()

          reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
      // Do whatever you want with the file contents
        const binaryStr = reader.result
        console.log(binaryStr)
        setisImg(binaryStr);
      }
    //   reader.readAsArrayBuffer(file[0])
      reader.readAsDataURL(file[0])
    }

// usage

    console.log("Launchdarkly", vselect)


    const sendData = async() => {
        // await getBase64(file) // `file` your img file
        // .then(res => console.log(res)) // `res` base64 of img file
        // .catch(err => console.log(err))
        // setisImg(true)s
        // let res = await runModelAction({image: imgData})
        // console.log("Got this ID", res);
        setRes(walls[Math.floor((Math.random() * 100)) % walls.length ])
        console.log(res, Math.floor((Math.random() * 100)) % walls.length )
    }

    const save = async() => {
        let response = await setGeneratedImage({value: res, ...options})

        console.log('got repsonse', response)
        setRes(undefined);
        setisImg(undefined);
    }

    return (
        <Container>
            <ImgArea>
            {
                res === undefined ?
                <Dropzone onDrop={(acceptedFiles) => get_files(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <DragArea>
                        <DragInput {...getRootProps()}>
                            <input {...getInputProps()} />
                            {imgData !== undefined ? <Img src={imgData}/> :
                            <p>Drag 'n' drop some files here, or click to select files</p>
                            }
                        </DragInput>
                        </DragArea>
                    )}
                </Dropzone>
                :
                <img src={res}/>
            }
                <ButtonsArea>
                    {
                        res === undefined ?
                        <Button onClick={() =>sendData()}> Generate </Button>
                        :
                        <>
                        <Button onClick={() =>sendData()}> Re-Generate </Button>
                        <Button onClick={() => {setRes(undefined); setisImg(undefined)}}> Pick another file </Button>
                        <Button onClick={() =>save()}> Save </Button>
                        </>

                    }
                </ButtonsArea>
            </ImgArea>
            <FiltersArea>
                <Filters fields={vselect} setFilters={setOptions}/>
            </FiltersArea>

        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    align-items:center;
    padding: 40px;
    gap: 20px;
`

const Img = styled.img`
    position: absolute;
    top: 0;
  bottom: 0;
  object-fit: scale-down;
  display: flex;
  width: 100%;
  height: 100%;
`

const FiltersArea = styled.div`
    display: flex;
`

const ImgArea = styled.div`
    display:flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    align-items: center;
    gap: 40px;
`

const ButtonsArea = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15px;
    width: 100%;
    align-items: center;
    justify-content: center;
`

const Button = styled.div`
    padding: 12px 20px;
    display: flex;
    font-size: 20px;
    text-align: center;
    background-color: #8fce96;
    border-radius: 8px;
    border: 1px solid black;
        &:hover {
        cursor: pointer;
        background-color: green;
    }
`

const DragArea = styled.section`
    display :flex;
    align-items: center;
    justify-content: center;
    border: 4px dashed grey;
    border-radius: 10px;
    height: 100%;
    width: 100%;
`

const DragInput = styled.div`
    display: flex;
    width: 98%;
    height: 98%;
    position: relative;
    background: #cacaca5d;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    text-align: center;

    &:hover {
        cursor: pointer;
    }
`
// const

export default Home;
