import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { NoteList } from './NoteList';
import { notes } from '../fixtures/fixtures';

if (Meteor.isClient) {
  describe('NoteList', function () {

    it('should render NoteListItem if there is notes', function () {
      const wrapper = mount( <NoteList notes={notes}/> );

      expect(wrapper.find('NoteListItem').length).toBe(2);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
    });

    it('should render NoteListEmptyItem if not notes', function () {
      const wrapper = mount( <NoteList notes={[]}/> );

      expect(wrapper.find('NoteListItem').length).toBe(0);
      expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
    });

  });
}
