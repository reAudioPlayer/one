<template>
    <div class="search">
        <div class="shelf">
            <div class="header">
                <h2>Songs</h2>
                <h5>See All</h5>
            </div>
            <div class="items">
                <div class="item">
                    Song 1
                </div>
                <div class="item">
                    Song 2
                </div>
                <div class="item">
                    Song 3
                </div>
                <div class="item">
                    Song 4
                </div>
                <div class="item">
                    Song 5
                </div>
                <div class="item">
                    Song 6
                </div>
                <div class="item">
                    Song 7
                </div>
                <div class="item">
                    Song 8
                </div>
                <div class="item">
                    Song 9
                </div>
            </div>
        </div>
        <div class="shelf">
            <div class="header">
                <h2>Artists</h2>
                <h5>See All</h5>
            </div>
            <div class="items">
                <div class="item">
                    Song 1
                </div>
                <div class="item">
                    Song 2
                </div>
                <div class="item">
                    Song 3
                </div>
                <div class="item">
                    Song 4
                </div>
                <div class="item">
                    Song 5
                </div>
                <div class="item">
                    Song 6
                </div>
                <div class="item">
                    Song 7
                </div>
                <div class="item">
                    Song 8
                </div>
                <div class="item">
                    Song 9
                </div>
            </div>
        </div>
        <div class="shelf">
            <div class="header">
                <h2>Songs (Spotify)</h2>
                <h5>See All</h5>
            </div>
            <div class="items">
                <div class="item">
                    Song 1
                </div>
                <div class="item">
                    Song 2
                </div>
                <div class="item">
                    Song 3
                </div>
                <div class="item">
                    Song 4
                </div>
                <div class="item">
                    Song 5
                </div>
                <div class="item">
                    Song 6
                </div>
                <div class="item">
                    Song 7
                </div>
                <div class="item">
                    Song 8
                </div>
                <div class="item">
                    Song 9
                </div>
            </div>
        </div>
        <div class="shelf">
            <div class="header">
                <h2>Artists (Spotify)</h2>
                <h5>See All</h5>
            </div>
            <div class="items">
                <div class="item">
                    Song 1
                </div>
                <div class="item">
                    Song 2
                </div>
                <div class="item">
                    Song 3
                </div>
                <div class="item">
                    Song 4
                </div>
                <div class="item">
                    Song 5
                </div>
                <div class="item">
                    Song 6
                </div>
                <div class="item">
                    Song 7
                </div>
                <div class="item">
                    Song 8
                </div>
                <div class="item">
                    Song 9
                </div>
            </div>
        </div>
        <div class="shelf">
            <div class="header">
                <h2>Songs (Youtube)</h2>
                <h5>See All</h5>
            </div>
            <div class="items">
                <div class="item">
                    Song 1
                </div>
                <div class="item">
                    Song 2
                </div>
                <div class="item">
                    Song 3
                </div>
                <div class="item">
                    Song 4
                </div>
                <div class="item">
                    Song 5
                </div>
                <div class="item">
                    Song 6
                </div>
                <div class="item">
                    Song 7
                </div>
                <div class="item">
                    Song 8
                </div>
                <div class="item">
                    Song 9
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Search',
    }
</script>

<style scoped>
    .search {
        padding: 20px;
    }

    .header {
        margin: 10px 10px 0px 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .header>h2 {
        align-self: flex-start;
        margin-top: 0;
        margin-bottom: 10px;
    }

    .header>h5 {
        text-transform: uppercase;
        align-self: center;
        margin: 0;
    }

    .header>h5:hover {
        cursor: pointer;
    }

    .items {
        display: grid;
        grid-template-columns: repeat(auto-fill,minmax(200px,1fr));
        grid-auto-rows: 0;
        grid-template-rows: 1fr;
        overflow-y: hidden;
    }

    .item {
        background: var(--glass-gradient);
        padding: 20px;
        margin: 10px;
        border-radius: 5px;
        min-height: 10vh;
    }
</style>
