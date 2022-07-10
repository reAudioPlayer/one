<template>
    <div class="preferences">
        <div class="padding-10">
            <div class="sidebar">
                <h2>Sidebar</h2>
                <div class="checkbox">
                    <input @change="changeShowNewsTab" v-model="showNewsTab" type="checkbox" id="checkbox" name="" value="">
                    <label for="checkbox"><span>Show "News" tab</span></label>
                </div>

                <div class="checkbox">
                    <input @change="changeShowSportsTab" v-model="showSportsTab" type="checkbox" id="checkbox2" name="" value="">
                    <label for="checkbox2"><span>Show "Sports" tab</span></label>
                </div>
            </div>
            <div class="sidebar">
                <h2>Player</h2>
                <div class="checkbox">
                    <input @change="changePlayInBrowser" v-model="playInBrowser" type="checkbox" id="checkbox3" name="" value="">
                    <label for="checkbox3"><span>Play in browser</span></label>
                </div>
            </div>
            <div class="sidebar">
                <h2>Data Backup</h2>
                <div class="wrapTogether spaceBetween">
                    <button @click="$router.push('/export')">Save</button>
                    <button @click="$router.push('/import')">Restore</button>
                </div>
            </div>
            <div class="spotify">
                <h2>Spotify</h2>
                <details>
                    <summary>How to</summary>
                <p>1) Head over to the <a @click="() => redirect('https://developer.spotify.com/dashboard/applications')">spotify developer dashboard</a></p>
                <p>2) Create An App</p>
                <p>3) Enter any name and any description</p>
                <p>4) Edit the settings: set the redirect url to <a href="http://reap.ml/">http://reap.ml/</a></p>
                <p>5) Copy and enter the client id and secret into the corresponding input field</p>
                </details>
                <div class="wrapTogether">
                    <p>Client ID: </p><input type="text" v-model="spotifyClientId" />
                </div>
                <div class="wrapTogether">
                    <p>Client Secret: </p><input type="text" v-model="spotifyClientSecret" />
                </div>
                <div class="wrapTogether spaceBetween">
                    <button @click="saveSpotify">save</button>
                    <button @click="saveRestrictedMode" class="restrictedMode">enter restricted mode</button>
                </div>
            </div>
        </div>
        <div>
            <h2>Themes</h2>
            <div class="checkbox">
                <input @change="changeCoverAsBackground" v-model="coverAsBackground" type="checkbox" id="bgcheck" name="" value="">
                <label for="bgcheck"><span>Cover as background</span></label>
            </div>
            <full-shelf :key="themeSelected">
                <theme @selected="updateThemes" v-for="(theme, index) in themes" :key="index"
                    :name="theme" />
            </full-shelf>
        </div>
    </div>
</template>

<script>
    import FullShelf from "../components/Catalogue/FullShelf.vue"
    import Theme from "../components/Preferences/Theme.vue"

    import { Buffer } from 'buffer';
    window.Buffer = Buffer;
    import Hashids from 'hashids'
    const hashids = new Hashids("reapApollo")

    export default {
    components: { Theme, FullShelf },
        name: "Preferences",
        methods: {
            updateThemes() {
                this.themeSelected = window.getCurrentTheme()
            },
            changeCoverAsBackground() {
                window.localStorage.setItem("player.coverAsBackground", this.coverAsBackground ? "true" : "false")
            },
            changeShowSportsTab() {
                window.localStorage.setItem("sidebar.showSportsTab", this.showSportsTab ? "true" : "false")
            },
            changeShowNewsTab() {
                window.localStorage.setItem("sidebar.showNewsTab", this.showNewsTab ? "true" : "false")
            },
            changePlayInBrowser() {
                window.localStorage.setItem("player.inBrowser", this.playInBrowser ? "true" : "false")
            },
            saveRestrictedMode() {
                if (this.spotifyClientId || this.spotifyClientSecret)
                {
                    return;
                }

                fetch("/api/config/spotify", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": "restricted",
                        "secret": "restricted"
                    })
                }).then(x => console.log(x))
            },
            saveSpotify() {
                if (!this.spotifyClientId || !this.spotifyClientSecret)
                {
                    return;
                }

                fetch("/api/config/spotify", {
                    method: "POST",
                    body: JSON.stringify({
                        "id": this.spotifyClientId,
                        "secret": this.spotifyClientSecret
                    })
                }).then(x => console.log(x))
            }
        },
        data() {
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

            let spotifyClientId = "";
            let spotifyClientSecret = "";

            return {
                coverAsBackground: window.localStorage.getItem("player.coverAsBackground") == "true",
                themes,
                themeSelected,
                showSportsTab: window.localStorage.getItem("sidebar.showSportsTab") == "true",
                showNewsTab: window.localStorage.getItem("sidebar.showNewsTab") == "true",
                playInBrowser: window.localStorage.getItem("player.inBrowser") == "true",
                spotifyClientId,
                spotifyClientSecret 
            }
        }
    }
</script>

<style scoped lang="scss">
    .preferences, .padding-20 {
        padding: 20px;
    }

    .padding-10 {
        padding: 10px;
    }

    h2 {
        font-size: 1.5em;
    }

    p {
        margin: 0;
    }

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

        &:not(:first-child) {
            margin-left: 20px;
        }
    }

    button:hover {
        cursor: pointer;
    }

    .restrictedMode {
        color: white;
        background-color: #c73c3c;
    }

    input[type="checkbox"] {
        color: var(--font-contrast);
        background-color: var(--font-colour);   
    }

    input[type="checkbox"]:checked {
        color: var(--accent);
        background-color: var(--accent);
    }

    input[type="text"] {
        margin-bottom: 20px;
        border-radius: 40px;
        border: none;
        padding: 5px;
        font-family: var(--font-family);
        width: 20vw;
        color: var(--font-contrast);
        background-color: var(--font-colour);
    }
</style>

<style scoped>
.checkbox {
  width: 100%;
  margin: 15px auto;
  position: relative;
  display: block;
}
.checkbox label {
  position: relative;
  min-height: 34px;
  display: block;
  padding-left: 40px;
  margin-bottom: 0;
  font-weight: normal;
  cursor: pointer;
}
.checkbox label span {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.checkbox label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  margin: 4px;
  width: 22px;
  height: 22px;
  transition: transform 0.28s ease;
  border-radius: 3px;
  border: 2px solid var(--font-colour);
  transition: border ease 0.25s;
}
.checkbox label:after {
  content: "";
  display: block;
  width: 10px;
  height: 5px;
  border-bottom: 2px solid var(--accent);
  border-left: 2px solid var(--accent);
  transform: rotate(-45deg) scale(0);
  transition: transform ease 0.25s;
  position: absolute;
  top: 12px;
  left: 10px;
}
.checkbox input[type=checkbox] {
  width: auto;
  opacity: 1e-8;
  position: absolute;
  left: 0;
  margin-left: -20px;
}
.checkbox input[type=checkbox]:checked ~ label:before {
  border: 2px solid var(--accent);
  transition: border ease 0.25s;
}
.checkbox input[type=checkbox]:checked ~ label:after {
  transform: rotate(-45deg) scale(1);
}
.checkbox input[type=checkbox]:focus + label::before {
  outline: 0;
}
</style>
