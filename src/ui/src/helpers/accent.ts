/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */


import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import { useSettingsStore } from "../store/settings";

const fac = new FastAverageColor();

const applyOpacity = (colour: FastAverageColorResult, opacity: number) => {
    const hex = colour.hex;
    const alpha = Math.round(opacity * 255).toString(16);
    return hex + alpha;
}

export const applyBoxShadow = async (element: HTMLImageElement, src: string, opacity: number = 0.25) => {
    const settings = useSettingsStore();
    if (!settings.ambient) return;

    var sizeX = element.width / 100;
    var sizeY = element.height / 100;

    var width = element.naturalWidth;
    var height = element.naturalHeight;

    const colours = await Promise.all([
        fac.getColorAsync(src, { height: sizeY }),
        fac.getColorAsync(src, { left: width - sizeX, width: sizeX }),
        fac.getColorAsync(src, { width: sizeX }),
        fac.getColorAsync(src, { top: height - sizeY, height: sizeY }),
    ]);

    sizeX *= 40;
    sizeY *= 40;

    var colorTop = applyOpacity(colours[0], opacity);
    var colorRight = applyOpacity(colours[1], opacity);
    var colorBottom = applyOpacity(colours[2], opacity);
    var colorLeft = applyOpacity(colours[3], opacity);

    const spread = " 10px"
    const blur = ` ${sizeX}px `;
    //const blur = ` 0px `;
    const deltaX = sizeX + 'px';
    const deltaY = sizeY + 'px';

    element.style.boxShadow = [
        "0 -".concat(deltaY, " ").concat(blur, " ").concat(spread, " ").concat(colorTop),
        "".concat(deltaX, " 0 ").concat(blur, " ").concat(spread, " ").concat(colorRight),
        "0 ".concat(deltaY, " ").concat(blur, " ").concat(spread, " ").concat(colorBottom),
        "-".concat(deltaX, " 0 ").concat(blur, " ").concat(spread, " ").concat(colorLeft),
    ].join(', ');
};

export const applyGradient = async (element: HTMLElement, src: string, direction = "to top right", opacity = 0.2) => {
    const settings = useSettingsStore();
    if (!settings.ambient) return;

    const colour = await fac.getColorAsync(src);
    const hex = applyOpacity(colour, opacity);
    const gradient = `linear-gradient(${direction}, ${hex}, transparent)`;

    element.style.background = gradient;
}
