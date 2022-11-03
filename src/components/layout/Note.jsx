import React, { useRef, useEffect } from 'react';
import interact from 'interactjs';

import '../../assets/index.css';

const Note = ({ id, title, text, date, handleDeleteNote }) => {
  const ref = useRef(null);

  useEffect(() => {
    interact(ref.current)
      .draggable({
        cursorChecker () {
          return null
        },
        listeners: {
          move: event => {
            let target = event.target;

            let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

            target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          },
        }
      })
      .resizable({
        cursorChecker () {
          return null
        },
        allowFrom: '.resize',
        edges: {
          left: false,
          right: true,
          bottom: true,
          top: false
        },
        modifiers: [
          interact.modifiers.restrictSize({
            min: { width: 100, height: 100 }
          })
        ],
        listeners: {
          move: event => {
            let target = event.target
            let x = (parseFloat(target.getAttribute('data-x')) || 0);
            let y = (parseFloat(target.getAttribute('data-y')) || 0);

            target.style.width = event.rect.width + 'px';
            target.style.height = event.rect.height + 'px';

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
          }
        }
      })
  })

  return (
    <div ref={ref} className='submitted-note'>
      <div className='added-note'>
        <span className='note-text'>{text}</span>
      </div>
      <div className='drag'></div>
      <span className='note-title'>{title}</span>
      <div
        className='add-delete-icon'
        onClick={() => handleDeleteNote(id)}
      >-</div>
      <div data-title={date}>*</div>
      <div className='resize'></div>
    </div>
  );
};

export default Note;