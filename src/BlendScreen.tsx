'use client'

import React, { useContext, useState, useEffect } from 'react';

import textData from '@/../public/text_data.json'

import TextScreen from './components/TextScreen/TextScreen';
import HistoryScreen from './components/HistoryScreen/HistoryScreen';
import PerfScreen from './components/PerfScreen/PerfScreen';

import Box from '@/components/Box/Box'
import Blender from '@/components/Blender/Blender'
import Menu from './components/Menu/Menu';

import hand_closed from '@/../public/hand_closed.ico'
import Apriblender, { Recipe } from './Apriblender';

const blender = new Apriblender();

const BlendScreen = (props:{
    blenderMemory: Recipe[]
}) => {
    const [blender, setBlender] = useState<Apriblender>(new Apriblender());
    const [textScreenText, setTextScreenText] = useState<string[]>(blender.taste().split('\n'));
    const [showTextScreen, setShowTextScreen] = useState<boolean>(true);
    const [showHistoryScreen, setShowHistoryScreen] = useState<boolean>(false);
    const [showPerfScreen, setShowPerfScreen] = useState<boolean>(false);
    const [blurbText, setBlurbText] = useState<[string, string, string]>(["Power Juice", "Flavor 18 Mildness 255", textData["base"]]);
    const [showStats, setShowStats] = useState<boolean>(true);

    console.log(showTextScreen, textScreenText);

    function parseColorText(x: string) {
        let colorStrings;
        switch (x) {
            case "red": colorStrings = textData["color_text"].red as [string, string, string]; break;
            case "blu": colorStrings = textData["color_text"].blu as [string, string, string]; break;
            case "pnk": colorStrings = textData["color_text"].pnk as [string, string, string]; break;
            case "blk": colorStrings = textData["color_text"].blk as [string, string, string]; break;
            case "ylw": colorStrings = textData["color_text"].ylw as [string, string, string]; break;
            case "grn": colorStrings = textData["color_text"].grn as [string, string, string]; break;
            case "wht": colorStrings = textData["color_text"].wht as [string, string, string]; break;
            default: colorStrings = ["Red Apricorn", "A red Apricorn.", "It assails your nostrils."] as [string, string, string]; break;
        }

        setBlurbText(colorStrings!);
    }

    function reset() {
        setBlender(new Apriblender());
    }

    const container = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center"
    } as React.CSSProperties;

    const main = {
        height: "100%",
        aspectRatio: "256 / 192",
        position: "relative",
        display: "flex",
        justifyContent: "space-between"
    } as React.CSSProperties;

    return (
        <div style={container} onClick={e => {setShowTextScreen(false); setShowHistoryScreen(false); setShowPerfScreen(false);}}>
            <div style={main} onClick={e => e.stopPropagation()}>
                {showTextScreen ? 
                    <TextScreen text={textScreenText} updateShowTextScreen={setShowTextScreen} /> : null}
                {showHistoryScreen ? 
                    <HistoryScreen updateShowHistoryScreen={setShowHistoryScreen} blenderMemory={props.blenderMemory} setBlender={setBlender}/> : null}
                {showPerfScreen ? 
                    <PerfScreen blender={blender} updateShowPerfScreen={setShowPerfScreen} /> : null}
                <Box updateTextFunc={parseColorText} updateShowStats={setShowStats} reset={reset}/>
                <Blender text={blurbText} showStats={showStats} blender={blender} setTextScreenText={setTextScreenText} updateShowTextScreen={setShowTextScreen} />
                <Menu blenderMemory={props.blenderMemory} blender={blender} setShowHistoryScreen={setShowHistoryScreen} setTextScreenText={setTextScreenText} setShowTextScreen={setShowTextScreen} setShowPerfScreen={setShowPerfScreen} />
            </div>
        </div>
    );
}

export default BlendScreen;