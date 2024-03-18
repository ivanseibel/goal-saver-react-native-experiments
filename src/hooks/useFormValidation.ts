import { useState } from "react";

type FormValues = {
	[key: string]: string;
};

type FormErrors = {
	[key: string]: string | null;
};

type ValidationFunctions = {
	[key: string]: (value: string) => string | null;
};

export const useFormValidation = (
	initialValues: FormValues,
	validationFuncs: ValidationFunctions,
) => {
	const [values, setValues] = useState<FormValues>(initialValues);
	const [errors, setErrors] = useState<FormErrors>({});

	const validate = (): boolean => {
		const validationErrors: FormErrors = {};
		for (const key of Object.keys(values)) {
			const validationFunc = validationFuncs[key];
			if (validationFunc) {
				const error = validationFunc(values[key]);
				if (error) {
					validationErrors[key] = error;
				}
			}
		}

		setErrors(validationErrors);

		return !Object.values(validationErrors).some((error) => error !== null);
	};

	const handleChange = (key: string, value: string) => {
		setValues((prevValues) => ({
			...prevValues,
			[key]: value,
		}));
	};

	const handleSubmit = (onSubmit: () => void) => {
		if (validate()) {
			onSubmit();
			setValues(initialValues);
		}
	};

	return {
		values,
		errors,
		handleChange,
		handleSubmit,
	};
};
