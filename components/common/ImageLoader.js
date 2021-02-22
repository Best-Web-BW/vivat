import { useEffect, useRef, useState } from "react";
import { ErrorModal } from "./Modals";

const DO_LOG = false;

export class Image {
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }

    isEqual(toCompare) {
        return this.url === toCompare.url && this.name === toCompare.name;
    }
}

function ImageEntry({ image, remove }) {
    return (
        <li>
            <img src={image.url} alt="" width="100%"/>
            <button className="delete" onClick={remove}>X</button>
        </li>
    );
}

export default function ImageLoader({ isSingle, type, onChange, defaultImages }) {
    const [images, setImages] = useState([]);
    useEffect(() => {
        if(defaultImages && (defaultImages instanceof Array)) {
            const newImages = defaultImages.map(image => new Image(image.url, image.name));
            setTimeout(() => onChange(newImages), 0);
            setImages(newImages);
        }
    }, [defaultImages]);

    const filterImages = (images, image) => images.filter(img => !img.isEqual(image));
    
    const addImage = image => setImages(prev => {
        const newImages = isSingle ? [image] : [...filterImages(prev, image), image];
        setTimeout(() => onChange(newImages), 0);
        return newImages;
    });
    
    const removeImage = image => setImages(prev => {
        DO_LOG && console.log(prev, image);
        let newImages = filterImages(prev, image);
        DO_LOG && console.log(newImages)
        setTimeout(() => onChange(newImages), 0);
        return newImages;
    });
    
    const [errorModal, setErrorModal] = useState(false);
    const inputRef = useRef();
    const loadImages = async () => {
        const images = inputRef.current.files;
        if(!images.length) return;

        const formData = new FormData();
        for(let i = 0; i < images.length; i++) formData.append("images", images[i]);

        const response = await fetch("/api/admin/load_images/" + type, { method: "POST", body: formData });
        const json = await response.json();

        if(json.status !== "success") setErrorModal(true);
        else for(let image of json.images) addImage(new Image(image.url, image.name));
    };

    return (
        <>
            <form encType="multipart/form-data">
                <label>
                    <p className="gallery-upload-button">Выбрать фото</p>
                    <input ref={inputRef} type="file" multiple={!isSingle} accept="image/*" onChange={loadImages} />
                </label>
            </form>
            <div className="add-gallery-modal-imgs-list">
                { images.map(image => <ImageEntry key={image.name} image={image} remove={() => removeImage(image)} /> ) }
            </div>
            <ErrorModal
                content="Не удалось загрузить фото, попробуйте позже."
                opened={errorModal} close={() => setErrorModal(false)}
            />
        </>
    );
}