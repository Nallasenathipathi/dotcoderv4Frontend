import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const ExcelEditor = () => {
	const [correctRows, setCorrectRows] = useState<any[]>([]);
	const [errorRows, setErrorRows] = useState<any[]>([]);
	const [error, setError] = useState('');
	const [parsedRows, setParsedRows] = useState<any[]>([]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !file.name.match(/\.(xlsx|xls)$/)) {
			setError('Please upload a valid Excel file.');
			return;
		}

		setCorrectRows([]);
		setErrorRows([]);
		setParsedRows([]);
		setError('');

		const reader = new FileReader();

		reader.onload = (event) => {
			const data = new Uint8Array(event.target!.result as ArrayBuffer);
			const workbook = XLSX.read(data, { type: 'array' });
			const worksheet = workbook.Sheets[workbook.SheetNames[0]];
			const json: any[] = XLSX.utils.sheet_to_json(worksheet);

			// 🔐 Ensure each row has a unique ID
			const idSet = new Set();
			json.forEach((row, index) => {
				if (!row.id || idSet.has(row.id)) {
					let uniqueId;
					do {
						uniqueId = `auto-id-${index + 1}-${Math.floor(Math.random() * 10000)}`;
					} while (idSet.has(uniqueId));
					row.id = uniqueId;
				}
				idSet.add(row.id);
			});
			console.log(json);

			setParsedRows(json);
			validation(json);
		};

		reader.readAsArrayBuffer(file);

		e.target.value = '';
	};

	function validation(json: any[]) {
		const requiredFields = ['id', 'name', 'email', 'phone'];
		const validData: any[] = [];
		const invalidData: any[] = [];

		const emailSet = new Set();
		const phoneSet = new Set();

		json.forEach((row) => {
			const errors: string[] = [];

			// Inject missing fields as editable
			requiredFields.forEach((field) => {
				if (!(field in row)) {
					row[field] = '';
					errors.push(`Missing: ${field}`);
				}
			});
			if (!row.name || row.name.trim() === '') {
				errors.push('Name is required');
			}
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(row.email)) {
				errors.push('Invalid Email Format');
			}

			if (!/^\d{10}$/.test(row.phone)) {
				errors.push('Invalid Phone Format');
			}

			if (emailSet.has(row.email)) {
				errors.push('Duplicate Email');
			}
			if (phoneSet.has(row.phone)) {
				errors.push('Duplicate Phone');
			}

			emailSet.add(row.email);
			phoneSet.add(row.phone);

			if (errors.length > 0) {
				const reorderedRow: any = {
					id: row.id,
					name: row.name,
					email: row.email,
					phone: row.phone,
					_errors: errors,
				};

				invalidData.push(reorderedRow);
			} else {
				validData.push(row);
			}
		});

		setTimeout(() => {
			console.log(errorRows);
		}, 100);

		setCorrectRows(validData);
		setErrorRows(invalidData);
		setError('');
	}

	function handleValidateAndSave() {
		validation(parsedRows);
	}

	return (
		<div>
			<h3>Upload Excel File</h3>
			<input type='file' accept='.xlsx,.xls' onChange={handleFileUpload} />
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<table border={1}>
				{/* <thead>
					<tr>
						{Object.keys(errorRows[0]).map((key, index) => (
							<th key={index}>{key}</th>
						))}
					</tr>
				</thead> */}
				<tbody>
					{/* <span>Correct</span> */}
					{correctRows.map((row, rowIndex) => (
						// console.log(rowIndex)

						<tr key={rowIndex}>
							{/* Render editable inputs, excluding _errors */}
							{Object.entries(row)
								.filter(([key]) => key !== '_errors')
								.map(([key, value]) => (
									<td key={key}>
										<td>{Array.isArray(value) ? value.join(', ') : value}</td>
									</td>
								))}
						</tr>
					))}
				</tbody>
			</table>

			{errorRows.length > 0 && (
				<>
					<table border={1}>
						<thead>
							<tr>
								{Object.keys(errorRows[0]).map((key, index) => (
									<th key={index}>{key}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{/* <span>Wrong</span> */}
							{errorRows.map((row, rowIndex) => (
								<tr key={row.id}>
									{/* Editable inputs except _errors */}
									{Object.entries(row)
										.filter(([key]) => key !== '_errors')
										.map(([key, value]) => (
											<td key={key}>
												<input
													value={
														Array.isArray(value)
															? value.join(', ')
															: value
													}
													onChange={(e) => {
														// Update errorRows
														const updatedErrors = [...errorRows];
														updatedErrors[rowIndex][key] =
															e.target.value;
														setErrorRows(updatedErrors);

														// Update parsedRows by ID
														const updatedParsed = parsedRows.map(
															(parsedRow) =>
																parsedRow.id === row.id
																	? {
																			...parsedRow,
																			[key]: e.target.value,
																		}
																	: parsedRow,
														);
														setParsedRows(updatedParsed);
													}}
												/>
											</td>
										))}

									{/* Display validation errors */}
									<td style={{ color: 'red' }}>
										{Array.isArray(row._errors) ? row._errors.join(', ') : ''}
									</td>

									{/* Delete row */}
									<td>
										<button
											onClick={() => {
												const updatedErrors = errorRows.filter(
													(r) => r.id !== row.id,
												);
												setErrorRows(updatedErrors);

												const updatedParsed = parsedRows.filter(
													(r) => r.id !== row.id,
												);
												setParsedRows(updatedParsed);
											}}>
											Remove
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>

					<button onClick={handleValidateAndSave}>Validate/Save</button>
				</>
			)}

			{correctRows.length > 0 && (
				<p style={{ color: 'green', fontWeight: 'bold' }}>
					✅ All rows valid! Count: {correctRows.length}
				</p>
			)}
		</div>
	);
};

export default ExcelEditor;
