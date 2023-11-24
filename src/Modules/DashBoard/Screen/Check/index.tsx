import { Button } from '@Components'
import React, { useState } from 'react'
import DetectFace from '../DetectFace'

const Check = () => {
    const [call, setCallDetectFace] = useState(false)
    const [join, setJoin] = useState(false)
    const callFaceDetect = ()=>{
        setCallDetectFace(true)
    }
    const continueCall = () => {
        setJoin(true)
        setCallDetectFace(false)
    }
  return (
    <>
    <Button onClick={callFaceDetect} text={'join'} ></Button>
    {
        call && <DetectFace onClick = {continueCall} setCallDetectFace={setCallDetectFace}/>
    }
    {
        join && <h1>Joined</h1>
    }
    </>
  )
}

export default Check