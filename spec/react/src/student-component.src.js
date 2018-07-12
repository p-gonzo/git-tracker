import React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Student from "../../../src/components/student.js";

let globals = {};

let fakeStudent = {
  name: "Duke Leto Atreides",
  "github-handle": "theSleeperMustAwaken"
};

configure({ adapter: new Adapter() });

describe("Student component", () => {
  beforeEach(() => {
    globals.student = shallow(<Student student={fakeStudent} />);
  });

  it("should render the name of the student", () => {
    expect(globals.student.children()).to.have.length(1);
    expect(globals.student.children().text()).to.equal(fakeStudent.name);
  });
});
