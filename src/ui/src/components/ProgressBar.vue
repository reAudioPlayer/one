<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div
        ref="el"
        class="progressBar"
        @mousedown="seeking = true"
        @dragover.stop
        @click="seek"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
    >
        <div class="progressBar__track">
            <div
                :class="{ hover }"
                :style="{ width: `${percentage}%` }"
                class="progressBar__progress"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            default: 100,
        },
    },
    watch: {
        modelValue() {
            this.value = this.modelValue;
        },
    },
    computed: {
        percentage() {
            return Math.min(1, this.value / this.max) * 100;
        },
    },
    methods: {
        seek(e, preview = false) {
            const rect = this.$el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const width = this.$el.offsetWidth;
            this.value = (x / width) * this.max;

            if (!preview) {
                this.seeking = false;
                this.$emit("change", this.value);

                this.$emit("update:modelValue", this.value);
            }
        },
    },
    data() {
        return {
            hover: false,
            value: this.modelValue || 0,
            seeking: false,
        };
    },
    mounted() {
        window.addEventListener("mouseup", (e) => {
            if (this.seeking) {
                this.seeking = false;
                this.seek(e);
            }
        });
        window.addEventListener("mousemove", (e) => {
            if (this.seeking) {
                this.seek(e, true);
            }
        });
    },
};
</script>

<style lang="scss" scoped>
.progressBar {
}

.progressBar__track {
    position: relative;
    width: 100%;
    height: 5px;
    margin-top: 7px;
    margin: 10px 0;
    border-radius: 1000vmax;
    background-color: var(--fg-base-dkr);
}

.progressBar__progress {
    position: relative;
    height: 5px;
    border-radius: 1000vmax;
    background-color: var(--fg-base);

    &.hover {
        background-color: var(--fg-secondary);

        &:after {
            content: "";
        }
    }

    &:after {
        position: absolute;
        top: -5px;
        right: -5px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background-color: var(--fg-base);
    }
}
</style>
