<template>
    <div>
        <vue-final-modal v-model="showModal" classes="modal-container" content-class="modal-content">
            <div class="wrapper">
                <div class="header">
                    <h3>Edit details</h3>
                    <button class="modal-close" @click="showModal = false">
                        <span class="material-icons-round">
                            close
                        </span>
                    </button>
                </div>
                <h4>Name</h4>
                <div class="content">
                    <input v-model="name" type="text" ref="name">
                </div>
                <h4>Description</h4>
                <div class="content">
                    <input v-model="description" type="text" ref="description">
                </div>
                <div class="confirm">
                    <button @click="apply" class="negative">Save</button>
                </div>
            </div>
        </vue-final-modal>
    </div>
</template>
<script>
    export default {
        name: "EditPlaylist",
        props: {
            playlistName: String,
            playlistDescription: String
        },
        data() {
            return {
                showModal: false,
                cover: "",
                name: this.playlistName,
                description: this.playlistDescription
            }
        },
        methods: {
            apply() {                
                this.showModal = false
            }
        },
        watch: {
            playlistName() {
                this.name = this.playlistName
            },
            playlistDescription() {
                this.description = this.playlistDescription
            }
        }
    }
</script>


<style>
    .modal-container {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--glass-gradient);
    }

    .modal-content {
        position: relative;
        width: 40%;
        max-height: 70vh;
        padding: 16px;
        overflow: auto;
        background: var(--hover-4);
        border-radius: 10px;
        color: var(--font);
    }

    .modal-close {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        font-size: 1.5em;
        cursor: pointer;
        background: var(--hover-4);
        border: none;
        color: var(--font-darker);
    }

    h3 {
        margin: 0;
    }

    .modal-close:hover {
        color: var(--font);
    }

</style>

<style scoped>

    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .content {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    input[type="text"] {
        background: var(--hover-2);
        border: 1px solid var(--hover-3);
        border-radius: 5px;
        color: var(--font);
        padding: 10px;
        width: 100%;
        font-family: var(--font-family);
    }

    input[type="text"]:focus {
        outline: none;
    }

    input[type="text"]:hover {
        background: var(--hover-1);
        border: 1px solid var(--font);
    }

    button.negative {
        color: var(--hover-4);
        background-color: var(--font);
        border: none;
        border-radius: 20px;
        padding: 10px 25px 10px 25px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
        font-family: var(--font-family);
    }

    .confirm {
        margin-top: 20px;
        height: 40px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
    }

    button.negative:hover {
        cursor: pointer;
        padding: 11px 26px 11px 26px;
        border-radius: 21px;
    }
</style>