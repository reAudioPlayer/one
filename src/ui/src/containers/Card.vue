<template>
    <div class="card">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
    .card {
        background: var(--bg-base-lt);
        border-radius: 1em;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

        &:hover {
            background: var(--bg-hover-dk);
        }
    }
</style>