import {usePlayerStore} from "@/store/player";
import {watch} from "vue";

export const init = () => {
    const playerStore = usePlayerStore();

    const video = document.createElement('video');
    video.style.position = 'absolute';
    video.style.top = '0';
    video.style.left = '0';
    video.style.width = "500px";
    video.style.height = "500px";
    video.style.zIndex = "-1000";
    document.body.appendChild(video);

    window.launchPip = () => {
        video.requestPictureInPicture();
    }

    watch(() => playerStore.song.cover, async (cover) => {
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
            })
            requestAnimationFrame(finalizeVideo); // well, should probably use settimeout instead
        }

        const worker = new Worker('/assets/ffmpeg/ffmpeg-worker-mp4.js')

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

        let start_time

        function finalizeVideo() {
            start_time = +new Date;

            let messages = '';

            worker.onmessage = function (e) {
                var msg = e.data;
                switch (msg.type) {
                    case "stdout":
                    case "stderr":
                        messages += msg.data + "\n";
                        break;
                    case "exit":
                        console.log("Process exited with code " + msg.data);
                        //worker.terminate();
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
                arguments: ["-r", "20", "-i", filename, "-c:v", "libx264", "-crf", "1", "-pix_fmt", "yuv420p", "-vb", "20M", "out.mp4"],
                MEMFS: images
            });
        }

        function done(output) {
            video.src = webkitURL.createObjectURL(output);

            video.onload = () => {
                video.requestPictureInPicture();
            }
        }
    })
}
