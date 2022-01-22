<template>
    <div class="padding-20 newsArticle">
        <h5 class="accentLink topic" v-html="article.topic" />
        <h1 class="headline">{{article.headline}}</h1>
        <h4 class="standfirst" v-html="article.standfirst" />
        <h5 v-if="article.date" class="date">{{article.date}}, <a :href="article.href">{{article.href}}</a></h5>
        <hr v-if="article.body">
        <div class="body" v-html="article.body" />
    </div>
</template>

<script>
    export default {
        name: 'NewsArticle',
        data() {
            return {
                article: { }
            }
        },
        mounted() {
            fetch(`http://localhost:1234/api/news/article/${this.$route.params.url}`)
                .then(async x => {
                    if (x.status == 400)
                    {
                        window.open(await x.text())
                        this.$router.push("/news")
                        return
                    }
                    this.article = await x.json()
                })
        }
    }
</script>

<style scoped>
    .padding-20 {
        padding: 20px;
    }

    div.body {
        display: flex;
        flex-direction: column;
        font-size: .9em;
    }

    .date {
        font-size: .6em;
        margin: 0;
        font-weight: normal;
        color: var(--font-darker);
    }

    .date * {
        color: var(--font-darker);
    }

    .headline {
        font-size: 2.5em;
        margin: 10px 0px;
        font-weight: normal;
    }

    .standfirst {
        margin: 10px 0px;
        font-weight: normal;
        font-size: 1em;
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
