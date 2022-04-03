<template>
    <div class="welcome bouncy centred-column">
        <div v-if="mode == 0" class="first centred-column">
            <p>Welcome to</p>
            <h1>reAudioPlayer ONE</h1>
        </div>
        <div v-else-if="mode == 1" class="first centred-column">
            <p>The free audio player with the most extensive catalogue</p>
            <h1>ARE YOU READY?</h1>
        </div>
        <div v-else-if="mode == 2" class="first centred-column">
            <h1>Almost There</h1>
            <p>After a few configurations you're ready to go</p>
        </div>
        <div v-else-if="mode == 3" class="permanent centred-column">
            <h1>Pick a Theme</h1>
            <p>You'll be able to change the theme at any point later on</p>
            <br>
            <div class="centred-column appear-delayed">
                <div class="themes" :key="themeSelected">
                    <theme-small @selected="updateThemes" v-for="(theme, index) in themes" :key="index"
                        :name="theme" />
                </div>
            </div>
        </div>
        <div v-else-if="mode == 4" class="permanent centred-column">
            <h1>Let's integrate Spotify then!</h1>
            <p>You'll be able to change the tokens at any point later on</p>
            <br>
            <div class="centred-column appear-delayed">
                <p>1) Head over to the <a @click="() => redirect('https://developer.spotify.com/dashboard/applications')">spotify developer dashboard</a></p>
                <p>2) Create An App</p>
                <p>3) Enter any name and any description</p>
                <p>4) Edit the settings: set the redirect url to <a href="http://reap.ml/">http://reap.ml/</a></p>
                <p>5) Copy and enter the client id and secret into the corresponding input field</p>
                <br>
                <div class="wrapTogether">
                    <p>Client ID: </p><input type="text" v-model="spotifyClientId" />
                </div>
                <div class="wrapTogether">
                    <p>Client Secret: </p><input type="text" v-model="spotifyClientSecret" />
                </div>
                <div class="wrapTogether spaceBetween">
                    <button @click="finalRedirect">continue</button>
                    <button @click="finalRedirectRestricted" class="restrictedMode">enter restricted mode</button>
                </div>
            </div>
        </div>
        <div v-else-if="mode == 5" class="centred-column">
            <h1>ALRIGHT!</h1>
            <p>You're ready to go</p>
        </div>
    </div>
</template>

<script>
    import ThemeSmall from './Preferences/ThemeSmall.vue'
    export default {
        components: {
            ThemeSmall
        },
        methods: {
            updateThemes() {
                this.mode++;
            },
            redirect(url) {
                window.open(url)
            },
            finalRedirectRestricted() {
                if (this.spotifyClientId || this.spotifyClientSecret)
                {
                    return;
                }

                fetch("http://localhost:1234/api/config/spotify", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": "restricted",
                        "secret": "restricted"
                    })
                }).then(x => {
                    if (x.status == 200)
                    {
                        setTimeout(() => fetch("http://localhost:1234/api/releases"), 1000);
                        this.mode++;
                        setTimeout(() => {
                            this.$router.push("/")
                        }, 6 * 1000);
                    }
                })
            },
            finalRedirect() {
                if (!this.spotifyClientId || !this.spotifyClientSecret)
                {
                    return;
                }

                fetch("http://localhost:1234/api/config/spotify", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": this.spotifyClientId,
                        "secret": this.spotifyClientSecret
                    })
                }).then(x => {
                    if (x.status == 200)
                    {
                        setTimeout(() => fetch("http://localhost:1234/api/releases"), 1000);
                        setTimeout(() => fetch("http://localhost:1234/api/news"), 1000);
                        this.mode++;
                        setTimeout(() => {
                            this.$router.push("/")
                        }, 6 * 1000);
                    }
                })
            }
        },
        data() {
            setInterval(() => {
                if (this.mode < 3)
                {
                    this.mode++;
                    return;
                }
            }, 7 * 1000)
            const themes = [
                "night-jade",
                "night-cobalt",
                "night-crimson",
                "night-fire",
                "apollo",
                "gradient",
                "underground",
                //"quarantine",
                //"extraction",
                //"neon",
                "default",
                "royal",
                "ruby",
                "light",
                "light-royal",
                "light-ruby"
            ]
            const themeSelected = window.getCurrentTheme()
            return {
                mode: 0,
                themes,
                themeSelected,
                spotifyClientId: "",
                spotifyClientSecret: ""
            }
        },
        mounted() {
            fetch("http://localhost:1234/api/config/ready")
                .then(x => {
                    if (x.status == 200)
                    {
                        this.$router.push("/")
                    }
                })
        }
    }
</script>

<style scoped>

    button {
        color: var(--font-contrast);
        background-color: var(--font-colour);
        border: none;
        border-radius: 20px;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding: 10px 20px;
        font-family: var(--font-family);
        font-weight: bold;
    }

    button:hover {
        cursor: pointer;
    }

    .restrictedMode {
        color: white;
        background-color: #c73c3c;
    }

    input {
        margin-left: 10px;
        margin-bottom: 20px;
        border-radius: 40px;
        border: none;
        padding: 5px;
        font-family: var(--font-family);
        width: 20vw;
        color: var(--font-contrast);
        background-color: var(--font-colour);
    }

    .wrapTogether {
        display: flex;
        flex-direction: row;
    }

    .spaceBetween {
        justify-content: space-between;
        width: 60%;
    }

    input:focus {
        outline: none;
    }

    a {
        color: var(--font);
        text-decoration: underline;
    }

    a:hover {
        cursor: pointer;
        color: var(--accent);
    }

    .themes {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .themes>* {
        width: 12vw;
    }

    .welcome {
        position: fixed;
        top: 0;
        left: 0;
        background: var(--background);
        width: 100vw;
        height: 100vh;
        color: var(--font-colour);
        z-index: 50;
    }

    .centred-column {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .bouncy h1 {
        animation-name: cd-bounce-right;
        font-size: 4em;
        margin: 0;
    }

    .bouncy p {
        font-size: 1.1em;
        margin: 0;
        animation-name: cd-bounce-left;
    }

    .appear-later {
        animation-name: appear-later;
        animation-duration: 2s;
    }

    .bouncy p,
    .bouncy h1 {
        animation-duration: 6s;
        animation-timing-function: ease-out;
        animation-fill-mode: forwards;
    }

    .bouncy .permanent h1 {
        animation-name: bounce-right-perm;
        animation-duration: 1.5s;
    }

    .bouncy .permanent p {
        animation-name: bounce-left-perm;
        animation-duration: 1.5s;
    }

    .appear-delayed {
        animation-name: delayed;
        animation-duration: 3s;
        animation-delay: 1.5s;
        height: 0;
        overflow: hidden;
        animation-fill-mode: forwards;
    }

    @keyframes delayed {
        0% {
            height: 0;
        }

        100% {
            height: 100%;
        }
    }

    @keyframes bounce-right-perm {
        0% {
            opacity: .2;
            transform: translateX(-200px);
        }

        40% {
            opacity: .7;
            transform: translateX(10px);
        }

        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes bounce-left-perm {
        0% {
            opacity: .2;
            transform: translateX(200px);
        }

        40% {
            opacity: .7;
            transform: translateX(-10px);
        }

        100% {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes cd-bounce-right {
        0% {
            opacity: .2;
            transform: translateX(-200px);
        }

        10% {
            opacity: .7;
            transform: translateX(10px);
        }

        25% {
            opacity: 1;
            transform: translateX(0);
        }

        75% {
            opacity: 1;
            transform: translateX(0);
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes cd-bounce-left {
        0% {
            opacity: .2;
            transform: translateX(200px);
        }

        10% {
            opacity: .7;
            transform: translateX(-10px);
        }

        25% {
            opacity: 1;
            transform: translateX(0);
        }

        75% {
            opacity: 1;
            transform: translateX(0);
        }

        100% {
            opacity: 0;
        }
    }
</style>