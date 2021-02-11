import { useEffect, useRef, useState } from "react";

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
        let newImages;
        if(isSingle && false) newImages = [image];
        else newImages = [...filterImages(prev, image), image];
        setTimeout(() => onChange(newImages), 0);
        return newImages;
    });
    
    const removeImage = image => setImages(prev => {
        console.log(prev, image);
        let newImages = filterImages(prev, image);
        console.log(newImages)
        setTimeout(() => onChange(newImages), 0);
        return newImages;
    });
    
    const inputRef = useRef();
    const loadImages = async () => {
        const images = inputRef.current.files;
        if(!images.length) return;

        const formData = new FormData();
        for(let i = 0; i < images.length; i++) formData.append("images", images[i]);

        const response = await fetch("/api/admin/load_images/" + type, { method: "POST", body: formData });
        const json = await response.json();

        if(json.status !== "success") alert("Не удалось загрузить фото, попробуйте позже");
        else for(let image of json.images) addImage(new Image(image.url, image.name));

        // resetInput();
    };
    
    const [input, setInput] = useState();
    const resetInput = () => {
        setInput(<input />)
        setInput(<input ref={inputRef} type="file" multiple={!isSingle} accept="image/*" onChange={loadImages} />);
    }

    useEffect(() => resetInput(), []);

    return (
        <>
            <form encType="multipart/form-data">
                <p>Выберите фото</p>
                <label>
                    <p className="gallery-upload-button">Выбрать фото</p>
                    { input }
                </label>
            </form>
            <div className="add-gallery-modal-imgs-list">
                { images.map(image => <ImageEntry key={image.name} image={image} remove={() => removeImage(image)} /> ) }
            </div>
        </>
    );
}