import React from 'react';
//import Adapter from 'enzyme-adapter-react-15';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});
//import renderer from 'react-test-renderer';
import Appointments from './appointments';


const wrapper = shallow(<Appointments />);
const instance = wrapper.instance();


describe("Error Check: Title name", () => {
  it("Trigger the title error", () => {

    const instance = wrapper.instance();
    instance.onSubmit()

    expect(wrapper.state('error')).toEqual("ERROR: Title was left blank.")

  });
});


describe("Error Check: Customer ID", () => {
    it("Trigger the customer ID error", () => {
  
      wrapper.setState({ title: 'TestDataDeleteMe' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Customer was not selected.")
  
    });
  });

describe("Error Check: Worker", () => {
    it("Trigger the worker error", () => {
  
      wrapper.setState({ custid: '_placeholderid' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Field Worker was not selected.")
  
    });
  });

  describe("Error Check: Date", () => {
    it("Trigger the date error", () => {
  
        wrapper.setState({ workerid: '_placeholderid' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Date was not selected.")
  
    });
  }); 

  describe("Error Check: Start time", () => {
    it("Trigger the start time error", () => {
  
      wrapper.setState({  date: '2020-07-07' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Start time was not selected.")
  
    });
  });

  describe("Error Check: End time", () => {
    it("Trigger the end time error", () => {
  
      wrapper.setState({  stime: '13:40' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: End time was not selected.")
  
    });
  });

  describe("Error Check: Rate", () => {
    it("Trigger the rate error", () => {
  
      wrapper.setState({  etime: '15:40' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Charge rate was left blank.")
  
    });
  });

  describe("Error Check: Total", () => {
    it("Trigger the total error", () => {
  
      wrapper.setState({  rate: 2 });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Total rate was left blank.")
  
    });
  });

  describe("Error Check: Start Time Too Low", () => {
    it("Trigger the start time too low error", () => {
      wrapper.setState({  total: 4 });
        
      wrapper.setState({  stime: '05:00' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Starting time is lower than the opening time.")
  
    });
  });

//   describe("Error Check: Start Time Too High", () => {
//     it("Trigger the start time too low error", () => {
  
//       wrapper.setState({  stime: '21:00' });
//       const instance = wrapper.instance();
//       instance.onSubmit()
  
//       expect(wrapper.state('error')).toEqual("ERROR: Starting time is higher than the opening time.")
  
//     });
//   });

  describe("Error Check: End Time Too High", () => {
    it("Trigger the end time too high error", () => {
    
      wrapper.setState({  stime: '13:40' });

      wrapper.setState({  etime: '21:00' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("ERROR: Ending time is higher than the closing time.")
  
    });
  });

  describe("Submission Successful Check", () => {
    it("Push through all inputs, and submit without triggering an error.", () => {
        
        wrapper.setState({  stime: '13:40' });

        wrapper.setState({  etime: '15:40' });
      const instance = wrapper.instance();
      instance.onSubmit()
  
      expect(wrapper.state('error')).toEqual("")
  
    });
  }); 