import React, { useContext, useState, useEffect } from 'react';
import Image, { StaticImageData } from "next/image";

import styles from "./HistoryScreen.module.css";

import red_apricorn from '@/../public/apricorns/Red Apricorn.png'
import blu_apricorn from '@/../public/apricorns/Blu Apricorn.png'
import pnk_apricorn from '@/../public/apricorns/Pnk Apricorn.png'
import blk_apricorn from '@/../public/apricorns/Blk Apricorn.png'
import ylw_apricorn from '@/../public/apricorns/Ylw Apricorn.png'
import grn_apricorn from '@/../public/apricorns/Grn Apricorn.png'
import wht_apricorn from '@/../public/apricorns/Wht Apricorn.png'

import speed_medal from '@/../public/pokeathlon_icons/Pokéathlon_Speed_Medal.png'
import power_medal from '@/../public/pokeathlon_icons/Pokéathlon_Power_Medal.png'
import skill_medal from '@/../public/pokeathlon_icons/Pokéathlon_Skill_Medal.png'
import stamina_medal from '@/../public/pokeathlon_icons/Pokéathlon_Stamina_Medal.png'
import jump_medal from '@/../public/pokeathlon_icons/Pokéathlon_Jump_Medal.png'

import Apriblender, { Apricorn, Recipe, Performance, Flavors } from '@/Apriblender';
import { parse } from 'path';

const HistoryScreen = (props:{
    updateShowHistoryScreen: any,
    blenderMemory: Recipe[],
    setBlender: any
}) =>  {
    const [didUpdate, setDidUpdate] = useState<boolean>(false);

    function parseMedal(perf: Performance) {
        switch (perf) {
            case "Power": return <img src={power_medal.src} className={styles.icon} />;
            case "Stamina": return <img src={stamina_medal.src} className={styles.icon} />;
            case "Skill": return <img src={skill_medal.src} className={styles.icon} />;
            case "Jump": return <img src={jump_medal.src} className={styles.icon} />;
            case "Speed": return <img src={speed_medal.src} className={styles.icon} />;
        }
    }

    function parseRecipe(recipe: Apricorn[]) {
        return recipe.map((apricorn, index) => {
            let src: string;
            switch (apricorn) {
                case "Red": src = red_apricorn.src; break;
                case "Blu": src = blu_apricorn.src; break;
                case "Pnk": src = pnk_apricorn.src; break;
                case "Blk": src = blk_apricorn.src; break;
                case "Ylw": src = ylw_apricorn.src; break;
                case "Grn": src = grn_apricorn.src; break;
                case "Wht": src = wht_apricorn.src; break;
            }

            return (
                <img key={index} src={src} className={styles.icon} />
            )
        })
    }

    function restore(index:number): void {
        props.setBlender(new Apriblender(props.blenderMemory[index]["Flavors"].map(a => a) as Flavors, props.blenderMemory[index]["Mildness"], props.blenderMemory[index]["Recipe"].map(a => a), 3));
    }

    function parseMemory() {
        return props.blenderMemory.map((recipe, index) => {
            return (
                <div key={index} className={styles.tr} onClick={e => {e.stopPropagation(); restore(index); props.updateShowHistoryScreen(false);}}>
                    <div className={styles.td}>
                        {parseMedal(recipe["Perf"])}
                    </div>
                    <div className={styles.td}>
                        {parseRecipe(recipe["Recipe"])}
                    </div>
                    <div className={styles.td}>{props.blenderMemory[index]["Flavors"].reduce((a, b) => a + b, 0)}</div>
                    <div className={styles.td}>{props.blenderMemory[index]["Mildness"]}</div>
                    <div className={styles.td}>
                        {/* <div className={styles.btn_restore} onClick={() => restore(index)}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M11.5 20.5C6.80558 20.5 3 16.6944 3 12C3 7.30558 6.80558 3.5 11.5 3.5C16.1944 3.5 20 7.30558 20 12C20 13.5433 19.5887 14.9905 18.8698 16.238M22.5 15L18.8698 16.238M17.1747 12.3832L18.5289 16.3542L18.8698 16.238" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div> */}
                        <div className={styles.btn_delete} onClickCapture={e => {e.stopPropagation(); props.blenderMemory.splice(index, 1); setDidUpdate(!didUpdate)}}>
                            <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                <path d="M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M14 10V17M10 10V17" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
            )
        });
    }

    return (
        <div className={styles.container} onClick={() => props.updateShowHistoryScreen(false)}>
            <div className={styles.text_outer}>
                <div className={styles.text_main}>
                    <div className={styles.header}>Saved Recipes</div>
                    {props.blenderMemory.length > 0 ?
                        <div className={styles.tr_header}>
                            <div className={styles.td}></div>
                            <div className={styles.td}>Recipe</div>
                            <div className={styles.td}>Flavor</div>
                            <div className={styles.td}>Mild.</div>
                            <div className={styles.td}></div>
                        </div> : null}
                    {parseMemory()}
                </div>
            </div>
        </div>
    );
}

export default HistoryScreen;