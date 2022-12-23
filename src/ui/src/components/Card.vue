<template>
    <div class="card">
        <slot />
    </div>
</template>
<style lang="scss" scoped>
.card {
    background: var(--background-light);
    border-radius: 1em;
    overflow: hidden;
    padding: 1em;
}
</style>
