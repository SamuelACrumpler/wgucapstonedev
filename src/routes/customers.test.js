import React from 'react';
//import Adapter from 'enzyme-adapter-react-15';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
//import renderer from 'react-test-renderer';
import Customers from './customers';


const wrapper = shallow(<Customers />);
const instance = wrapper.instance();


describe("Error Check: Customer name", () => {
  it("Trigger the Customer name error", () => {

    const instance = wrapper.instance();
    instance.onSubmit()

    expect(wrapper.state('error')).toEqual("ERROR: Name was left blank.")

  });
});


describe("Error Check: Address", () => {
    it("Trigger the Address error", () => {
  
      wrapper.setState({ name: 'TestDataDeleteMe' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Address was left blank.")
  
    });
  });

describe("Error Check: City", () => {
    it("Trigger the city error", () => {
  
      wrapper.setState({ address: 'foobar 123' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: City was left blank.")
  
    });
  });

  describe("Error Check: Zip", () => {
    it("Trigger the zip error", () => {
  
      wrapper.setState({ city: 'Foobar City' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Zip was left blank.")
  
    });
  }); 

  describe("Error Check: Phone Number", () => {
    it("Trigger the phone number error", () => {
  
      wrapper.setState({  zip: '12345-7890' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Phone number was left blank.")
  
    });
  });

  describe("Submission Successful Check", () => {
    it("Push through all inputs, and submit without triggering an error.", () => {
        
    wrapper.setState({  phone: '867-5309' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("")
  
    });
  }); 