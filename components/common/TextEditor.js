import { useEffect, useMemo, useState } from 'react';

export default function _TextEditor(props) {
    const [imported, setImported] = useState();
    useEffect(async () => {
        const { default: SunEditor, buttonList } = await import("suneditor-react");
        await import("suneditor/dist/css/suneditor.min.css");
        setImported({ SunEditor, buttonList });
    }, []);

    return imported ? <TextEditor {...imported} {...props} /> : null;
};

function TextEditor({ SunEditor, buttonList: { basic: basicButtonList }, editorRef, imageType, defaultValue }) {
    const buttonList = useMemo(() => basicButtonList, []);
    const imageUploadUrl = useMemo(() => `/api/admin/load_image/${imageType}`, [imageType]);

    return (
        <SunEditor
            setOptions={{ buttonList, imageUploadUrl }}
            defaultValue={defaultValue}
            ref={editorRef}
            lang="ru"
        />
    );
}