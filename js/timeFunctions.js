function getFirstHour (currentTime) {
    const firstHour = new Date(currentTime);
    firstHour.setUTCHours(0, 1, 0, 0);
    return firstHour.getTime();
}

function getLastHour (currentTime) {
    const lastHour = new Date(currentTime);
    lastHour.setUTCDate(lastHour.getUTCDate() + 1);
    lastHour.setUTCHours(0, 0, 0, 0);
    return lastHour.getTime();
}

function progressionCalc (currentTime, time1, time2){
    const elapsedTime = currentTime - time1;
    const totalDuration = time2 - time1;
    const progression = (elapsedTime / totalDuration) * 100;
    return progression;
}

function getBackgroundByPercent (percent, ranges) {
    for (let range of ranges) {
        if (percent <= range.max) {
            return range.background;
        }
    }
}

export function getTimeBackground (currentTime, sunrise, sunset) {
    let timePercent;
    const firstHour = getFirstHour(currentTime);
    const lastHour = getLastHour(currentTime);
    
    // console.log(`Time: ${currentTime}`);
    // console.log(`Sunrise: ${sunrise}`);
    // console.log(`Sunset: ${sunset}`);

    // console.log(`Midnight Unix: ${firstHour}`);
    // console.log(`Next Unix: ${lastHour}`);

    if (currentTime < sunrise) {
        timePercent = progressionCalc(currentTime, firstHour, sunrise).toFixed(2);
        console.log(`Before Sunrise. Test %: ${timePercent}`);
        return getBackgroundByPercent(timePercent, [
            { max: 20, background: 'time0' },
            { max: 30, background: 'time1' },
            { max: 40, background: 'time2' },
            { max: 50, background: 'time3' },
            { max: 60, background: 'time4' },
            { max: 70, background: 'time5' },
            { max: 90, background: 'time6' },
            { max: 100, background: 'time7' }
        ]);
    }

    if (currentTime < sunset) {
        timePercent = progressionCalc(currentTime, sunrise, sunset).toFixed(2);
        console.log(`Before Sunset. Test %: ${timePercent}`);
        return getBackgroundByPercent(timePercent, [
            { max: 5, background: 'time8' },
            { max: 15, background: 'time9' },
            { max: 25, background: 'time10' },
            { max: 35, background: 'time11' },
            { max: 45, background: 'time12' },
            { max: 80, background: 'time13' },
            { max: 84, background: 'time14' },
            { max: 87, background: 'time15' },
            { max: 92, background: 'time16' },
            { max: 95, background: 'time17' },
            { max: 100, background: 'time18' }
        ]);
    }

    if (currentTime > sunset) {
        timePercent = progressionCalc(currentTime, sunset, lastHour).toFixed(2);
        console.log(`After Sunset. Test %: ${timePercent}`);
        return getBackgroundByPercent(timePercent, [
            { max: 2, background: 'time19' },
            { max: 3, background: 'time20' },
            { max: 4, background: 'time21' },
            { max: 5, background: 'time22' },
            { max: 100, background: 'time23' }
        ]);
    }
}
