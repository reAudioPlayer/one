import {usePlayerStore} from "./store/player";
import {ref, watch} from "vue";
import {useSettingsStore} from "./store/settings";

const video = document.createElement('video');
video.style.position = 'absolute';
video.style.top = '0';
video.style.left = '0';
video.style.width = "500px";
video.style.height = "500px";
video.style.zIndex = "-1000";
document.body.appendChild(video);

export const pictureInPictureStatus = ref<"loading" | "ready" | "error">("error");
export const requestPictureInPicture = async () => {
    if (pictureInPictureStatus.value == "error") return false;
    if (pictureInPictureStatus.value == "loading") return false;

    await video.requestPictureInPicture();
}

export const initPictureInPicture = () => {
    const playerStore = usePlayerStore();
    const settingsStore = useSettingsStore();
    let worker: Worker;
    let enabled = true;

    const load = async (cover: string) => {
        if (!enabled) return false;
        if (playerStore.song.id < 0) return false;

        worker?.terminate();
        worker = new Worker('/assets/ffmpeg/ffmpeg-worker-mp4.js');
        pictureInPictureStatus.value = "loading";
        console.log("loading new cover", cover);

        const res = await fetch(cover);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);

        // clear video;
        video.src = '';

        const filename = 't.jpg';

        const images = [];
        const img = new Image();
        img.src = url;
        img.style.width = '100%';
        img.style.height = '100%';

        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width;
            canvas.height = img.height;

            const ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)

            const imgString = canvas.toDataURL('image/jpeg', 1)
            const data = convertDataURIToBinary(imgString)
            images.push({
                name: filename,
                data
            });

            console.log("loaded image", images);
            requestAnimationFrame(finalizeVideo);
        }

        function convertDataURIToBinary(dataURI) {
            var base64 = dataURI.replace(/^data[^,]+,/, '');
            var raw = window.atob(base64);
            var rawLength = raw.length;

            var array = new Uint8Array(new ArrayBuffer(rawLength));
            for (let i = 0; i < rawLength; i++) {
                array[i] = raw.charCodeAt(i);
            }
            return array;
        }

        function finalizeVideo() {
            worker.onmessage = function (e) {
                var msg = e.data;
                switch (msg.type) {
                    case "stdout":
                        console.log(msg.data);
                        break;

                    case "stderr":
                        if (!msg.data.toLowerCase().includes("error")) break;

                        console.error(msg.data);
                        break;
                    case "exit":
                        pictureInPictureStatus.value = msg.data == 0 ? "ready" : "error";
                        break;

                    case 'done':
                        const blob = new Blob([msg.data.MEMFS[0].data], {
                            type: "video/mp4"
                        });
                        done(blob)
                        break;
                }
            };

            worker.postMessage({
                type: 'run',
                TOTAL_MEMORY: 268435456,
                arguments: [
                    //"-r", "20",
                    "-i", filename,
                    "-c:v", "libx264",
                    "-crf", "1",
                    "-pix_fmt", "yuv420p",
                    "-vb", "20M",
                    "-preset", "veryfast",
                    "out.mp4"],
                MEMFS: images
            });
        }

        const done = output => {
            video.src = webkitURL.createObjectURL(output);

            /*video.onload = () => {
                video.requestPictureInPicture();
            }*/
        }
    }

    watch(() => settingsStore.player.pictureInPicture, async (enabled) => {
        console.log("pictureInPicture enabled", enabled);

        if (enabled) {
            initPictureInPicture();
            enabled = true;
            pictureInPictureStatus.value = "error";
            await load(playerStore.song.cover);
        } else {
            worker?.terminate();
            enabled = false;
            pictureInPictureStatus.value = "error";
        }
    });

    if (!settingsStore.player.pictureInPicture) return false;

    watch(() => playerStore.song.cover, load);

    return true;
}
