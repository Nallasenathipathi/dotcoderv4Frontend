import axios from "axios";
import showNotification from "../../components/extras/showNotification";

export async function fetchData(endpoint : any): Promise<any> {
	const response = await axios.get<any>(`${endpoint}`, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export async function deleteData(endpoint : any): Promise<any> {
	const response = await axios.delete<any>(`${endpoint}`, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export const Language_validation = (values:any ,type:number) => {
	const errors: any = {};
	if (!values.lang_name) {
		errors.lang_name = 'Language name is required';
	}
	if (!values.lang_id) {
		errors.lang_id = 'Language ID is required';
	}
	if (!values.lang_category) {
		errors.lang_category = 'Language category is required';
	}
	if(type == 1){
		if (values.lang_image) {
			const file = values.lang_image;
			// File type validation
			const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				errors.lang_image = 'Only JPG, JPEG, PNG, or WEBP files are allowed';
			}
		
			// File size validation (example: 2MB max)
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			if (file.size > maxSizeInBytes) {
				errors.lang_image = 'File size must be less than 2MB';
			}
		}
	}else{
		if (!values.lang_image) {
			errors.lang_image = 'Language image is required';
		}else {
			const file = values.lang_image;
		
			// File type validation
			const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				errors.lang_image = 'Only JPG, JPEG, PNG, or WEBP files are allowed';
			}
		
			// File size validation (example: 2MB max)
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			if (file.size > maxSizeInBytes) {
				errors.lang_image = 'File size must be less than 2MB';
			}
		}
	}
	return errors;
};


export async function submitLanguageData(values: any, endpoint: string ,type:number): Promise<any> {
	const formData = new FormData();
	for (const key of Object.keys(values)) {
		const value = values[key];
		if (value !== null && value !== undefined && value !== '') {
			if (key === 'lang_image') {
				const imgformData = new FormData();
				imgformData.append('file', value);
				imgformData.append('path', '/uploads/language_images');
				// imgformData.append('file_name', value.name);
				const fileExtension = value.name.split('.').pop(); // gets the extension like 'jpg', 'png'
				const newFileName = `${values.lang_id}.${fileExtension}`;
				imgformData.append('file_name', newFileName);

				try {
					const response = await fetch('/api/file_uploads/', {
						method: 'POST',
						body: imgformData,
					});
					const data = await response.json();
					if (data.path) {
						let path = data.path;
						formData.append(key, path);
					} else {
						console.error('Image upload failed', data);
					}
				} catch (error) {
					console.log(error);
					showNotification(
						'Failed to store img',
						'Failed to store img Please Try Again !',
						'danger',
					);
					return;
				}
			} else {
				formData.append(key, value);
			}
		}
	};

	// for put method
	if(type == 1){
		formData.append('_method', 'PUT');
	}
	// formData.forEach((value, key) => {
	// 	console.log(`${key}:`, value);
	// });

	const response = await axios.post(endpoint, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}