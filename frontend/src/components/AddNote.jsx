import React, { useState, useContext } from 'react';
import noteContext from '../context/NoteContext';

const AddNote = () => {

    const { addNote } = useContext(noteContext);

    const [newNote, setNewNote] = useState({
        title: '',
        tag: '',
        description: ''
    });
    const { title, tag, description } = newNote;
    
    const handleChange = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addNote(newNote);
        setNewNote({
            title: '',
            tag: '',
            description: ''
        });
    };

    return (
        <div>
            <div className='note-form'>
                <form onSubmit={handleSubmit}>
                    <h3 style={{margin:'-6px 0 8px 0'}}>Add a new note to your collection</h3>
                    <input type="text" placeholder="Enter note title" name="title" required value={title} onChange={handleChange}></input>
                    <input type="text" placeholder="Enter note tag" name="tag" required value={tag} onChange={handleChange}></input>
                    <div><textarea rows="3" placeholder="Enter note description" name="description" required value={description} onChange={handleChange}></textarea></div>
                    <button className='btn'>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote;