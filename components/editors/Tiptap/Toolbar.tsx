'use client';
import React, { ChangeEvent } from 'react';

type Props = {
    onCommand: (command: string, value?: string) => void;
    onSetHeading: (tag: string) => void;
    onInsertImage: (file: File) => void;
    onInsertInlineTag: (tag: string) => void;
};

const Toolbaar: React.FC<Props> = ({ onCommand, onSetHeading, onInsertImage, onInsertInlineTag }) => {
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onInsertImage(file);
    };

    return (
        <div className="btn-toolbar mb-2 gap-2 d-flex flex-wrap align-items-center">
            {/* Basic Formatting */}
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('bold')}>Bold</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('italic')}>Italic</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('underline')}>Underline</button>

            {/* Headings */}
            <select className="form-select form-select-sm w-auto" onChange={(e) => onSetHeading(e.target.value)} defaultValue="">
                <option value="" disabled>Headings</option>
                <option value="p">Paragraph</option>
                <option value="h1">Heading 1</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
                <option value="h4">Heading 4</option>
                <option value="h5">Heading 5</option>
                <option value="h6">Heading 6</option>
            </select>

            {/* Alignment */}
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('justifyLeft')}>Left</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('justifyCenter')}>Center</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('justifyRight')}>Right</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('justifyFull')}>Justify</button>

            {/* Image Upload */}
            <label className="btn btn-outline-primary btn-sm mb-0">
                Insert Image
                <input type="file" accept="image/*" className="d-none" onChange={handleImageChange} />
            </label>

            {/* Code Block */}
            <button className="btn btn-outline-warning btn-sm" onClick={() => onCommand('formatBlock', 'pre')}>
                Code Block
            </button>

            <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => onInsertInlineTag('code')}
            >
                Inline Code
            </button>

            {/* Indent / Outdent */}
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('indent')}>Tab ➡️</button>
            <button className="btn btn-outline-dark btn-sm" onClick={() => onCommand('outdent')}>BackTab ⬅️</button>

            {/* Undo / Redo */}
            <button className="btn btn-outline-danger btn-sm" onClick={() => onCommand('undo')}>Undo</button>
            <button className="btn btn-outline-success btn-sm" onClick={() => onCommand('redo')}>Redo</button>
        </div>
    );
};

export default Toolbaar;
