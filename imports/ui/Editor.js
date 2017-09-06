import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import Modal from 'react-modal';

import { Notes } from '../api/notes';

export class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      modalOpen: false
    };
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('notes.update', this.props.note._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('notes.update', this.props.note._id, { body });
  }
  handleRemoval() {
    this.setState({ modalOpen: false });
    this.props.call('notes.remove', this.props.note._id);
    this.props.browserHistory.replace('/dashboard');
  }
  componentDidUpdate(prevProps, prevState) {
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && prevNoteId !== currentNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder='Untitled Note' onChange={this.handleTitleChange.bind(this)}/>
          <textarea className="editor__body" ref='body' value={this.state.body} placeholder='Your note here' onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={() => this.setState({modalOpen: true})}>Delete Note</button>
            <Modal
              isOpen={this.state.modalOpen}
              contentLabel="Delete the Note"
              onRequestClose={() => this.setState({modalOpen: false})}
              className="boxed-view__modal"
              overlayClassName="boxed-view boxed-view--modal">
              <h2>Delete the Note</h2>
              <h3 className="editor-modal__title">Title:{this.state.title}</h3>
              <div className="editor-modal__body">
                <p className="editor-modal__body--note">Note:</p>
                <p className="editor-modal__body--space">{this.state.body}</p>
              </div>
              <div>
                <button className="button button-modal button--spacing" onClick={this.handleRemoval.bind(this)}>Yes</button>
                <button className="button button-modal button--secondary" onClick={() => this.setState({modalOpen: false})}>No</button>
              </div>
            </Modal>
          </div>
        </div>
      )
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            { this.props.selectedNoteId ? 'Note not found.' : 'Select or create a note to get started.' }
          </p>
        </div>
      )
    }
  };
}

Editor.propTypes = {
  note: PropTypes.object,
  selectedNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
  const selectedNoteId = Session.get('selectedNoteId');

  return {
    selectedNoteId,
    note: Notes.findOne({ _id: selectedNoteId }),
    call: Meteor.call,
    browserHistory
  };
}, Editor);
