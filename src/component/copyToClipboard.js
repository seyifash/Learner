
const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
        .then(() => alert("Link copied"))
        .catch((error) => console.error("Failed to copy link: ", error));
};

export default copyToClipboard