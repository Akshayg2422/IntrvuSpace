import { useEffectAsync, useMemoAsync } from '@chengsokdara/react-hooks-async'
import type { RawAxiosRequestHeaders } from 'axios'
import type { Harker } from 'hark'
import type { Encoder } from 'lamejs'
import { useEffect, useRef, useState } from 'react'
import type { Options, RecordRTCPromisesHandler } from 'recordrtc'
import {
  defaultStopTimeout,
  ffmpegCoreUrl,
  silenceRemoveCommand,
  whisperApiEndpoint,
} from './configs'
import {
  UseWhisperConfig,
  UseWhisperHook,
  UseWhisperTimeout,
  UseWhisperTranscript,
} from './types'
import moment from 'moment'

/**
 * default useWhisper configuration
 */
const defaultConfig: UseWhisperConfig = {
  apiKey: '',
  autoStart: false,
  autoTranscribe: true,
  mode: 'transcriptions',
  nonStop: false,
  removeSilence: false,
  stopTimeout: defaultStopTimeout,
  streaming: false,
  timeSlice: 3_000,
  onDataAvailable: undefined,
  onTranscribe: undefined,
}


/**
 * default timeout for recorder
 */
const defaultTimeout: UseWhisperTimeout = {
  stop: undefined,
}

/**
 * default transcript object
 */
const defaultTranscript: UseWhisperTranscript = {
  blob: undefined,
  text: undefined,
}

/**
 * React Hook for OpenAI Whisper
 */
export const useWhisper: UseWhisperHook = (config) => {
  const {
    apiKey,
    autoStart,
    autoTranscribe,
    mode,
    nonStop,
    stopTimeout,
    streaming,
    timeSlice,
    whisperConfig,
    onDataAvailable: onDataAvailableCallback,
    onTranscribe: onTranscribeCallback,
    isTtfSpeaking,

  } = {
    ...defaultConfig,
    ...config,
  }
  const speakingLimit = useRef<any>(moment());
  const speakingShouldProcess = useRef<any>(false);

  if (!apiKey && !onTranscribeCallback) {
    throw new Error('apiKey is required if onTranscribe is not provided')
  }


  const chunks = useRef<Blob[]>([])
  const encoder = useRef<Encoder>()
  const listener = useRef<Harker>()
  const recorder = useRef<RecordRTCPromisesHandler>()
  const stream = useRef<MediaStream>()
  const timeout = useRef<UseWhisperTimeout>(defaultTimeout)

  const [recording, setRecording] = useState<boolean>(false)
  const [speaking, setSpeaking] = useState<boolean>(false)
  const [transcribing, setTranscribing] = useState<boolean>(false)
  const [voiceUp, setVoiceUp] = useState<boolean>(false)
  const voiceUpCount = useRef<any>(0);
  const voiceUpTime = useRef<any>(moment());

  const [transcript, setTranscript] =
    useState<UseWhisperTranscript>(defaultTranscript)

  useEffect(() => {
    return () => {
      if (chunks.current) {
        chunks.current = []
      }
      if (encoder.current) {
        encoder.current.flush()
        encoder.current = undefined
      }
      if (recorder.current) {
        recorder.current.destroy()
        recorder.current = undefined
      }
      onStopTimeout('stop')
      if (listener.current) {
        // @ts-ignore
        listener.current.off('speaking', onStartSpeaking)
        // @ts-ignore
        listener.current.off('stopped_speaking', onStopSpeaking)
      }
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop())
        stream.current = undefined
      }
    }
  }, [])

  /**
   * if config.autoStart is true
   * start speech recording immediately upon component mounted
   */
  useEffectAsync(async () => {
    if (autoStart) {
      await onStartRecording()
    }
  }, [autoStart])

  /**
   * start speech recording and start listen for speaking event
   */
  const startRecording = async () => {
    await onStartRecording()
  }

  /**
   * pause speech recording also stop media stream
   */
  const pauseRecording = async () => {
    await onPauseRecording()
  }

  /**
   * stop speech recording and start the transcription
   */
  const stopRecording = async () => {
    await onStopRecording()
  }

  const onStartRecording = async () => {
    try {
      if (!stream.current) {
        await onStartStreaming()
      }
      if (stream.current) {
        if (!recorder.current) {
          const {
            default: { RecordRTCPromisesHandler, StereoAudioRecorder },
          } = await import('recordrtc')
          const recorderConfig: Options = {
            mimeType: 'audio/wav',
            numberOfAudioChannels: 1, // mono
            recorderType: StereoAudioRecorder,
            sampleRate: 44100, // Sample rate = 44.1khz
            timeSlice: streaming ? timeSlice : undefined,
            type: 'audio',
            ondataavailable:
              autoTranscribe && streaming ? onDataAvailable : undefined,
          }
          recorder.current = new RecordRTCPromisesHandler(
            stream.current,
            recorderConfig
          )
        }
        if (!encoder.current) {
          const { Mp3Encoder } = await import('lamejs')
          encoder.current = new Mp3Encoder(1, 44100, 96)
        }
        const recordState = await recorder.current.getState()
        if (recordState === 'inactive' || recordState === 'stopped') {
          await recorder.current.startRecording()
        }
        if (recordState === 'paused') {
          await recorder.current.resumeRecording()
        }
        if (nonStop) {
          onStartTimeout('stop')
        }
        setRecording(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * get user media stream event
   * - try to stop all previous media streams
   * - ask user for media stream with a system popup
   * - register hark speaking detection listeners
   */
  const onStartStreaming = async () => {
    console.log("000091")
    try {
      if (stream.current) {
        stream.current.getTracks().forEach((track) => track.stop())
      }
      stream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })
      console.log("0000913")
      if (!listener.current) {
        const { default: hark } = await import('hark')
        listener.current = hark(stream.current, {
          interval: 100,
          play: false,
        })
        listener.current.on('speaking', onStartSpeaking)
        listener.current.on('stopped_speaking', onStopSpeaking)
        listener.current.on('volume_change', function (value) {
          const currentDate = moment();
          if (-value < 43) {
            if (currentDate < voiceUpTime.current) {
              voiceUpCount.current = voiceUpCount.current + 1
              const limitDateTime = currentDate.add(3, 'seconds');
              speakingLimit.current = limitDateTime

            }
            else {
              voiceUpCount.current = 0
              const limitDateTime = currentDate.add(6, 'seconds');
              voiceUpTime.current = limitDateTime
              speakingLimit.current = limitDateTime

            }
            console.log("voiceUpCount.current", voiceUpCount.current)
            if (voiceUpCount.current > 3) {
              setVoiceUp(true)
              speakingShouldProcess.current = true
            }

          }
          else {
            if (voiceUpCount.current > 3) {
              setVoiceUp(true)
            }
            else if (currentDate > voiceUpTime.current) {
              setVoiceUp(false)
            }

          }

        });
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onStartTimeout = (type: keyof UseWhisperTimeout) => {
    if (!timeout.current[type]) {
      timeout.current[type] = setTimeout(onStopRecording, stopTimeout)
    }
  }

  const onStartSpeaking = () => {
    console.log('start speaking')
    setSpeaking(true)
    onStopTimeout('stop')
  }

  const onStopSpeaking = () => {
    console.log('stop speaking')
    setSpeaking(false)
    if (nonStop) {
      onStartTimeout('stop')
    }
  }

  const onPauseRecording = async () => {
    try {
      if (recorder.current) {
        const recordState = await recorder.current.getState()
        if (recordState === 'recording') {
          await recorder.current.pauseRecording()
        }
        onStopTimeout('stop')
        setRecording(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const onStopRecording = async () => {
    try {
      if (recorder.current) {
        const recordState = await recorder.current.getState()
        if (recordState === 'recording' || recordState === 'paused') {
          await recorder.current.stopRecording()
        }
        onStopStreaming()
        onStopTimeout('stop')
        setRecording(false)

        await recorder.current.destroy()
        chunks.current = []
        if (encoder.current) {
          encoder.current.flush()
          encoder.current = undefined
        }
        recorder.current = undefined
      }
    } catch (err) {
      console.error(err)
    }
  }

  /**
   * stop media stream event
   * - remove hark speaking detection listeners
   * - stop all media stream tracks
   * - clear media stream from ref
   */
  const onStopStreaming = () => {
    if (listener.current) {
      // @ts-ignore
      listener.current.off('speaking', onStartSpeaking)
      // @ts-ignore
      listener.current.off('stopped_speaking', onStopSpeaking)
      listener.current = undefined
    }
    if (stream.current) {
      stream.current.getTracks().forEach((track) => track.stop())
      stream.current = undefined
    }
  }

  /**
   * stop timeout event
   * - clear stop timeout and remove it from ref
   */
  const onStopTimeout = (type: keyof UseWhisperTimeout) => {
    if (timeout.current[type]) {
      clearTimeout(timeout.current[type])
      timeout.current[type] = undefined
    }
  }


  const getTranscript = async (blob) => {
    console.log("dataaaaa12", speakingShouldProcess.current)
    if (speakingShouldProcess.current === true) {
      console.log("dataaaaa1", speakingShouldProcess.current)
      speakingShouldProcess.current = false
      if (encoder.current && recorder.current) {
        const recordState = await recorder.current.getState()
        setTranscribing(true)
        // console.log("0000012")
        const buffer = await blob.arrayBuffer()
        const mp3 = encoder.current.encodeBuffer(new Int16Array(buffer))
        blob = new Blob([mp3], { type: 'audio/mpeg' })
        if (mp3.byteLength > 225 && !isTtfSpeaking) {
          const file = new File([blob], 'speech.mp3', { type: 'audio/mpeg' })


          const text = await onWhispered(file)
          if (!isTtfSpeaking)
            setTranscript({ text })
        }
        else {
          console.log("bbbbb undefff")
        }
      }
    }
    else {
      speakingShouldProcess.current = false
    }
  }


  const onDataAvailable = async (data: Blob) => {
    console.log("dataaaaa1", isTtfSpeaking)
    if (!isTtfSpeaking)
      getTranscript(data)
  }


  const onWhispered = useMemoAsync(
    async (file: File) => {
      // Whisper only accept multipart/form-data currently
      const body = new FormData()
      body.append('file', file)
      body.append('model', 'whisper-1')
      if (mode === 'transcriptions') {
        body.append('language', whisperConfig?.language ?? 'en')
      }
      if (whisperConfig?.prompt) {
        body.append('prompt', "")
        //  whisperConfig.prompt)
      }
      if (whisperConfig?.response_format) {
        body.append('response_format', whisperConfig.response_format)
      }
      if (whisperConfig?.temperature) {
        body.append('temperature', `${whisperConfig.temperature}`)
      }
      const headers: RawAxiosRequestHeaders = {}
      headers['Content-Type'] = 'multipart/form-data'
      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`
      }
      const { default: axios } = await import('axios')
      const response = await axios.post(whisperApiEndpoint + mode, body, {
        headers,
      })
      console.log("wwwwwwrr", response.data.text)
      return response.data.text
    },
    [apiKey, mode, whisperConfig]
  )

  return {
    recording,
    speaking,
    transcribing,
    transcript,
    pauseRecording,
    startRecording,
    stopRecording,
    voiceUp
  }
}
