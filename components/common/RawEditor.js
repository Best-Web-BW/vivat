import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function RawEditor({ editorRef, imageType, defaultValue }) {	
	return <SunEditor ref={editorRef} defaultValue={defaultValue} lang="ru" setOptions={{ buttonList: buttonList.basic, imageUploadUrl: `/api/admin/load_image/${imageType}` }} />;
}