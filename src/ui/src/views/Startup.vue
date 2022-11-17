<script setup>
import Loader from "@/components/Loader";
import Logo from '/src/assets/images/logo/logo.svg'
</script>
<template>
    <div class="startup">
        <div class="wrap">
            <div class="logo">
                <Logo />
            </div>
            <Loader />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.startup {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .wrap {
        width: 80%;
    }

    .logo {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 100%;
        align-items: center;

        svg {
            fill: var(--font-colour);
            padding: 10px;
            translate: 5px 5px;
            height: 100%;
            max-width: 400px;
        }

        p {
            font-size: 1em;
            color: var(--font-colour);
            z-index: 1;
            margin-left: 50px;
        }
    }
}
</style>
