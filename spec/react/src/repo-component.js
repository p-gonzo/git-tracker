import React from 'react';
import { expect } from 'chai';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import spies from '../../sinon.config.js';
import githubMock from '../../github.mock.js'
spies.setUp(githubMock, 'logger');

import actions from '../../../src/actions/actions.js'
spies.setUp(actions, 'SET_CURRENT_PROJECT');


import Repo from '../../../src/components/repo.js';

let globals = {};

let fakeRepo =   {
  "org_name": "CHOAM",
  "repo_name": "atreides-admin",
  "group_name": "Padishah",
  "group_members": ["Princess Irulan", "Shaddam IV", "The Baron Harkonnen"]
}

configure({ adapter: new Adapter() })

describe('Repo component', () => {
  before(() => {
    globals.repo = shallow(<Repo 
      repo={fakeRepo}
      select={() => {}}  
    />)
  })

  it('should render the name of the repo', () => {
    let children = globals.repo.find('.card').children();
    expect(children).to.have.length(3);
    expect(children.at(0).text()).to.equal(fakeRepo.group_name);
  })

  it('should send an AJAX request for the branches of the repo', () => {
    setTimeout(() => {
      expect(githubMock.logger.callCount).to.equal(1)
    }, 1000)
  })

  it('should render a selector with one option for each branch', () => {
    setTimeout(() => {
      let numOptions = globals.repo.find('select').children().length;
      expect(numOptions).to.equal(3)
    }, 1000)
  })
})
