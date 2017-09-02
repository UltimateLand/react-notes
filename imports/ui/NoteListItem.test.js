import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import NoteListItem from './NoteListItem';

if (Meteor.isClient) {
  describe('NoteListItem', function () {

    it('should render title and timestamp', function () {
      const note = { title: 'This is title', updatedAt: 1504318044544 };
      const wrapper = mount( <NoteListItem note={note}/> );

      expect(wrapper.find('h5').text()).toBe(note.title);
      expect(wrapper.find('p').text()).toBe('9/02/17');
    });

    it('should setup default title if no title set', function () {
      const note = { title: '' };
      const wrapper = mount( <NoteListItem note={note}/> );

      expect(wrapper.find('h5').text()).toBe('Untitled note');
    });

  });
}
