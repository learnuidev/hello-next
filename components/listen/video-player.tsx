import { useCallback, useEffect, useRef, useState } from 'react'
import { Header, NextIcon } from '@/components/ui/icons'

// import { useSearchQuery } from 'ui/react-query/search/search.queries'
import ReactPlayer from 'react-player'

// import {
//   hskLevel1Words,
//   hskLevel2Words,
//   hskLevel3Words,
//   hskLevel4Words,
//   hskLevel5Words,
//   hskLevel6Words
// } from 'ui/data/hsk'

const formatNumber = (time: any) => (time > 9 ? `${time}` : `0${time}`)

const formatTime = (example: any) => {
  if (example?.timestamp[0] > 60) {
    const minutes = Math.floor(example?.timestamp[0] / 60)
    const seconds = Math.floor(example?.timestamp[0] % 60)
    return `00:${formatNumber(minutes)}:${formatNumber(seconds)}`
  }
  return example?.timestamp[0] > 9
    ? `00:00:${Math.floor(example?.timestamp[0])}`
    : `00:00:0${Math.floor(example?.timestamp[0])}`
}

export function VideoPlayer ({
  media: { url, scripts, title },
  mediaIndex,
  setMediaIndex
}: any) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoHidden, setIsVideoHidden] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const [currentTime, setTime] = useState(0)
  const playerRef = useRef() as any

  const onReady = useCallback(() => {
    const timeToStart = 7 * 60 + 12.6
    // playerRef.current.seekTo(0, 'seconds')
  }, [playerRef.current])

  const [lessonIndex, setLessonIndex] = useState(0)
  const [answers, setAnswers] = useState({})

  // const queryId = uuidv4()

  const reset = () => {
    setAnswers({})

    setLessonIndex(0)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(seconds => playerRef?.current?.getCurrentTime())
    }, 500)
    return () => clearInterval(interval)
  }, [])

  console.log('player ref', playerRef)

  // alert(url)

  return (
    <div className='grow ml-4 md:ml-16 flex flex-col items-center'>
      <div className='space-x-4 my-4'>
        <button
          onClick={() => {
            setFocusMode(isHidden => !isHidden)
          }}
        >
          {focusMode ? 'show all' : 'focus'}
        </button>
        <button
          onClick={() => {
            setIsVideoHidden(isHidden => !isHidden)
          }}
        >
          {isVideoHidden ? 'show video' : 'hide video'}
        </button>
      </div>
      {/* <Header className='ml-4 my-2 md:my-4 text-black dark:text-gray-500 font-extrabold'>
        {title}
      </Header> */}
      <div className='flex-col sm:flex-row flex justify-between w-full sm:space-x-4'>
        <div className={`${isVideoHidden ? 'hidden' : ''} sm:h-40 grow w-full`}>
          <ReactPlayer
            ref={playerRef}
            // url='https://www.youtube.com/watch?v=uM2japEXEeU&list=RDuM2japEXEeU&start_radio=1'
            // url='https://www.youtube.com/watch?v=uM2japEXEeU'
            url={url}
            playing={isPlaying}
            width='100%'
            controls={true}
            onReady={onReady}
          />

          {/* <iframe src={url} width='100%' height='500px' /> */}
          {/* <video width='750' height='500' controls></video> */}
          {/* <source url={url}></source> */}

          <Header className='my-4 text-black text-center dark:text-gray-300 font-extralight'>
            {title}
          </Header>

          {/* <div>{currentTime}</div> */}
        </div>

        {/* <div>{currentTime}</div> */}

        <div className={`md:block grow w-full ${isVideoHidden ? 'my-8' : ''}`}>
          <div className='space-y-8 my-4'>
            {scripts
              .filter((script: any) => {
                if (focusMode) {
                  return (
                    script?.timestamp[0] < currentTime &&
                    script?.timestamp[1] > currentTime
                  )
                }

                return true
              })
              .map((example: any) => {
                return (
                  <div
                    className={`${
                      isVideoHidden || focusMode ? 'text-2xl' : 'md:text-lg'
                    } text-center w-full font-extralight flex flex-col items-start`}
                  >
                    {/* <a
                      role='button'
                      onClick={() => {
                        console.log('PLAYER REF', playerRef.current)
                        playerRef.current.seekTo(
                          example?.timestamp[0],
                          'seconds'
                        )

                        try {
                          playerRef.current?.player?.player?.play()
                        } catch (err) {
                          console.error(err)
                        }
                      }}
                      className={`${
                        example?.timestamp[0] < currentTime &&
                        example?.timestamp[1] > currentTime
                          ? 'dark:text-white'
                          : 'dark:text-gray-600 text-gray-300'
                      } transition text-center block w-full`}
                    >
                      {formatTime(example)}
                    </a> */}
                    <div
                      // as='button'
                      role='button'
                      onClick={() => {
                        console.log('PLAYER REF', playerRef.current)
                        playerRef.current.seekTo(
                          example?.timestamp[0],
                          'seconds'
                        )

                        try {
                          playerRef.current?.player?.player?.play()
                        } catch (err) {
                          console.error(err)
                        }
                      }}
                      className={`${
                        focusMode ? 'text-center' : 'text-left'
                      } w-full ${focusMode || isVideoHidden ? 'my-4' : ''}`}
                    >
                      {(example?.hanzi || example?.nepali)
                        .split('')
                        .map((item: any) => {
                          return (
                            <span
                              className={`${
                                // !focusMode &&
                                example?.timestamp[0] < currentTime &&
                                example?.timestamp[1] > currentTime
                                  ? 'dark:text-white'
                                  : 'dark:text-gray-400 text-gray-300'
                              } transition`}
                            >
                              {item}
                            </span>
                          )
                        })}
                      <p
                        className={`${
                          // !focusMode &&
                          example?.timestamp[0] < currentTime &&
                          example?.timestamp[1] > currentTime
                            ? 'dark:text-gray-300'
                            : 'dark:text-gray-500 text-gray-400'
                        } transition`}

                        // className='dark:text-gray-500 text-gray-400'
                      >
                        {example?.pinyin || example?.nepaliRoman}
                      </p>
                      <p
                        // className='dark:text-gray-400 text-gray-500'
                        className={`${
                          // !focusMode &&
                          example?.timestamp[0] < currentTime &&
                          example?.timestamp[1] > currentTime
                            ? 'dark:text-white'
                            : 'dark:text-gray-400 text-gray-500'
                        } transition`}
                      >
                        {example?.en}
                      </p>
                      <p
                        // className='dark:text-gray-400 text-gray-500'
                        className={`${
                          // !focusMode &&
                          example?.timestamp[0] < currentTime &&
                          example?.timestamp[1] > currentTime
                            ? 'dark:text-gray-500'
                            : 'dark:text-gray-500 text-gray-500'
                        } transition`}
                      >
                        {example?.lit}
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>

        <div className='hidden md:block relative'>
          <button
            className='absolute right-0 top-1/2 dark:hover:text-white shadow-md px-4 py-1 rounded-full dark:text-gray-600'
            onClick={() => {
              setMediaIndex((idx: any) => idx + 1)

              setLessonIndex(idx => idx + 1)
            }}
          >
            <NextIcon className='text-4xl' />
          </button>
        </div>
      </div>
    </div>
  )
}
