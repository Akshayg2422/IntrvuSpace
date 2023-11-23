import { Button } from '@Components'
import React, { useState } from 'react'
import DetectFace2 from '../DetectFace'

const Check = () => {
    const [call, setCall] = useState(false)
    const [join, setJoin] = useState(false)
    const callFaceDetect = ()=>{
        setCall(true)
    }
    const continueCall = () => {
        setJoin(true)
        setCall(false)
    }
  return (
    <>
    <Button onClick={callFaceDetect} text={'join'} ></Button>
    {
        call && <DetectFace2 onClick = {continueCall} />
    }
    {
        join && <h1>Joined</h1>
    }
    </>
  )
}

export default Check