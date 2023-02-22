import React from 'react';
import './styles/index.scss';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button onClick={(e) => {console.log(e)}}>DefaultPropsButton</Button>
      <Button disabled>DesabledPropsButton</Button>
      <Button
        btnType={ButtonType.Danger}
        size={ButtonSize.Large}
      >
        LargeDangerButton
      </Button>
      <Button
        disabled
        btnType={ButtonType.Link}
        size={ButtonSize.Small}
        href='https://www.baidu.com/'
      >
        SmallLinkButton
      </Button>
    </div>
  );
}

export default App;
