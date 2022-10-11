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
            return this.value / this.max * 100;
        }
    },
    methods: {
        seek(e) {
            const x = e.offsetX;
            const width = this.$el.offsetWidth;
            this.value = x / width * this.max;
            this.$emit('update:modelValue', this.value);
            this.$emit('change', this.value);
        }
    },
    data() {
        return {
            hover: false,
            value: this.modelValue,
        }
    }
}
</script>

<style lang="scss" scoped>

.progressBar {
    width: 100%;
    margin: 0 10px;
}

.progressBar__track {
    position: relative;
    width: 100%;
    height: 5px;
    margin-top: 7px;
    margin: 10px 0;
    border-radius: 1000vmax;
    background-color: var(--font-darkest);
}

.progressBar__progress {
    position: relative;
    height: 5px;
    border-radius: 1000vmax;
    background-color: var(--font-colour);

    &.hover {
        background-color: var(--accent);

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
        background-color: var(--font-colour);
    }
}
</style>