import { useEffect, useState } from "react";
import styled from "styled-components";


const Filters = ({fields, setFilters}) =>
{
    const [selected, setSelected] = useState({})


    const changeOptionValue = (e:string, val: string) => {
        if (fields[e].unique === true)
            selected[e] = val;
        else if (!selected[e].includes(val)){
            selected[e].push(val);
        }
        console.log(selected);
        setSelected({...selected})
    }

    useEffect(() => {
            console.log("fields here", fields)
        if (fields)
        {
            Object.keys(fields).map((key) => {
                if (fields[key].unique == true)
                    selected[key] = null
                else
                    selected[key] = []
            })
            setSelected(selected)
        }
    }, [fields])

    console.log(selected)
    return (
        <Container>
            <ContainerName>Filters</ContainerName>
            {
                fields && Object.keys(fields).map((e) => (
                    <Field>
                        <FieldName>{e}</FieldName>
                        <FieldRow>
                            {
                                fields[e].values.map((val:string) => (
                                    <Flag
                                    bg={fields[e].unique == true ?
                                            selected[e] && selected[e] == val ? "#c9f7ce7a" : "unset"
                                            :
                                            selected[e] && selected[e].includes(val) ? "#c9f7ce7a" : "unset"
                                        }
                                    onClick={() => {changeOptionValue(e, val)}}>{val}</Flag>
                                ))
                            }
                        </FieldRow>
                    </Field>
                ))
            }
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid grey;
    border-radius: 8px;
    padding: 20px 30px;
    align-items: center;
    gap: 20px;
    width: 300px;
`

const ContainerName = styled.div`
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid black;
`
const Field = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
`

const FieldName = styled.div`
    text-transform: capitalize;
    font-size: 18px;
    border-bottom: 1px solid gray;
    width: fit-content;
`

const FieldRow = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
`

const Flag = styled.div`
    display: flex;
    min-width: 50px;
    min height: 15px;
    padding: 7px 15px;
    border: 2px solid grey;
    border-radius: 8px;
    background-color: ${props => props.bg};

    &:hover {
        cursor: pointer;
        background-color: cyan;
    }
`


export default Filters
