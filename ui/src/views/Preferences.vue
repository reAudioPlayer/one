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
                <h2>Cloud Synchronisation</h2>
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
                <input @change="changeCoverAsBackground" v-model="coverAsBackground" type="checkbox" id="checkbox3" name="" value="">
                <label for="checkbox3"><span>Cover as background</span></label>
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
    // http://localhost:3000/user/get/redirect?redirect=http%3A%2F%2Flocalhost:3001%2F%23%2fimport%2F
    // http://localhost:3000/user/set/data/zwwQ1xenozI9rVyKPoGdcObNl7YD9xU59zAr4DblcQeW0BXeo0HoZXe1dQX9CkenldPNnAieJXekAvNPUEgJ9eX8K6SyWdlWAqqeHzwBDyryPyHokK023en4tJqbb2vPZ8UbByGk8vx4CWkxx3gpZXIbX4xA5AbpsXPD0rdWkNTdozkEwvdEU1Y9VDvrD9f9p8qq7bxzfpJkEXJKkrTwO41N4XblHJ19VpObrJINxLbXydBJtP27VNJYLdh8gEl0yzD0hG7xvkEybKsLbQx1ZNqZsqkOk96r6zT3AvdGWmJxc9WZ0EeDyktw9Q4kylzXsPZPgxgVrkIbBDQr3Qe1uDlXVWYwp2U69mWv62gJU6evmpNxz5cX4ek7v4mWT3YDPbdopBFbdbVeV6wBCNlq19QBDYF9pnXWg0qVtomlpPBbvWiW0WLqyrWbcZl7rL4WbXFPgZpLoAXVH1o08BADqkslXw4og53Asw3DX0EK1pIrDo0lmBA3sDLyWeEN6eSEPBwAVJ5ATZXoGXzX5VUN3Gg141JAfYbm9Kzmn9Syobmrkq44IdYm9b6yelT94mgYXq4QT93XGkPvmQIbED1v2qxPfg1ergpxrPSP858ZND2YSEdV0L3moNtJwml26moWi7B17wZ6p6Iknv08VDrqt1VkZYpX78uXyBW7k2B5T9mOzDlvvNSrpNpKANrXIV0lWE2ooeF2xnywp5mmsymy80N45nCBWDZN2lvku7VBdBDAxlSKk7K5y9qnTGxk5QKqz0TwAZ8nnW6YF4l91ED1p3S5w9X6388PTwWeOxz0GAukBo60xGebS7BDp8N7rBhWgZnq8z1Pc8LA0V5v9XfO4wxGqgJJ?redirect=http%3A%2F%2Flocalhost:3001%2F%23%2fimport%2F

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

            if (this.$route.params.data)
            {
                const dec = hashids.decodeHex(this.$route.params.data);
                const datastr = Buffer.from(dec, 'hex').toString('utf8');
                const data = JSON.parse(datastr);
                spotifyClientId = data.data.spotifyApiId
                spotifyClientSecret = data.data.spotifyApiSecret
                console.warn(data)

                data.data.hello = {
                    world: "how are you"
                }

                const hex = Buffer.from(JSON.stringify(data), 'utf8').toString('hex');
                const dec2 = hashids.encodeHex(hex);
                console.warn(dec2)
            }

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
