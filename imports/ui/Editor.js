import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  handleTitleChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      title: e.target.value
    });
  }
  handleBodyChange(e) {
    this.props.call('notes.update', this.props.note._id, {
      body: e.target.value
    });
  }
  render() {
    if (this.props.note) {
      return (
        <div>
          <input value={this.props.note.title} placeholder='Untitled Note' onChange={this.handleTitleChange.bind(this)}/>
          <textarea ref='body' value={this.props.note.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={() => { this.props.call('notes.remove', this.props.note._id) }}>Delete Note</button>
        </div>
      )
    } else {
      return (
        <p>
          { this.props.selectedNoteId ? 'Note not found.' : 'Select or create a note to get started.' }
        </p>
      )
    }
  };
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne({ _id: selectedNoteId }),
    call: Meteor.call
  };
}, Editor);
