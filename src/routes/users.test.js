import React from 'react';
//import Adapter from 'enzyme-adapter-react-15';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
//import renderer from 'react-test-renderer';
import Users from './Users';


const wrapper = shallow(<Users />);
const instance = wrapper.instance();
instance.handleTestReset()


describe("Error Check: Username", () => {
  it("Trigger the username error", () => {

    const instance = wrapper.instance();
    instance.onSubmit()

    expect(wrapper.state('error')).toEqual("ERROR: Username was left blank.")

  });
});


describe("Error Check: Password", () => {
    it("Trigger the password error", () => {
  
      wrapper.setState({ user: 'TestDataDeleteMe' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Password was left blank.")
  
    });
  });

describe("Error Check: Confirm Password", () => {
    it("Trigger the Confirm Password error", () => {
  
      wrapper.setState({ pass: 'foobar2' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Confirm Password was left blank.")
  
    });
  });

  describe("Error Check: Password Match", () => {
    it("Trigger the Password Match error", () => {
  
      wrapper.setState({ cPass: 'foobar23' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Passwords do not match.")
  
    });
  }); 

  describe("Submission Successful Check", () => {
    it("Push through all inputs, and submit without triggering an error.", () => {
  
      wrapper.setState({ cPass: 'foobar2' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("")
  
    });
  }); 