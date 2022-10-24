import React, { useState, useEffect } from 'react';
import noteContext from './NoteContext';

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    // States
    const [notes, setNotes] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { showAlert } = props;

    // Checking if user verified or not
    const verifyUser = async () => {
        try {
            const res = await fetch(`${host}/api/user/verify`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            const text = await res.text();
            if (!res.ok) {
                throw new Error(text);
            };
            setIsLoggedIn(true);
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
        }
    };
    useEffect(() => {
        verifyUser();
    }, []);
    // Fetching notes for the first time
    const fetchNotes = async () => {
        try {
            const res = await fetch(`${host}/api/notes/get`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!res.ok) {
                const text = await res.text();
                throw new Error(text);
            };
            const data = await res.json();
            setNotes(data);
        } catch (error) {
            showAlert(error.message, 'danger');
            console.log(error);
        };
    };
    // Adding a new note on database as well as frontend
    const addNote = async (newNote) => {
        try {
            const res = await fetch(`${host}/api/notes/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(newNote)
            });
            if (res.status !== 201) {
                const text = await res.text()
                throw new Error(text);
            };
            const data = await res.json()
            setNotes((oldNotes) => {
                return oldNotes.concat(data);
            });
            showAlert('Note has been added succesfully', 'success');
        } catch (error) {
            console.log(error);
            showAlert('Some error occured, failed to add you note', 'danger');
        };
    };
    // Editing note both on frontend and database
    const editNote = async (editedNote) => {
        try {
            const res = await fetch(`${host}/api/notes/update/${editedNote.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(editedNote)
            });
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text);
            }
            // Updating notes for client side
            let newNotes = [];
            const updatedNote = await res.json();
            for (let i = 0; i < notes.length; i++) {
                newNotes[i] = notes[i]
                if (newNotes[i]._id === updatedNote._id) {
                    newNotes[i] = updatedNote;
                };
            };
            setNotes(newNotes);
            showAlert('Note has been edited succesfully', 'success');
        } catch (error) {
            console.log(error);
            showAlert('Some error occured, failed to edit your note', 'danger');
        };
    };
    // Deleting note both from database and frontend
    const deleteNote = async (id) => {
        try {
            const res = await fetch(`${host}/api/notes/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (!res.ok) {
                const text = await res.text()
                throw new Error(text);
            }
            const filteredNotes = notes.filter((note) => {
                return note._id !== id;
            });
            setNotes(filteredNotes);
            showAlert('Note has been deleted succesfully', 'danger');
        } catch (error) {
            console.log(error);
            showAlert('Some error occured, failed to delete your note', 'danger');
        };
    };

    return (
        <noteContext.Provider value={{ notes, fetchNotes, addNote, editNote, deleteNote, isLoggedIn, setIsLoggedIn }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;