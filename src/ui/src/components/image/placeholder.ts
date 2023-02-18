/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */


const renderedIcons = new Map<string, string>();


export const getCover = (cover: string | null, placeholder: string, size: number = 500) => {
    if (!cover) {
        return generatePlaceholder(placeholder, size);
    }

    return cover;
}


export const generatePlaceholder = async (icon: string, size: number = 500) => {
    await document.fonts.ready;

    const key = `${icon}-${size}`;

    if (renderedIcons.has(key)) {
        const src = renderedIcons.get(key);
        return src;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const fgBase = getComputedStyle(document.documentElement).getPropertyValue('--fg-base');
    const bgGradient = getComputedStyle(document.documentElement).getPropertyValue('--bg-gradient');
    const stop1 = bgGradient.match(/(#[0-9a-f]{3,6})/g)[0];
    const stop2 = bgGradient.match(/(#[0-9a-f]{3,6})/g)[1];
    const gradient = ctx.createLinearGradient(size, 0, 0, size);
    gradient.addColorStop(0, stop1);
    gradient.addColorStop(1, stop2);

    const baseHeight = size;

    ctx.canvas.width = baseHeight
    ctx.canvas.height = baseHeight;

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, baseHeight, baseHeight);

    ctx.font = `300 ${baseHeight}px Material Symbols Rounded`;
    ctx.fillStyle = fgBase;
    ctx.fillText(icon,0, baseHeight);

    const src = canvas.toDataURL();
    renderedIcons.set(key, src);
    return src;
};
