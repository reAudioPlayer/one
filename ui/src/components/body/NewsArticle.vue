<template>
    <Error v-if="error" :msg="error" />
    <Loader v-else-if="!article.headline" />
    <div v-else class="padding-20 newsArticle">
        <span @click="fullWidth = !fullWidth" class="toggleWidth material-icons-round">{{fullWidth ? "close_fullscreen" : "open_in_full"}}</span>
        <div class="wrapper" :class="{ slim: !fullWidth }">
            <h5 class="accentLink topic" v-html="article.topic" />
            <h1 class="headline">{{article.headline}}</h1>
            <h4 class="standfirst" v-html="article.standfirst" />
            <h5 v-if="article.date" class="date">{{article.date}}, <a :href="article.href">{{article.href}}</a></h5>
            <hr v-if="article.body">
            <div class="body" v-html="article.body" />
        </div>
    </div>
</template>

<script>
    import Loader from "@/components/Loader.vue"
    import Error from "@/components/Error.vue"

    export default {
        name: 'NewsArticle',
        components: { Loader, Error },
        data() {
            return {
                error: "",
                article: { },
                fullWidth: false
            }
        },
        methods: {
            updateData() {
                fetch(`http://localhost:1234/api/news/article/${this.$route.params.url}`)
                    .then(async res => {
                        if (res.status == 404)
                        {
                            this.error = "This wouldn't have happened if you had clicked on the links we provided!<br>ヽ(ಠ_ಠ)ノ"
                            setTimeout(this.updateData, 1000) // maybe cache has not been populated/updated yet
                            return;
                        }
                        if (res.status == 400)
                        {
                            window.open(await res.text())
                            this.$router.push("/news")
                            return
                        }
                        if (res.status == 200)
                        {
                            this.article = await res.json()
                            if (this.article.headline === "N/A")
                            {
                                window.open(this.article.href)
                                this.$router.push("/news")
                                return
                            }

                            return;
                        }
                        this.error = res.statusText;
                    })
            }
        },
        mounted() {
            this.updateData()
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }

    .toggleWidth {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .toggleWidth:hover {
            cursor: pointer;
    }

    .newsArticle {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: calc(100% - 40px);
    }

    .newsArticle .wrapper {
        width: 100%;
    }

    .newsArticle .wrapper.slim {
        max-width: 600px;
    }

    div.body {
        display: flex;
        flex-direction: column;
        font-size: 1.2em;
    }

    .date {
        font-size: .7em;
        margin: 0;
        font-weight: normal;
        color: var(--font-darker);
    }

    .date * {
        color: var(--font-darker);
    }

    .headline {
        font-size: 3em;
        margin: 10px 0px;
        font-weight: normal;
    }

    .standfirst {
        margin: 10px 0px;
        font-weight: normal;
        font-size: 1.7em;
    }

    .topic {
        margin: 10px 0px;
        font-size: 1.4em;
    }
</style>

<style>
    h4.standfirst img, div.newsArticle div.body img, div.newsArticle div.body amp-img {
        max-width: 100%;
        height: auto;
        border-radius: 10px;
    }

    div.newsArticle a {
        color: var(--font-colour)
    }

    div.newsArticle .accentLink, div.newsArticle .accentLink * {
        color: var(--accent);
        text-decoration: none;
    }

    figure {
        /*align-self: center;*/
        max-width: 50%;
        margin: 0;
        color: var(--font-darker) !important;
        font-size: .8em;
    }

    figure svg {
        fill: var(--font-darker) !important;
        margin-right: 5px;
    }

    div.article-body-viewer-selector {
        display: flex;
        flex-direction: column;
    }

    .related {
        background: var(--background-light);
        padding: 20px;
        border-radius: 10px;
    }

    .related li {
        list-style-type: none;
        margin: 0;
    }
    
    .related ul {
        margin: 0;
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        list-style: inside;
        padding: 0;
    }

    .related ul a {
        margin-left: 0px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

    .related ul a span:not(:last-child) {
        margin-right: 20px;
    }
</style>
