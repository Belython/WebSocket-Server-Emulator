import * as React from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import {useDispatch, useSelector} from "react-redux";
import {pauseMessage, playMessage, sendAllMessage} from "../../../store/actionCreators";
import {useEffect} from "react";
import {MessageState} from "../../../type";
import useTimeout from "../../../hook/usetimeout/useTimeout";


const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    opacity: 0.38,
    fontWeight: 500,
    letterSpacing: 0.2,
});

function formatDuration(value: number) {
    if (value > 0) {
        let milliseconds = Math.floor((value % 1000) / 100)
        let hours: string | number = Math.floor((value / (1000 * 60 * 60)) % 24)
        let minute: string | number = Math.floor((value / (1000 * 60)) % 60);
        let seconds: string | number = Math.floor((value / 1000) % 60);

        hours = (hours < 10) ? "0" + hours : hours;
        minute = (minute < 10) ? "0" + minute : minute;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        return hours + ":" + minute + ":" + seconds + "." + milliseconds
    } else {
        return 0 + ":" + 0 + ":" + 0 + "." + 0
    }
}

export default function Sliders() {

    const messages = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.messages;
        }
    )

    const lastIndex = useSelector(
        (state: { messages: MessageState }) => {
            return state.messages.lastIndex;
        })

    const lasTimeSend = useSelector((state: { messages: MessageState }) => {
        return state.messages.lastTimeSend;
    })

    const timeToSendFirstMessage = useSelector((state: { messages: MessageState }) => {
        return state.messages.differnseTime;
    })


    const dispatch = useDispatch()
    const theme = useTheme();
    let [position, setPosition] = React.useState(0);
    let [currentPosition, setCurrentPosition] = React.useState(0);
    let [played, setPlayed] = React.useState(false);
    let [isEnd, setIsEnd] = React.useState(false);

    let time: any;
    time = useTimeout(500);

    useEffect(() => {
        if (played === true) {
            dispatch(playMessage())
        } else {
            dispatch(pauseMessage())
        }
    }, [played])

    useEffect(() => {
        if (timeToSendFirstMessage !== 0 && played === true) {
            setPosition(lasTimeSend + (time - timeToSendFirstMessage))
        }
    }, [lasTimeSend, time, timeToSendFirstMessage]);


    useEffect(() => {
        if(lastIndex === 0){
            setIsEnd(false);
            setPosition(0)
        }
        if (lastIndex === messages.length) {
            setPlayed(false)
            setPosition(messages[messages.length - 1].time)
            setIsEnd(true)
        }
    }, [lastIndex, messages]);


    function handleChangePosition(value: number) {
        if (position < value) {
            setCurrentPosition(value)
            played = false
        }
    }

    function handleSetPosition(value: number) {
        if (position < value) {
            dispatch(sendAllMessage(value))
            setCurrentPosition(0)
        }
    }


    const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
    return (
        <Box position="static" sx={{width: '100%', alignSelf: "center"}}>
            <Slider
                aria-label="time-indicator"
                size="small"
                value={(currentPosition !== 0) ? currentPosition : position}
                min={messages[0].time}
                step={1}
                max={messages[messages.length - 1].time}
                onChange={(_, value) => handleChangePosition(value as number)}
                onChangeCommitted={(_, value) => handleSetPosition(value as number)}
                sx={{
                    color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
                    height: 4,
                    '& .MuiSlider-thumb': {
                        width: 8,
                        height: 8,
                        transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                        '&:before': {
                            boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                        },
                        '&:hover, &.Mui-focusVisible': {
                            boxShadow: `0px 0px 0px 8px ${
                                theme.palette.mode === 'dark'
                                    ? 'rgb(255 255 255 / 16%)'
                                    : 'rgb(0 0 0 / 16%)'
                            }`,
                        },
                        '&.Mui-active': {
                            width: 20,
                            height: 20,
                        },
                    },
                    '& .MuiSlider-rail': {
                        opacity: 0.28,
                    },
                }}
            />
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mt: -2,
                }}
            >
                <TinyText>{formatDuration(position - messages[0].time)}</TinyText>
                <TinyText>{formatDuration((position > 0) ? (messages[messages.length - 1].time - position) : (messages[messages.length - 1].time - messages[0].time))}</TinyText>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: -1,
                }}
            >
                {isEnd ? (<IconButton disabled
                                      aria-label={played ? 'play' : 'pause'}
                                      onClick={() => {
                                          setPlayed(!played)
                                      }}
                >
                    {played ? (
                        <PauseRounded sx={{fontSize: '3rem'}} htmlColor={mainIconColor}/>
                    ) : (
                        <PlayArrowRounded
                            sx={{fontSize: '3rem'}}
                            htmlColor={mainIconColor}
                        />
                    )}
                </IconButton>) : (<IconButton
                    aria-label={played ? 'play' : 'pause'}
                    onClick={() => {
                        setPlayed(!played)
                    }}
                >
                    {played ? (
                        <PauseRounded sx={{fontSize: '3rem'}} htmlColor={mainIconColor}/>
                    ) : (
                        <PlayArrowRounded
                            sx={{fontSize: '3rem'}}
                            htmlColor={mainIconColor}
                        />
                    )}
                </IconButton>)}
            </Box>
        </Box>
    );
}
