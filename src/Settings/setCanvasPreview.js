const setCanvasPreview = (
    image, //HTML ImageElement
    canvas, //HTMLCanvasElement
    crop //PixelCrop
    ) => {
        const ctx = canvas.getContext("2d");
        if(!ctx) {
            throw new Error("No 2d context")
        }

        // device PixelRatio slightly increases sharpness on retina devices
        // at the expense of slightly slower render times and needing to size the image
        //back down if you want to download/upload and be true to the images natural width

        const pixelRatio = window.devicePixelRatio;
        const scaleX = image.naturalWidth /image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
        canvas.height = Math.floor(crop.height * scaleY *  pixelRatio);

        ctx.scale(pixelRatio, pixelRatio);
        ctx.imageSmoothingQuality = "high";
        ctx.save();

        const cropX = crop.x * scaleX;
        const cropY = crop.y * scaleY;

        // move the crop to the canvas origin (0, 0)

        ctx.translate(-cropX, -cropY);
        ctx.drawImage(
            image,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
            0,
            0,
            image.naturalWidth,
            image.naturalHeight,
        );
        ctx.restore();

    };

export const dataURLToBlob = (dataUrl) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
};
export default setCanvasPreview