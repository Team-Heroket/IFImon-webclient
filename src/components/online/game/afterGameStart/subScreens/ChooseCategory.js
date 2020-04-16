/*
    This component is displayed from 0 to 15 seconds

    If TurnPlayer is me, I get to be able to choose a category and call the put request
    If TurnPlayer is not me, I just get to see my card and not hte others.

    Next screen displayed is "Evolve"
 */


import React from "react";
import {api, handleError} from "../../../../../helpers/api";

let category;
category = {
    HEIGHT: "HEIGHT",
    WEIGHT: "WEIGHT",
    CAPTURERATE: "CAPTURERATE",
    ATTACKPOINTS: "ATTACKPOINTS",
    DEFENSEPOINTS: "DEFENSEPOINTS"
}

export let ChooseCategory = ({masterState}) => {


    //This function should be evoked after 10 seconds (masterState.startTime+10000 - new Date().getTime()) BUT ONLY IF YOU ARE TURNPLAYER
    async function makeTurn() {

        let category = masterState.chosenCategory;
        if (!category) {
            let categories = [category.HEIGHT, category.WEIGHT, category.CAPTURERATE, category.ATTACKPOINTS, category.DEFENSEPOINTS];
            let randomIndex = Math.floor(Math.random() * Math.floor(categories.length));
            category = categories[randomIndex]
            console.log("Random Category: "+category);
        }

        try {
            console.log("Tried getting game info");
            const requestBody = JSON.stringify({
                category: category
            });
            const response = await api.put('/games/'+masterState.pokeCode+'/categories',requestBody , { headers: {'Token': localStorage.getItem('token')}});

        } catch (error) {
            alert(`Something went wrong: \n${handleError(error)}`);
        }

    }

    return (
        <div>
            <h1>CategoryChosen</h1>
            <h1>TimeRemaining: {masterState.startTime+15000 - new Date().getTime()}</h1>
        </div>

    );
};