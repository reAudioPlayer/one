<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<script lang="ts" setup>
import { PropType, ref, onMounted } from "vue";
import { getCover } from "./placeholder";
import { applyBoxShadow } from "../../helpers/accent";
import window from "@/themes";

const props = defineProps({
    type: {
        type: String as PropType<"track" | "playlist">,
        required: false,
        default: "track",
    },
    name: {
        type: String,
        required: false,
    },
    withAmbient: {
        type: Boolean,
        required: false,
        default: false,
    },
    ambientOpacity: {
        type: Number,
        required: false,
        default: 0.2,
    },
});

const imgSrc = "/assets/img/bg-1024x1024.png";

const canvas = ref(null as HTMLCanvasElement | null);

const src = ref("");

onMounted(() => {
    if (!canvas.value) return;

    const ctx = canvas.value.getContext("2d");
    if (!ctx) return;

    const parentWidth = 1024;
    // resize to parent size
    canvas.value.height = parentWidth;
    canvas.value.width = parentWidth;
    // resize display size (css)
    canvas.value.style.height = parentWidth + "px";
    canvas.value.style.width = parentWidth + "px";

    const img = new Image();
    img.src = imgSrc;
    img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.value.width, canvas.value.height);

        let black = new FontFace(
            "Poppins Black",
            "url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2)"
        );
        let bold = new FontFace(
            "Poppins Bold",
            "url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2)"
        );
        let light = new FontFace(
            "Poppins Light",
            "url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2)"
        );

        const title = props.name;
        document.fonts.add(black);
        document.fonts.add(bold);
        document.fonts.add(light);

        ctx.font = `100px 'Poppins Black'`;

        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.shadowColor = "rgba(0, 0, 0, 0.7)";
        ctx.shadowBlur = 50;
        ctx.fillText(
            title,
            canvas.value.width / 2,
            canvas.value.height / 2 + 72 / 2,
            canvas.value.width
        );

        // white rectangle in top, full width
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.value.width, 14);

        // repeating text "reAudioPlayer" in rectangle
        ctx.fillStyle = "black";
        ctx.font = `italic 8px 'Poppins Black'`;
        ctx.textAlign = "left";
        ctx.fillText(" reAudioPlayer ".repeat(100), 2, 8 + 2);

        // white line in 50px above bottom, horizontal padding of 100px
        const paddingX = 30;
        ctx.fillStyle = "white";
        ctx.font = `14px 'Poppins Bold'`;
        ctx.textAlign = "left";
        ctx.fillText(
            title?.toUpperCase() ?? title,
            paddingX,
            canvas.value.height - 35 + 8 + 2
        );
        const offsetX = ctx.measureText(title).width + paddingX + 16;

        ctx.fillStyle = "white";
        ctx.fillRect(
            offsetX,
            canvas.value.height - 30,
            canvas.value.width - offsetX - paddingX,
            2
        );

        // repeating icon in bottom right corner
        /*
        const icon = `${props.type} `.toUpperCase();
        const iconPadding = paddingX;
        const iconOffsetY = canvas.value.height - iconPadding + 4;
        ctx.fillStyle = "white";
        ctx.font = `8px 'Poppins Light'`;
        ctx.fillText(icon.repeat(35), paddingX, iconOffsetY);*/

        src.value = canvas.value.toDataURL();
    };
});
</script>
<template>
    <canvas class="placeholder hidden" ref="canvas" />
    <img class="cover rounded-md" title="placeholder" :src="src" />
</template>

<style>
canvas {
    width: 1024px;
    height: 1024px;
}
</style>
