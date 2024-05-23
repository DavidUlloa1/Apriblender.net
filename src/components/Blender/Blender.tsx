'use client'

import React, { useContext, useState, useEffect } from 'react';

import Image, { StaticImageData } from "next/image";
import styles from "./Blender.module.css";
import classNames from 'classnames/bind';

import blender_open from '@/../public/other/blender_open.png'
import blender_closed from '@/../public/other/blender_closed.png'

import full_red from '@/../public/blender_colors/full red.png'
import full_blue from '@/../public/blender_colors/full blue.png'
import full_pink from '@/../public/blender_colors/full pink.png'
import full_gray from '@/../public/blender_colors/full gray.png'
import full_yellow from '@/../public/blender_colors/full yellow.png'
import full_green from '@/../public/blender_colors/full green.png'
import half_red from '@/../public/blender_colors/half red.png'
import half_blue from '@/../public/blender_colors/half blue.png'
import half_pink from '@/../public/blender_colors/half pink.png'
import half_gray from '@/../public/blender_colors/half gray.png'
import half_yellow from '@/../public/blender_colors/half yellow.png'
import half_green from '@/../public/blender_colors/half green.png'
import quarter_red from '@/../public/blender_colors/quarter red.png'
import quarter_blue from '@/../public/blender_colors/quarter blue.png'
import quarter_pink from '@/../public/blender_colors/quarter pink.png'
import quarter_gray from '@/../public/blender_colors/quarter gray.png'
import quarter_yellow from '@/../public/blender_colors/quarter yellow.png'
import quarter_green from '@/../public/blender_colors/quarter green.png'

import speed_medal from '@/../public/pokeathlon_icons/Pokéathlon_Speed_Medal.png'
import power_medal from '@/../public/pokeathlon_icons/Pokéathlon_Power_Medal.png'
import skill_medal from '@/../public/pokeathlon_icons/Pokéathlon_Skill_Medal.png'
import stamina_medal from '@/../public/pokeathlon_icons/Pokéathlon_Stamina_Medal.png'
import jump_medal from '@/../public/pokeathlon_icons/Pokéathlon_Jump_Medal.png'

import Apriblender, { Apricorn } from '@/Apriblender';

let cx = classNames.bind(styles);

const Blender = (props:{
    text: [string, string, string],
    showStats: boolean,
    blender: Apriblender,
    updateShowTextScreen: any,
    setTextScreenText: any
}) => {
    const [blendOpen, setBlendOpen] = useState<boolean>(false);
    const [statChanged, setStatChanged] = useState<boolean>(false);

    const blender = props.blender;

    let text_outer = cx({
        'text_outer': true,
        'text_outer_color': !props.showStats
    })

    let text_inner = cx({
        'text_inner': true,
        'opacity': props.showStats
    })

    let stats = cx({
        'stats': true,
        'opacity': !props.showStats
    })

    function parseColor(): StaticImageData {
        if (blender.liquidLevel === 3) {
            switch (blender.blenderColor()) {
                case "Red": return full_red;
                case "Blu": return full_blue;
                case "Pnk": return full_pink;
                case "Blk": return full_gray;
                case "Ylw": return full_yellow;
                case "Grn": return full_green;
                case "Wht": return full_gray;
            }
        }
        else if (blender.liquidLevel === 2) {
            switch (blender.blenderColor()) {
                case "Red": return half_red;
                case "Blu": return half_blue;
                case "Pnk": return half_pink;
                case "Blk": return half_gray;
                case "Ylw": return half_yellow;
                case "Grn": return half_green;
                case "Wht": return half_gray;
            }
        }
        else {
            switch (blender.blenderColor()) {
                case "Red": return quarter_red;
                case "Blu": return quarter_blue;
                case "Pnk": return quarter_pink;
                case "Blk": return quarter_gray;
                case "Ylw": return quarter_yellow;
                case "Grn": return quarter_green;
                case "Wht": return quarter_gray;
            }
        }
    }

    function parsePerformance(): string {
        switch (blender.juiceTitle()) {
            case "Power": return power_medal.src;
            case "Stamina": return stamina_medal.src;
            case "Skill": return skill_medal.src;
            case "Jump": return jump_medal.src;
            case "Speed": return speed_medal.src;
            default: return "";
        }
    }
 
    return (
    <div className={styles.container}>
        <div className={styles.blender}>
            <div className={styles.blender_img_holder}>
                {blendOpen ?
                    <img className={styles.blender_img} src={blender_open.src} draggable="false"
                        onClick={() => {blender.dropLiquid(); props.setTextScreenText(blender.taste().split('\n')); props.updateShowTextScreen(true);}}
                        onDragLeave={() => setBlendOpen(false)}
                        onDragOver={e => {e.preventDefault(); return false}}
                        onDrop={e => {
                            e.stopPropagation();
                            setBlendOpen(false);
                            blender.blend([e.dataTransfer.getData('text/plain') as Apricorn]);
                            return false;
                        }}/> :
                    <img className={styles.blender_img} src={blender_closed.src} draggable="false"
                        onClick={() => {blender.dropLiquid(); props.setTextScreenText(blender.taste().split('\n')); props.updateShowTextScreen(true);}}
                        onDragEnter={() => {setBlendOpen(true);}}/>
                }
                {blender.apricornTotal() > 0 ?
                    <img className={styles.blender_img_fill} src={parseColor().src} draggable="false" loading='lazy'
                        onClick={() => {blender.dropLiquid(); props.setTextScreenText(blender.taste().split('\n')); props.updateShowTextScreen(true);}}
                        onDragEnter={() => {setBlendOpen(true);}}
                        onDragLeave={() => setBlendOpen(false)}
                        onDragOver={e => {e.preventDefault(); return false}}
                        onDrop={e => {
                            e.stopPropagation();
                            setBlendOpen(false);
                            blender.blend([e.dataTransfer.getData('text/plain') as Apricorn]);
                            return false;
                        }} /> : null}
            </div>
            <div className={text_outer}>
                <div className={text_inner}>
                    <div className={styles.text_main}>
                        <div className={styles.line}>{props.text[0]}</div>
                        <div className={styles.line}>{props.text[1]}</div>
                        <div className={styles.line}>{props.text[2]}</div>
                    </div>
                </div>
                <div className={stats}>
                    <div className={`${styles.bar} ${styles.mainBar}`}><img className={styles.medal_icon} src={parsePerformance()} draggable="false" loading='lazy'/>{blender.juiceTitle()} Juice</div>
                    <div className={`${styles.bar} ${styles.flavorBar}`}>Flavor<div className={styles.value}>{blender.flavor}</div></div>
                    <div className={`${styles.bar} ${styles.mildnessBar}`}>Mildness
                        <div className={styles.modify}>
                            <div className={styles.minus} onClick={() => {blender.setMildness(blender.mildness-1); setStatChanged(!statChanged);}}>
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 12H18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className={styles.value}>{blender.mildness}</div>
                            <div className={styles.plus} onClick={() => {blender.setMildness(blender.mildness+1); setStatChanged(!statChanged);}}>
                                <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                    <path d="M6 12H18M12 6V18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Blender;