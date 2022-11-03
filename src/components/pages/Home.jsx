import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { IconContext } from "react-icons";
import { FiSmile, FiCode, FiSun, FiMoon } from "react-icons/fi";
import localforage from 'localforage';

import NotesList from '../layout/NotesList';

const Home = ({ handleBgLightMode, handleToggleLightMode }) => {
  const date = new Date();

  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      title: 'notes',
      text: 'A progessive, desktop-only web application for jotting notes down.',
      date: date.toLocaleDateString(),
    },
  ]);

  const addNote = (title, text) => {
    const newNote = {
      id: nanoid(),
      title: title,
      text: text,
      date: date.toLocaleDateString()
    };

    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = id => {
    const newNotes = notes.filter(note => note.id !== id);

    setNotes(newNotes);
  };

  useEffect(() => {
    localforage.getItem('notes')
      .then(notes => {
        setNotes(notes);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    localforage.setItem('notes', notes)
      .catch(err => {
        console.error(err);
      });
  }, [notes]);

  return (
    <>
      <NotesList
        notes={notes}
        handleAddNote={addNote}
        handleDeleteNote={deleteNote}
      />
      <div>
        <IconContext.Provider value={{  className: 'sun-moon' }}>
          { handleBgLightMode
            ?
              <FiMoon onClick=
                {
                  () => handleToggleLightMode(previousDarkMode => !previousDarkMode)
                }
              />
            :
              <FiSun onClick=
                {
                  () => handleToggleLightMode(previousDarkMode => !previousDarkMode)
                }
              />
          }
        </IconContext.Provider>
      </div>
      <Link to="/">
        <IconContext.Provider value={{  className: 'smiley' }}>
          <FiSmile />
        </IconContext.Provider>
      </Link>
      <a href="https://github.com/labyrinthitis/notes/">
        <IconContext.Provider value={{  className: 'source-code' }}>
          <FiCode />
        </IconContext.Provider>
      </a>
    </>
  );
};

export default Home;