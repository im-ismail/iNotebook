import React, { useContext, useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/NoteContext';
import NoteItem from './NoteItem';
import '../CSS/modal.css';

const Notes = () => {

  const [editedNote, setEditedNote] = useState({
    title: '',
    tag: '',
    description: ''
  });
  const { title, tag, description } = editedNote;
  const { isLoggedIn, notes, fetchNotes, editNote } = useContext(noteContext);

  // Fetching notes if user logged in else redirect to /login
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      fetchNotes();
    }else{
      navigate('/login');
    };
  }, []);
  
  // Toggling modal popup box
  const ref = useRef();
  const handlePopup = (note) => {
    setEditedNote({
      title: note.title,
      tag: note.tag,
      description: note.description,
      id: note._id
    });
    ref.current.classList.toggle('popup-active');
  }
  // Handling change event
  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };
  // Handling submit event for editing note
  const handleSubmit = (e) => {
    e.preventDefault();
    editNote(editedNote);
    ref.current.classList.toggle('popup-active');
  };

  return (
    <div className='notes'>
      {/* Popup modal start */}
      <div className="popup" ref={ref}>
        <i className="fa-regular fa-circle-xmark" onClick={handlePopup}></i>
        <h2 className='heading'>Edit your note</h2>
        <div className="line"></div>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter note title" name="title" required value={title} onChange={handleChange}></input>
          <input type="text" placeholder="Enter note tag" name="tag" required value={tag} onChange={handleChange}></input>
          <div><textarea rows="3" placeholder="Enter note description" name="description" required value={description} onChange={handleChange}></textarea></div>
          <button className='btn'>Save changes</button>
        </form>
      </div>
      {/* Popup modal end */}
      <h2>Notes collection</h2>
      <div className='notes-container'>
        {notes.map((note) => {
          return <NoteItem note={note} key={note._id} handlePopup={handlePopup} />
        })}
      </div>
    </div>
  )
}

export default Notes;