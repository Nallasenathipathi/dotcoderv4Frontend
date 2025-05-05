import React from 'react';
import Editor from '@monaco-editor/react';

const MonachoEditor = () => {
	return (
		<div className='h-100'>
			<Editor defaultLanguage='javascript' defaultValue='// some comment' />
		</div>
	);
};

export default MonachoEditor;
