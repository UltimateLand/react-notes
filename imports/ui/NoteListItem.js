import React from 'react';
import moment from 'moment';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';

const NoteListItem = (props) => {
  return (
    <div>
      <h5>{ props.note.title || 'Untitled note' }</h5>
      <p>{ moment(props.note.updatedAt).format('M/DD/YY') }</p>
      <button onClick={() => { Meteor.call('notes.remove', props.note._id) }}>Delete</button>
    </div>
  );
};

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

export default NoteListItem;
