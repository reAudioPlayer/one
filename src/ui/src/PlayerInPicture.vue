<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div v-if="!disabled" ref="player" class="playerInPicture">
        <div :class="{ minimised }" class="header">
            <div class="title">
                <Marquee :text="name" />
            </div>
            <div class="buttons">
                <span
                    class="material-symbols-rounded ms-wght-200"
                    @click="minimised = !minimised"
                    >{{ minimised ? "zoom_out_map" : "zoom_in_map" }}</span
                >
                <span
                    class="material-symbols-rounded ms-wght-500"
                    @click="disabled = !disabled"
                    >close</span
                >
            </div>
        </div>
        <div :class="{ minimised }" class="frame" v-html="el" />
    </div>
</template>

<script>
import Marquee from "@/components/Marquee.vue";
import { usePlayerStore } from "@/store/player";

export const playInPicture = (title, artist, source) => {
    const event = new CustomEvent("player.play", {
        detail: {
            title,
            artist,
            source,
        },
    });
    window.dispatchEvent(event);
};

export default {
    components: {
        Marquee,
    },
    name: "PlayerInPicture",
    props: {
        expandCover: Boolean,
    },
    watch: {
        disabled() {
            if (this.disabled) {
                return;
            }

            this.$nextTick(() => {
                this.$refs.player.addEventListener(
                    "mousedown",
                    this.mouseDown,
                    false
                );
                window.addEventListener("mouseup", this.mouseUp, false);
            });
        },
    },
    methods: {
        mouseDown(evt) {
            const divid = this.$refs.player;
            const container = document.getElementById("appRoot");

            evt = evt || window.event;

            var posX = evt.clientX,
                posY = evt.clientY,
                divTop = divid.offsetTop,
                divLeft = divid.offsetLeft,
                eWi = parseInt(divid.offsetWidth),
                eHe = parseInt(divid.offsetHeight),
                cWi = parseInt(container.offsetWidth) - 8,
                cHe = parseInt(container.offsetHeight) - 8;

            container.style.cursor = "move";
            var diffX = posX - divLeft,
                diffY = posY - divTop;

            document.onmousemove = (evt) => {
                evt = evt || window.event;
                evt.preventDefault();
                evt.stopPropagation();
                var posX = evt.clientX,
                    posY = evt.clientY,
                    aX = posX - diffX,
                    aY = posY - diffY;
                if (aX < 8) aX = 8;
                if (aY < 8) aY = 8;
                if (aX + eWi > cWi) aX = cWi - eWi;
                if (aY + eHe > cHe) aY = cHe - eHe;
                this.divMove(divid, aX, aY);
            };
        },
        mouseUp() {
            document.getElementById("appRoot").style.cursor = "default";
            document.onmousemove = function () {};
        },
        divMove(divid, xpos, ypos) {
            divid.style.bottom = "auto";
            divid.style.right = "auto";

            divid.style.left = xpos + "px";
            divid.style.top = ypos + "px";
        },
    },
    data() {
        const player = usePlayerStore();

        window.addEventListener(
            "player.play",
            (e) => {
                const song = e.detail;
                const url = song.source;
                this.name = `${song.artist} - ${song.title}`;

                player.pause();

                if (url.includes("youtu")) {
                    var myregexp =
                        /youtu(?:.*\/v\/|.*v\=|\.be\/)([A-Za-z0-9_\-]{11})/;
                    const matches = url.match(myregexp);

                    if (matches?.[1]) {
                        this.el = `<iframe height="70" src="https://www.youtube.com/embed/${matches[1]}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

                        this.minimised = false;
                        this.disabled = false;
                        return;
                    }
                }

                if (url.includes("audius")) {
                    var myregexp =
                        /audius.co\/([A-Za-z0-9]+)\/([A-Za-z0-9\-]+)/;
                    const matches = url.match(myregexp);
                    console.log(matches, url);

                    if (matches?.[1] && matches?.[2]) {
                        fetch(
                            `https://blockdaemon-audius-discovery-01.bdnodes.net/v1/full/tracks?handle=${matches[1]}&slug=${matches[2]}`
                        )
                            .then((x) => x.json())
                            .then((jdata) => {
                                const id = jdata.data.id;
                                this.el = `<iframe src=https://audius.co/embed/track/${id}?flavor=card width="100%" height="100%" allow="encrypted-media" style="border: none;"></iframe>`;
                            });
                        this.minimised = false;
                        this.disabled = false;
                        return;
                    }
                }

                if (url.includes("spotify")) {
                    var myregexp =
                        /spotify(?:.*\/(album|track|playlist)\/)([A-Za-z0-9_\-]{22})/;
                    const matches = url.match(myregexp);

                    if (matches?.[1]) {
                        console.log(matches);
                        this.el = `<iframe src="https://open.spotify.com/embed/${matches[1]}/${matches[2]}?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>`;

                        this.minimised = false;
                        this.disabled = false;
                        return;
                    }
                }

                if (url.includes("soundcloud")) {
                    fetch(
                        `https://soundcloud.com/oembed?url=${url}&format=json`
                    )
                        .then((x) => x.json())
                        .then((jdata) => {
                            this.el = jdata.html
                                .replace('height="400"', 'height="70"')
                                .replace(
                                    "&show_artwork=true",
                                    "&show_artwork=true&auto_play=true"
                                )
                                .replace(
                                    "<iframe",
                                    '<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"'
                                );
                        });
                    this.minimised = false;
                    this.disabled = false;
                }
            },
            false
        );

        return {
            el: null,
            minimised: true,
            disabled: true,
            name: "",
            track: false,
        };
    },
};
</script>

<style lang="scss">
$mobileWidth: 950px;

.playerInPicture {
    position: absolute;

    top: calc(100% - 375px - 48px);
    left: calc(100% - 30% - 8px);

    z-index: 2000;
    width: 30%;

    @media screen and (max-width: $mobileWidth) {
        width: calc(100% - 16px);
        left: 8px !important;
        bottom: 8px !important;
    }

    border-radius: 8px;
    display: flex;
    flex-direction: column;
    background: var(--bg-base-lt);
    overflow: hidden;
    box-shadow: 0 0 100px 3px rgba(0, 0, 0, 0.8);

    .header {
        padding: 0px 8px 8px 8px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        transform: translateY(8px);

        .title {
            font-size: 0.8em;
            color: var(--fg-base-dk);
            display: flex;
            flex-direction: column;
            justify-content: center;
            max-width: calc(100% - 48px - 8px);
            width: 100%;
        }

        .buttons {
            width: 48px;
            height: 24px;

            span:hover {
                cursor: pointer;
            }
        }

        &.minimised {
            margin-bottom: 8px;
        }
    }

    .frame {
        flex-grow: 1;
        min-height: 300px;

        &.minimised {
            display: none;
        }
    }

    iframe {
        min-height: 300px;
        width: 100%;
        transform: translateY(8px);
    }
}
</style>
