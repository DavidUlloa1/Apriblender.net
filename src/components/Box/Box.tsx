'use client'

import React, { useContext, useState, useEffect } from 'react';

import Image from "next/image";
import styles from "./Box.module.css";

import red_apricorn from '@/../public/apricorns/Red Apricorn.png'
import blu_apricorn from '@/../public/apricorns/Blu Apricorn.png'
import pnk_apricorn from '@/../public/apricorns/Pnk Apricorn.png'
import blk_apricorn from '@/../public/apricorns/Blk Apricorn.png'
import ylw_apricorn from '@/../public/apricorns/Ylw Apricorn.png'
import grn_apricorn from '@/../public/apricorns/Grn Apricorn.png'
import wht_apricorn from '@/../public/apricorns/Wht Apricorn.png'

import empty_apricorn from '@/../public/apricorns/Empty Apricorn.png'

const Box = (props:{
    updateTextFunc: any,
    updateShowStats: any,
    reset: any
}) => {
    function hoverIn(color: string | null) {
        props.updateTextFunc(color);
        props.updateShowStats(false);
    }

    function hoverOut() {
        props.updateTextFunc(null);
        props.updateShowStats(true);
    }

    return (
        <div className={styles.container}>
            <div className={styles.box_outer}>
            <div className={styles.box_main}>
                <div className={styles.corn_left}>
                    <div className={styles.icon}><img className={styles.apricorn} src={red_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("red")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Red"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = red_apricorn.src}}/></div>
                    <div className={styles.icon}><img className={styles.apricorn} src={blu_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("blu")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Blu"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = blu_apricorn.src}}/></div>
                    <div className={styles.icon}><img className={styles.apricorn} src={pnk_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("pnk")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Pnk"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = pnk_apricorn.src}}/></div>
                    <div className={styles.icon}><img className={styles.apricorn} src={blk_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("blk")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Blk"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = blk_apricorn.src}}/></div>
                </div>
                <div className={styles.corn_right}>
                    <div className={styles.icon}><img className={styles.apricorn} src={ylw_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("ylw")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Ylw"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = ylw_apricorn.src}}/></div>
                    <div className={styles.icon}><img className={styles.apricorn} src={grn_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("grn")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Grn"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = grn_apricorn.src}}/></div>
                    <div className={styles.icon}><img className={styles.apricorn} src={wht_apricorn.src} draggable="true"
                        onMouseEnter={() => hoverIn("wht")}
                        onMouseLeave={hoverOut}
                        onDragStart={e => {e.currentTarget.src = empty_apricorn.src; e.dataTransfer.setData("text/plain", "Wht"); props.updateShowStats(true)}}
                        onDragEnd={e => {e.currentTarget.src = wht_apricorn.src}}/></div>
                    <div className={styles.title} onClick={props.reset}>
                        <p className={styles.text}>Reset</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Box;