import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

export const NoteList = (props) => {
  return (
    <div className="item-list">
      <NoteListHeader/>
      <div>
        { props.notes.length === 0 ? <NoteListEmptyItem/> : props.notes.map((note) => <NoteListItem key={note._id} note={note}/>) }
      </div>
    </div>
  );
};


NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  Meteor.subscribe('notes');

  return {
    notes: Notes.find({}, {sort: { updatedAt: -1}}).fetch().map((note) => {
      if (note._id === selectedNoteId) {
        return { ...note, selected: true };
      }
      return { ...note };
    })
  }
}, NoteList);
