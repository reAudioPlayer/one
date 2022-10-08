<template>
    <div class="error">
        <h1 v-html="msg" />
    </div>
</template>

<script>
export default {
    name: "Error",
    props: {
        msg: String
    },
    methods: {
        toggleSidebar()
        {
            this.$emit("toggleSidebar")
        }
    }
}
</script>

<style>
.error h1 p.smaller {
	font-weight: normal;
	font-size: 0.5em;
}
 .error h1 p.muted {
	color: var(--font-darker);
}
 .error h1 p.accent {
	color: var(--accent);
}
 
</style>

<style scoped>
    .mobileMenu {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }

    .error {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-content: center;
        text-align: center;
    }
</style>