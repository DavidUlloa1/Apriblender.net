import React, { useContext, useState, useEffect } from 'react';

import styles from "./PerfScreen.module.css";
import Apriblender from '@/Apriblender';

import speed_medal from '@/../public/pokeathlon_icons/Pokéathlon_Speed_Medal.png'
import power_medal from '@/../public/pokeathlon_icons/Pokéathlon_Power_Medal.png'
import skill_medal from '@/../public/pokeathlon_icons/Pokéathlon_Skill_Medal.png'
import stamina_medal from '@/../public/pokeathlon_icons/Pokéathlon_Stamina_Medal.png'
import jump_medal from '@/../public/pokeathlon_icons/Pokéathlon_Jump_Medal.png'

import star_empty from '@/../public/stars/star_empty.png'
import star_large from '@/../public/stars/star_large.png'
import star_normal from '@/../public/stars/star_normal.png'
import star_small from '@/../public/stars/star_small.png'

const PerfScreen = (props:{
    blender: Apriblender,
    updateShowPerfScreen: any
}) =>  {
    function splitStars(points:number): number {
        const thresholds = [-120, -80, -40, -15, 14, 39, 79, 119];
        for (let i = 0; i < thresholds.length; i++) {
            if (points <= thresholds[i]) return i - 4;
        }

        return 0;
    }

    function parseValue(flavorIndex: number, value: number, order: number[]) {
        if (value === 0) return (<></>);
        const total = splitStars(value);

        switch(order.indexOf(flavorIndex)) {
            case 0: {
                if (total === 0) return (<img src={star_empty.src} className={styles.icon} />);
                else return Array.from(Array(Math.abs(total)).keys()).map((x, i) => <img key={i} src={star_large.src} className={styles.icon} />)
            }
            case 1: {
                if (total === 0) return (<img src={star_empty.src} className={styles.icon} />);
                else return Array.from(Array(Math.abs(total)).keys()).map((x, i) => <img key={i} src={star_normal.src} className={styles.icon} />)
            }
            case 4: {
                if (total === 0) return (<img src={star_empty.src} className={styles.icon} />);
                else return Array.from(Array(Math.abs(total)).keys()).map((x, i) => <img key={i} src={star_small.src} className={styles.icon} />)
            }
        }

        return (<></>);
    }

    function parseAprifactor() {
        const result = props.blender.apriFactor();
        const order = props.blender.getOrder();

        return (
            <><div className={styles.stat}>
                <div><img src={speed_medal.src} className={styles.small_icon} />Speed</div>
                <div>
                    {parseValue(4, result.Speed, order)}
                </div>
            </div>
            <div className={styles.stat}>
                <div><img src={power_medal.src} className={styles.small_icon} />Power</div>
                <div>
                    {parseValue(0, result.Power, order)}
                </div>
            </div>
            <div className={styles.stat}>
                <div><img src={skill_medal.src} className={styles.small_icon} />Skill</div>
                <div>
                    {parseValue(2, result.Skill, order)}
                </div>
            </div>
            <div className={styles.stat}>
                <div><img src={stamina_medal.src} className={styles.small_icon} />Stamina</div>
                <div>
                    {parseValue(1, result.Stamina, order)}
                </div>
            </div>
            <div className={styles.stat}>
                <div><img src={jump_medal.src} className={styles.small_icon} />Jump</div>
                <div>
                    {parseValue(3, result.Jump, order)}
                </div>
            </div></>
        )
    }

    return (
        <div className={styles.container} onClick={() => props.updateShowPerfScreen(false)}>
            <div className={styles.text_outer}>
                <div className={styles.text_main}>
                    <div className={styles.header}>Aprijuice Potential</div>
                    {parseAprifactor()}
                </div>
            </div>
        </div>
    );
}

export default PerfScreen;