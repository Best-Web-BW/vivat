import SunEditor, { buttonList } from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

export default function RawEditor({ editorRef, imageType }) {	
	return <SunEditor ref={editorRef} lang="ru" setOptions={{ buttonList: buttonList.basic, imageUploadUrl: `/api/admin/load_image/${imageType}` }} />;
}