'use client';
import React, { useRef } from 'react';
import Toolbaar from './Toolbar';

const TiptapEditor = () => {
	const editorRef = useRef<HTMLDivElement | null>(null);

    const execCommand = (command: string, value?: string) => {
        if (editorRef.current) {
            document.execCommand(command, false, value || '');
            editorRef.current.focus();
        }
    };
    

	// const setHeading = (tag: string) => {
	// 	if (editorRef.current) {
	// 		document.execCommand('formatBlock', false, tag);
	// 		editorRef.current.focus();
	// 	}
	// };

	const setHeading = (tag: string) => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;
	
		const range = selection.getRangeAt(0);
		const selectedText = range.toString().trim();
	
		if (!selectedText) return;
	
		const heading = document.createElement(tag);
		heading.textContent = selectedText;
	
		range.deleteContents();
		range.insertNode(heading);
		editorRef.current?.focus();
	};
	

	const insertImage = (file: File) => {
		const reader = new FileReader();
		reader.onload = () => {
			const imgUrl = reader.result;
			if (editorRef.current && typeof imgUrl === 'string') {
				document.execCommand('insertImage', false, imgUrl);
				editorRef.current.focus();
			}
		};
		reader.readAsDataURL(file);
	};


    const insertInlineTag = (tag: string) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;
    
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();
    
        if (selectedText.trim() === '') return;
    
        const el = document.createElement(tag);
        el.textContent = selectedText;
    
        range.deleteContents();
        range.insertNode(el);
        editorRef.current?.focus();
    };

	const applyTextAlignment = (tag: string) => {
		const selection = window.getSelection();
		if (!selection || selection.rangeCount === 0) return;
	  
		const range = selection.getRangeAt(0);
		const wrapper = document.createElement('span');
		wrapper.style.textAlign = tag; // since tag is a string
	  
		const selectedContent = range.extractContents();
		wrapper.appendChild(selectedContent);
	  
		range.insertNode(wrapper);
		editorRef.current?.focus();
	  };
	
    
	return (
		<div className="h-100 p-3">
			<Toolbaar onCommand={execCommand} 
            onSetHeading={setHeading} 
            onInsertImage={insertImage} 
            onInsertInlineTag={insertInlineTag}
			applyTextAlignment = {applyTextAlignment}/>
			<div
                onKeyDown={(e) => {
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        execCommand(e.shiftKey ? 'outdent' : 'indent');
                    }
                }}
				ref={editorRef}
				contentEditable
				className="border rounded p-3 mt-2"
				style={{ minHeight: '200px' }}
			>
			</div>
		</div>
	);
};

export default TiptapEditor;[]
