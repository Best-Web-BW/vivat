import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export class Document {
    constructor(url, name) {
        this.url = url;
        this.name = name;
    }

    isEqual(toCompare) {
        return this.url === toCompare.url && this.name === toCompare.name;
    }
}

function DocumentEntry({ document, remove }) {
    return (
        <li>
            <div className="documents-element">
                <Link href={document.url}>
                    <a>
                        <div className="documents-img">
                            <img src="/images/events/pdf-icon.png" alt="" width="100%" />
                        </div>
                        <p className="documents-title">{ document.name }</p>
                    </a>
                </Link>
                <div className="events-edit-wrapper">
                    <button className="delete" onClick={remove}>X</button>
                </div>
            </div>
        </li>
    );
}

export default function DocumentLoader({ type, onChange, defaultDocuments }) {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
        if(defaultDocuments && (defaultDocuments instanceof Array)) {
            const newDocuments = defaultDocuments.map(document => new Document(document.url, document.name));
            setTimeout(() => onChange(newDocuments), 0);
            setDocuments(newDocuments);
        }
    }, [defaultDocuments]);

    const filterDocuments = (documents, document) => documents.filter(doc => !doc.isEqual(document));
    
    const addDocument = document => setDocuments(prev => {
        const newDocuments = [...filterDocuments(prev, document), document];
        setTimeout(() => onChange(newDocuments), 0);
        return newDocuments;
    });
    
    const removeDocument = document => setDocuments(prev => {
        const newDocuments = filterDocuments(prev, document);
        setTimeout(() => onChange(newDocuments), 0);
        return newDocuments;
    });
    
    const inputRef = useRef();
    const loadDocuments = async () => {
        const documents = inputRef.current.files;
        if(!documents.length) return;

        const formData = new FormData();
        for(let i = 0; i < documents.length; i++) formData.append("documents", documents[i]);

        const response = await fetch("/api/admin/load_documents/" + type, { method: "POST", body: formData });
        const json = await response.json();

        if(json.status !== "success") alert("Не удалось загрузить документ(ы), попробуйте позже");
        else for(let document of json.documents) addDocument(new Document(document.url, document.name));

        resetInput();
    };
    
    const [input, setInput] = useState();
    const resetInput = () => {
        setInput(<input />)
        setInput(<input ref={inputRef} type="file" multiple={true} accept="application/pdf" onChange={loadDocuments} />);
    }

    useEffect(() => resetInput(), []);

    return (
        <>
            <form encType="multipart/form-data">
                <p>Выберите документ</p>
                <label>
                    <p className="document-upload-button">Выбрать</p>
                    { input }
                </label>
            </form>
            <div className="edit-event-add-document-preview-list">
                { documents.map(document => <DocumentEntry key={document.name} document={document} remove={() => removeDocument(document)} /> ) }
            </div>
        </>
    );
}