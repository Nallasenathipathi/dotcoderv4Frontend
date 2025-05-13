import axios from "axios";
import showNotification from "../../components/extras/showNotification";

export async function fetchData(endpoint: any): Promise<any> {
	const response = await axios.get<any>(`${endpoint}`, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export async function deleteData(endpoint: any): Promise<any> {
	const response = await axios.delete<any>(`${endpoint}`, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
}

export async function submitCommonData(values: any, endpoint: string, type: number): Promise<any> {
	const formData = new FormData();
	for (const key of Object.keys(values)) {
		const value = values[key];
		if (value !== null && value !== undefined && value !== '') {
			formData.append(key, value);
		}
	};

	// for put method
	if (type == 1) {
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

export async function submitLanguageData(values: any, endpoint: string, type: number): Promise<any> {
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
			} else if (key === 'old_lang_img') {
				formData.append('lang_image', value);
			} else {
				formData.append(key, value);
			}
		}
	};

	// for put method
	if (type == 1) {
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

export async function submitCollegeData(values: any, endpoint: string, type: number): Promise<any> {
	const formData = new FormData();
	for (const key of Object.keys(values)) {
		const value = values[key];
		if (value !== null && value !== undefined && value !== '') {
			if (key === 'college_image') {
				const imgformData = new FormData();
				imgformData.append('file', value);
				imgformData.append('path', '/uploads/college_images');
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
			}
			else if (key === 'old_college_img') {
				formData.append('college_image', value);
			} else {
				formData.append(key, value);
			}
		}
	};

	// for put method
	if (type == 1) {
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