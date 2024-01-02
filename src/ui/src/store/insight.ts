/*
 * Copyright (c) 2023, reAudioPlayer ONE.
 * Licenced under the GNU General Public License v3.0
 */

import { defineStore } from "pinia";
import { watch } from "vue";
import { usePlayerStore } from "./player";
import { LoudnessMeter } from "@domchristie/needles";
import { correlation, getData, stereoField } from "../helpers/correlationMeter";
import { useRoute } from "vue-router";

export const useInsightStore = defineStore({
    id: "insights",
    state: () => ({
        stereo: {
            left: 0,
            right: 0,
            correlation: 0,
            field: [] as { x: number; y: number }[],
            _analyserL: null as any | null,
            _analyserR: null as any | null,
        },
        tonalBalance: {
            data: null as Uint8Array | null,
            _analyser: null as any | null,
        },
        truePeak: {
            left: -Infinity,
            right: -Infinity,
        },
        loudness: {
            momentary: -Infinity,
            shortterm: -Infinity,
            integrated: -Infinity,
        },
        _meter: null as any | null,
    }),
    actions: {
        _reset() {
            this.stereo.left = 0;
            this.stereo.right = 0;
            this.truePeak.left = -Infinity;
            this.truePeak.right = -Infinity;
            this.loudness.momentary = -Infinity;
            this.loudness.shortterm = -Infinity;
            this.loudness.integrated = -Infinity;
        },
        setSource(source: MediaElementAudioSourceNode, context: AudioContext) {
            this._meter = new LoudnessMeter({
                source,
                workerUri: "/assets/needles/needles-worker.js",
            });
            this._meter?.start();
            this._meter?.pause();

            this.stereo.analyserL = context.createAnalyser();
            this.stereo.analyserR = context.createAnalyser();
            this.tonalBalance.analyser = context.createAnalyser();

            this.tonalBalance.analyser.fftSize = 256;
            source.connect(this.tonalBalance.analyser);
            this.tonalBalance.data = new Uint8Array(
                this.tonalBalance.analyser.frequencyBinCount
            );

            var splitter = context.createChannelSplitter(2);
            source.connect(splitter);
            splitter.connect(this.stereo.analyserR, 1);
            splitter.connect(this.stereo.analyserL, 0);
            this._stereo();
        },
        _stereo() {
            const route = useRoute();

            const pcmDataR = new Float32Array(this.stereo.analyserR.fftSize);
            const pcmDataL = new Float32Array(this.stereo.analyserL.fftSize);
            const onFrame = () => {
                if (route.path !== "/player/insights") {
                    window.requestAnimationFrame(onFrame);
                    return;
                }

                this.tonalBalance.analyser.getByteFrequencyData(
                    this.tonalBalance.data
                );

                this.stereo.analyserR.getFloatTimeDomainData(pcmDataR);
                this.stereo.analyserL.getFloatTimeDomainData(pcmDataL);
                let sumR = 0.0;
                let sumL = 0.0;
                for (const amplitude of pcmDataR) {
                    sumR += amplitude * amplitude;
                }
                for (const amplitude of pcmDataL) {
                    sumL += amplitude * amplitude;
                }
                this.stereo.right = Math.sqrt(sumR / pcmDataR.length);
                this.stereo.left = Math.sqrt(sumL / pcmDataL.length);

                this.stereo.data = getData(
                    this.stereo.analyserL,
                    this.stereo.analyserR
                );
                this.stereo.correlation = correlation(this.stereo.data);
                this.stereo.field = stereoField(this.stereo.data);

                window.requestAnimationFrame(onFrame);
            };
            window.requestAnimationFrame(onFrame);
        },
        initialise() {
            const player = usePlayerStore();
            watch(
                () => player.song,
                () => {
                    this._reset();
                    this._meter?.reset();
                    this._meter?.on("dataavailable", (e: any) =>
                        this._setLoudness(e.data.mode, e.data.value)
                    );
                }
            );
            watch(
                () => player.playing,
                () => {
                    if (player.playing) {
                        this._meter?.resume();
                    } else {
                        this._meter?.pause();
                    }
                }
            );
        },
        _setLoudness(mode: string, value: number) {
            switch (mode) {
                case "momentary":
                    this.loudness.momentary = Math.max(
                        this.loudness.momentary,
                        value
                    );
                    break;
                case "short-term":
                    this.loudness.shortterm = value;
                    break;
                case "integrated":
                    this.loudness.integrated = value;
                    break;
            }
        },
    },
});
