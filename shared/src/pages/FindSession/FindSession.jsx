import { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Page from '../../components/Page';
import TimeStamp from '../../components/TimeStamp';
import Content from '../../components/Content';
import FormField from './FormField';
import './find-session.scss';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import FindSessionButton from './FindSessionButton/FindSessionButton';

function FindSession() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const deviceId = queryParams.get('deviceId');

  const [currentInput, setCurrentInput] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  // Keyboard
  const [layout, setLayout] = useState('default');
  const keyboard = useRef();

  const onChange = (input) => {
    if (currentInput === 'email-field') {
      setEmail(input);
    } else if (currentInput === 'fname-field') {
      setFirstName(input);
    } else if (currentInput === 'lname-field') {
      setLastName(input);
    }
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const onChangeInput = (event) => {
    keyboard.current.setInput(event.target.value);

    if (currentInput === 'email-field') {
      setEmail(event.target.value);
    } else if (currentInput === 'fname-field') {
      setFirstName(event.target.value);
    } else if (currentInput === 'lname-field') {
      setLastName(event.target.value);
    }
  };

  const onFocusInput = (id) => {
    setCurrentInput(id);

    if (id === 'email-field') {
      keyboard.current.setInput(email);
    } else if (id === 'fname-field') {
      keyboard.current.setInput(firstName);
    } else if (id === 'lname-field') {
      keyboard.current.setInput(lastName);
    }
  };

  return (
    <Page>
      <TimeStamp />
      <div className="center-container">
        <h1>Welcome to Region 4</h1>
        <p>
          <strong>Print QR Code here or go to session room to check-in.</strong>
        </p>
      </div>
      <Content>
        <div className="qr-inner-content-wrapper">
          <form>
            <h2 className="qr-inner-content-heading">Search for Session</h2>
            <FormField
              label="E-mail Address"
              htmlFor="email-field"
              placeholder="Enter E-mail"
              type="email"
              note="We'll never share your email with anyone else."
              value={email}
              onChange={onChangeInput}
              onFocus={onFocusInput}
            />
            <FormField
              label="First Name"
              htmlFor="fname-field"
              placeholder="Enter First Name"
              type="text"
              value={firstName}
              onChange={onChangeInput}
              onFocus={onFocusInput}
            />
            <FormField
              label="Last Name"
              htmlFor="lname-field"
              placeholder="Enter Last Name"
              type="text"
              value={lastName}
              onChange={onChangeInput}
              onFocus={onFocusInput}
            />
            {/* <FormField label='Phone Number' htmlFor='phone-field' placeholder='Enter Phone Number' type='tel' required={false} /> */}
            <div className="find-session-submission">
              <div>
                <div className="qr-button qr-button-left">
                  <FindSessionButton 
                    deviceId={deviceId}
                    email={email}
                    firstName={firstName}
                    lastName={lastName}
                  />
                </div>
                <p className="text-danger">
                  <em>* indicates a required field</em>
                </p>
              </div>
            </div>
          </form>
        </div>
      </Content>
      <Keyboard
        keyboardRef={(r) => (keyboard.current = r)}
        layoutName={layout}
        onChange={onChange}
        onKeyPress={onKeyPress}
        theme={"hg-theme-default custom-keyboard"}
      />
    </Page>
  );
}

export default FindSession;
