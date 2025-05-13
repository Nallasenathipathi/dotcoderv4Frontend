export const Language_validation = (values: any, type: number) => {
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
	if (type == 1) {
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
	} else {
		if (!values.lang_image) {
			errors.lang_image = 'Language image is required';
		} else {
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

export const College_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.college_name?.trim()) {
		errors.college_name = 'College name is required';
	}
	if (!values.college_short_name?.trim()) {
		errors.college_short_name = 'College short name is required';
	}
	if (type == 1) {
		if (values.college_image) {
			const file = values.college_image;
			// File type validation
			const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				errors.college_image = 'Only JPG, JPEG, PNG, or WEBP files are allowed';
			}

			// File size validation (example: 2MB max)
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			if (file.size > maxSizeInBytes) {
				errors.college_image = 'File size must be less than 2MB';
			}
		}
	} else {
		if (!values.college_image) {
			errors.college_image = 'College image is required';
		} else {
			const file = values.college_image;

			// File type validation
			const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
			if (!allowedTypes.includes(file.type)) {
				errors.college_image = 'Only JPG, JPEG, PNG, or WEBP files are allowed';
			}

			// File size validation (example: 2MB max)
			const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
			if (file.size > maxSizeInBytes) {
				errors.college_image = 'File size must be less than 2MB';
			}
		}
	}
	return errors;
};

export const Department_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.department_name?.trim()) {
		errors.department_name = 'Department name is required';
	}
	if (!values.department_short_name?.trim()) {
		errors.department_short_name = 'Department short name is required';
	}
	return errors;
};

export const Batch_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.batch_name?.trim()) {
		errors.batch_name = 'Batch name is required';
	}
	return errors;
};

export const Section_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.section_name?.trim()) {
		errors.section_name = 'Section name is required';
	}
	return errors;
};

export const Tag_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.tag_name?.trim()) {
		errors.tag_name = 'Tag name is required';
	}
	return errors;
};

export const Course_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.course_name?.trim()) {
		errors.course_name = 'Course name is required';
	}
	return errors;
};

export const Topic_validation = (values: any, type: number) => {
	const errors: any = {};
	if (!values.course_id) {
		errors.course_id = 'Course ID is required';
	}
	if (!values.topic_tag_id) {
		errors.topic_tag_id = 'Topic Tag ID is required';
	}
	if (!values.topic_name?.trim()) {
		errors.topic_name = 'Topic name is required';
	}
	return errors;
};

export const login_validations = (values: any) => {

	const errors: any = {};

	if (!values.email) {
		errors.email = 'Email or Username is required';
	} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
		errors.email = 'Enter a valid email address';
	}

	if (!values.password) {
		errors.password = 'password is required';
	} else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters';
	}

	console.log(values, errors);

	return errors;
};
