import React, { useContext } from 'react';
import noteContext from '../context/NoteContext';

const NoteItem = ({ note, handlePopup }) => {

    const {deleteNote} = useContext(noteContext);
    // Deleting note
    const handleDelete = () => {
        const confirm = window.confirm(`Are you sure, the note "${note.title}" is going to delete?`);
        if (confirm) {
            deleteNote(note._id)
        };
    };

    const { title, description } = note;
    return (
        <div className='note'>
            <div>
                <h4 className='note-title'>{title}</h4>
                <p className='note-desc'>{description}</p>
            </div>
            <div>
                <div><i className="fa-regular fa-pen-to-square" onClick={()=>handlePopup(note)}></i></div>
                <div><i className="fa-solid fa-trash" onClick={handleDelete}></i></div>
            </div>
        </div>
    )
}

export default NoteItem