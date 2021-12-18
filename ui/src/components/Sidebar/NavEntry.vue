<template>
    <div class="navEntry">
        <span class="material-icons-round icon">{{icon}}</span>
        <span class="name">{{name}}</span>
    </div>
</template>

<script>
export default {
  name: 'NavEntry',
  props: {
      icon: String,
      name: String
  }
}
</script>

<style scoped>
    div.navEntry {
        display: flex;
        flex-direction: row;
        padding: 10px 0 10px 0;
        border-radius: 5px;
        color: var(--font-darker);
    }

    div.navEntry:hover {
        background-color: var(--hover-1);
        cursor: pointer;
        color: var(--font);
    }

    .name {
        font-weight: bold;
    }

    .icon {
        width: 40px;
    }
</style>
