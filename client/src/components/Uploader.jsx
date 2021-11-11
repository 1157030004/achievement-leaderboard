import React, { useState } from "react";
import { FilePond, File, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const Uploader = ({ name, formData, file, onUpdateFiles }) => {
	const [berkas, setBerkas] = useState(null);
	return (
		<>
			<FilePond
				files={file}
				onupdatefiles={onUpdateFiles}
				// allowMultiple={true}
				// maxFiles={3}
				// server={{
				// 	url
				// }}
				name={Date.now() + name}
				labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
			/>
		</>
	);
};

export default Uploader;
