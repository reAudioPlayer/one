const APP = "reAudioPlayer One";
const authBaseURL = `https://audius.co/oauth/auth?scope=read&app_name=${APP}&redirect_uri=`;
const redirectPath = "/audius/callback";
export const linkAudius = () => {
    const redirectURL = encodeURIComponent(
        `${window.location.origin}${redirectPath}`
    );
    const URL = `${authBaseURL}${redirectURL}`;
    // open in popup
    window.open(URL, APP, "width=500,height=800");
};
