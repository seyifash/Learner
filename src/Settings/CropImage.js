import React, {useState, useEffect, useRef} from 'react'
import ReactCrop, { centerCrop, convertToPixelCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import setCanvasPreview from './setCanvasPreview';


const MIN_DIMENSION = 150
const ASPECT_RATIO = 1 

const CropImage = ({file, saveImage, setDataUrl}) => {

    const imgRef = useRef(null)
    const previewCanvasRef = useRef(null)
    const [imageSrc, setImageSrc] = useState("")
    const [crop, setCrop] = useState();
    const [error, setError] = useState();


    useEffect(() => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";

            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
                if(error) setError("");
                const {naturalWidth, naturalHeight} = e.currentTarget
                if(naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION){
                    setError("Image must be at least 150 X 150 pixels.")
                    return setImageSrc("");
                }
            })
            setImageSrc(imageUrl)
        })
        reader.readAsDataURL(file)
    }, [file, error])


    const onImageLoad = (e) => {
        const {width, height} = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
        const crop = makeAspectCrop({
            unit: "%",
            width: cropWidthInPercent
        }, 
        ASPECT_RATIO, 
        width, 
        height);
        
        const centeredCrop =  centerCrop(crop, width, height)
        setCrop(centeredCrop);
    }


  return (
    <div>
        {imageSrc &&
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <ReactCrop
                crop={crop}
                onChange={
                    (pixelCrop, percentCrop) => setCrop(percentCrop)
                }
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO}
                minWidth={MIN_DIMENSION}>
                    <img ref={imgRef} src={imageSrc}  alt="upload" style={{maxHeight: "70vh"}}
                    onLoad={onImageLoad}/>
                </ReactCrop>
                <button className="crop" onClick={()=> {setCanvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                    )
                );
                const dataUrl = previewCanvasRef.current.toDataURL("image/png");
                setDataUrl(true)
                saveImage(dataUrl)
                }}>Crop Image</button>
            </div>
        }
        {crop && <canvas ref={previewCanvasRef} style={{display: 'none', marginTop: '20px', border: "1px solid black",
            objectFit: "contain",
            width: '150',
            height: '150'
        }}
        
        />}
    </div>
  )
}

export default CropImage