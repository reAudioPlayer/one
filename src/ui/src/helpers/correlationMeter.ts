let prevCorr = 0;

const ATTACK_SMOOTHING = 1; // .85
const DECAY_SMOOTHING = 0.1; //.16//.4

const rotate45deg = (x, y) => {
    var tmp = cartesian2polar(x, y);
    tmp.angle -= 0.78539816; // Rotate coordinate by 45 degrees
    var tmp2 = polar2cartesian(tmp.radius, tmp.angle);
    return { x: tmp2.x, y: tmp2.y };
};

const getCorr = (x, y) => {
    var tmp = cartesian2polar(x, y);
    tmp.angle -= 0.78539816; // Rotate coordinate by 45 degrees
    var radius = -1; // rotate again this time 180 degrees, is it this which break _left ?
    var angle = Math.atan2(x, y); // atan2 gives full circle
    return radius * angle;
};
const cartesian2polar = (x, y) => {
    // Convert cartesian to polar coordinate
    var radius = Math.sqrt(x * x + y * y);
    var angle = Math.atan2(y, x); // atan2 gives full circle
    return { radius: radius, angle: angle };
};

const polar2cartesian = (radius, angle) => {
    // Convert polar coordinate to cartesian coordinate
    var x = radius * Math.sin(angle);
    var y = radius * Math.cos(angle);
    return { x: x, y: y };
};

const getData = (leftChannel: any, rightChannel: any) => {
    const data = [];

    data.push(new Float32Array(leftChannel.frequencyBinCount));
    leftChannel.getFloatTimeDomainData(data[0]);

    data.push(new Float32Array(rightChannel.frequencyBinCount));
    rightChannel.getFloatTimeDomainData(data[1]);

    return data;
};

export const correlation = (leftChannel: any, rightChannel: any) => {
    const data = getData(leftChannel, rightChannel);

    const doSmooth = (oldV, newV) => {
        var ret = oldV;
        if (oldV > newV) {
            ret -= DECAY_SMOOTHING * (oldV - newV);
        } else {
            ret += ATTACK_SMOOTHING * (newV - oldV);
        }
        //if (oldV < 0) ret = 0;
        //if (oldV > 1.0) ret = 1.0;
        return ret;
    };

    // ---

    var corr = 0;
    var x;
    // sum up corr
    for (var i = 0; i < data[0].length; i++) {
        x = data[1] ? data[1][i] : data[0][i]; // take care of single channel signals, for corr use same data
        corr += getCorr(x, data[0][i]);
    }
    corr = corr / data[0].length;
    // still something wrong where
    if (corr > 1) corr = 1;
    if (corr < -1) corr = -1;
    //this.corr = (corr + this.corr*this.damp)/2.0;

    prevCorr = doSmooth(prevCorr, corr);
    return prevCorr;
};

export const stereoField = (leftChannel: any, rightChannel: any) => {
    const data = getData(leftChannel, rightChannel);

    var x = data[1] ? data[1][0] : 0; // take care of single channel signals
    let rotated = rotate45deg(x, data[0][0]); // Right channel is mapped to x axis

    const points = [] as { x: number; y: number }[];

    points.push({ x: rotated.x, y: rotated.y });

    for (var i = 1; i < data[0].length; i++) {
        x = data[1] ? data[1][i] : 0; // take care of single channel signals
        rotated = rotate45deg(x, data[0][i]);

        points.push({ x: rotated.x, y: rotated.y });
    }

    return points;
};
