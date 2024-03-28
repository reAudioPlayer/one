/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

const VERSION = 2.0;
const storage = window.localStorage.getItem("renderedIcons");
const renderedIcons: Map<string, string> = storage
    ? new Map(JSON.parse(storage))
    : new Map<string, string>();

export const getCover = async (
    cover: string | null,
    placeholder: string,
    size: number = 500
) => {
    if (cover) return cover;
    return await generatePlaceholder(placeholder, size);
};

const imgSrc = "/assets/img/bg-1024x1024.png";

export const generatePlaceholder = async (
    name: string,
    size: number = 512
): Promise<string> => {
    await document.fonts.ready;

    const key = `${VERSION}-${name}-${size}`;

    if (renderedIcons.has(key)) {
        const src = renderedIcons.get(key);
        return src;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.opacity = "0";
    document.body.appendChild(canvas);

    // resize to parent size
    canvas.height = size;
    canvas.width = size;
    // resize display size (css)
    canvas.style.height = size + "px";
    canvas.style.width = size + "px";

    const img = new Image();
    img.src = imgSrc;

    return await new Promise((resolve) => {
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "white";
            ctx.font = `900 50px 'Poppins'`;
            ctx.textAlign = "center";
            ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
            ctx.shadowBlur = 50;
            ctx.fillText(
                name,
                canvas.width / 2,
                canvas.height / 2 + 72 / 2,
                canvas.width
            );

            // white rectangle in top, full width
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, 14);

            // repeating text "reAudioPlayer" in rectangle
            ctx.fillStyle = "black";
            ctx.font = `400 italic 8px 'Poppins'`;
            ctx.textAlign = "left";
            ctx.fillText(" reAudioPlayer ".repeat(100), 2, 8 + 2);

            // white line in 50px above bottom, horizontal padding of 100px
            const paddingX = 20;
            ctx.fillStyle = "white";
            ctx.font = `600 10px 'Poppins'`;
            ctx.textAlign = "left";
            ctx.fillText(
                name?.toUpperCase() ?? name,
                paddingX,
                canvas.height - 35 + 8 + 2
            );
            const offsetX = ctx.measureText(name).width + paddingX + 16;

            ctx.fillStyle = "white";
            ctx.fillRect(
                offsetX,
                canvas.height - 30,
                canvas.width - offsetX - paddingX,
                2
            );
            const src = canvas.toDataURL();
            renderedIcons.set(key, src);

            resolve(src);
        };
    });
};
