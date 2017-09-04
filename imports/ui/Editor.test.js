import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Editor } from './Editor';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('Editor', function () {
    let browserHistory;
    let call;

    beforeEach(function () {
      call = expect.createSpy(),
      browserHistory = {
        replace: expect.createSpy()
      };
    });

    it('should render select note message', function () {
      const wrapper = mount( <Editor browserHistory={browserHistory} call={call}/> );

      expect(wrapper.find('p').text()).toBe('Select or create a note to get started.');
    });

    it('should render Note Not Found message', function () {
      const wrapper = mount( <Editor selectedNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/> );

      expect(wrapper.find('p').text()).toBe('Note not found.');
    });

    it('should remove note', function () {
      const wrapper = mount( <Editor note={notes[0]} selectNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/> );

      wrapper.find('button').simulate('click');

      expect(call).toHaveBeenCalledWith('notes.remove', notes[0]._id);
      expect(browserHistory.replace).toHaveBeenCalledWith('/dashboard');
    });

    it('should updat the note title on input change', function () {
      const newTitle = 'This is my new title text';
      const wrapper = mount( <Editor note={notes[0]} selectNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/> );

      wrapper.find('input').simulate('change', {
        target: {
          value: newTitle
        }
      });

      expect(wrapper.state('title')).toBe(newTitle);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { title: newTitle });
    });

    it('should update the note body on textarea change', function () {
      const newBody = 'This is my new body text';
      const wrapper = mount( <Editor note={notes[0]} selectNoteId={notes[0]._id} call={call} browserHistory={browserHistory}/> );

      wrapper.find('textarea').simulate('change', {
        target: {
          value: newBody
        }
      });

      expect(wrapper.state('body')).toBe(newBody);
      expect(call).toHaveBeenCalledWith('notes.update', notes[0]._id, { body: newBody });
    });

    it('should set title and body for new note', function () {
      const wrapper = mount( <Editor browserHistory={browserHistory} call={call}/> );

      wrapper.setProps({
        selectedNoteId: notes[1]._id,
        note: notes[1]
      });

      expect(wrapper.find('input').text()).toBe(notes[1].title);
      expect(wrapper.find('textarea').text()).toBe(notes[1].body);
    });

    it('should not set title and body if note prop not provided', function () {
      const wrapper = mount( <Editor browserHistory={browserHistory} call={call}/> );

      wrapper.setProps({
        selectedNoteId: notes[1]._id
      });

      expect(wrapper.state('title')).toBe('');
      expect(wrapper.state('body')).toBe('');
    });

  });
}
