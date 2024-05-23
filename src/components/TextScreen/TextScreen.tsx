import React, { useContext, useState, useEffect } from 'react';

import styles from "./TextScreen.module.css";

const TextScreen = (props:{
    text: string[];
    updateShowTextScreen: any
}) =>  {
    return (
        <div className={styles.container} onClick={() => props.updateShowTextScreen(false)}>
            <div className={styles.text_outer}>
                <div className={styles.text_main}>
                    {props.text.map((value, index) => {
                        return <div key={index} className={styles.line}>{value}</div>
                    })}
                </div>
            </div>
        </div>
    );
}

export default TextScreen;