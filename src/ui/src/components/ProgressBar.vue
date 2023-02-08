<!--
  - Copyright (c) 2023, reAudioPlayer ONE.
  - Licenced under the GNU General Public License v3.0
  -->

<template>
    <div ref="el" class="progressBar" @click="seek" @mouseenter="hover = true" @mouseleave="hover = false">
        <div class="progressBar__track">
            <div :class="{ hover }" :style=" { width: `${percentage}%` } " class="progressBar__progress"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        max: {
            type: Number,
            default: 100
        },
    },
    watch: {
        modelValue() {
            this.value = this.modelValue;
        }
    },
    computed: {
        percentage() {
            return Math.min(1, this.value / this.max) * 100;
        }
    },
    methods: {
        seek(e) {
            const x = e.offsetX;
            const width = this.$el.offsetWidth;
            this.value = x / width * this.max;
            this.$emit('change', this.value);

            try {
                this.$emit('update:modelValue', this.value);
            } catch (_) { }
        }
    },
    data() {
        return {
            hover: false,
            value: this.modelValue || 0,
        }
    }
}
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
            content: '';
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
