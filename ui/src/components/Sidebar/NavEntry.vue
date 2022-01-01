<template>
    <router-link class="link" :to="href">
        <div class="navEntry">
            <span class="material-icons-round icon">{{icon}}</span>
            <span class="name">{{name}}</span>
        </div>
    </router-link>
</template>

<script>
export default {
  name: 'NavEntry',
  props: {
      icon: String,
      name: String,
      href: String
  }
}
</script>

<style scoped>
    .link {
        text-decoration: none;
    }

    div.navEntry {
        display: flex;
        flex-direction: row;
        padding: 10px 0 10px 0;
        border-radius: 5px;
        color: var(--font-darker);
    }

    div.navEntry:hover, .router-link-active div.navEntry {
        background-color: var(--hover-2);
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
