<template>
    <Error v-if="error" :msg="error" />
    <Loader v-else-if="!article.headline" />
    <div v-else class="padding-20 newsArticle">
        <span class="toggleWidth material-icons-round" @click="fullWidth = !fullWidth">{{fullWidth ? "close_fullscreen" : "open_in_full"}}</span>
        <div :class="{ slim: !fullWidth }" class="wrapper">
            <h6 class="accentLink topic" v-html="article.topic" />
            <h1 class="leading-tight headline">{{article.headline}}</h1>
            <h4 class="standfirst" v-html="article.standfirst" />
            <h6 v-if="article.date" class="date">{{article.date}}, <a :href="article.href">{{article.href}}</a></h6>
            <hr v-if="article.body" class="my-4">
            <div class="body leading-relaxed text-md" v-html="article.body" />
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
                fetch(`/api/news/articles/${this.$route.params.url}`)
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

                            let relativeLinks = this.article.body.split(" ").filter(x => x.includes("href=\"/"));
                            relativeLinks = relativeLinks.map(x => x.split("href=\"")[1].split("\"")[0]);

                            const source = this.article.href.split("/")[2];
                            const absoluteLinks = relativeLinks.map(x => "https://" + source + x);

                            for (const i in relativeLinks)
                            {
                                let absoluteLink = absoluteLinks[i];

                                fetch("/api/news/articles", {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json"
                                    },
                                    body: JSON.stringify({
                                        url: absoluteLinks[i]
                                    })
                                })
                                    .then(async res => {
                                        if (res.status == 200) {
                                            absoluteLink = await res.text();
                                        } else {
                                            console.error(await res.text());
                                        }
                                        this.article.body = this.article.body.replaceAll(relativeLinks[i], absoluteLink);
                                    })
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
        top: calc(var(--h-header) + 20px);
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
    }

    .date {
        font-size: .7em;
        margin: 0;
        font-weight: normal;
        color: var(--fg-base-dk);
    }

    .date * {
        color: var(--fg-base-dk);
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
        color: var(--fg-base)
    }

    div.newsArticle .accentLink, div.newsArticle .accentLink * {
        color: var(--fg-secondary);
        text-decoration: none;
    }

    figure {
        /*align-self: center;*/
        max-width: 50%;
        margin: 0;
        color: var(--fg-base-dk) !important;
        font-size: .8em;
    }

    figure svg {
        fill: var(--fg-base-dk) !important;
        margin-right: 5px;
    }

    div.article-body-viewer-selector {
        display: flex;
        flex-direction: column;
    }

    .related {
        background: var(--bg-base-lt);
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

    p:not(:last-child) {
        margin-bottom: 1em;
    }

    svg.logo-stamp {
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }

    div.newsletter-component {
        display: none;
    }

    form {
        display: none;
    }

    iframe {
        position: inherit !important;

    }
</style>
