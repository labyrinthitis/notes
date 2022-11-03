import React, { useState } from 'react';
import { IconContext } from "react-icons";
import { FiPlus } from "react-icons/fi";

import Modal from './Modal';

const AddNote = ({ handleAddNote }) => {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteText, setNoteText] = useState('');

  const submitEnter = event => {
    if (event.key === "Enter") {
      if ((noteTitle.trim().length > 0) && (noteText.trim().length > 0)) {
        handleAddNote(noteTitle, noteText);
  
        setNoteTitle('');
        setNoteText('');
      }
    }
  }

  return (
    <Modal
    activator={({ setShow }) => (
        <IconContext.Provider value={{  className: 'add-note' }}>
          <FiPlus onClick={() => setShow(true)} />
        </IconContext.Provider>
    )}
    >
      <div className='modal-add-note'>
        <div className='modal-toolbar'></div>
        <input
          type="text"
          className="modal-add-title"
          placeholder="Add a title..."
          value={noteTitle}
          onChange={ event => setNoteTitle(event.target.value) }
          autoFocus
        />
        <textarea
          className="note-text"
          placeholder="Add a note..."
          value={noteText}
          onChange={ event => setNoteText(event.target.value) }
          onKeyDown={event => submitEnter(event)}
        ></textarea>
      </div>
    </Modal>
  );
};

export default AddNote;