import './App.scss'
import './styles/index.scss';
import ButtonExample from './examples/ButtonExample/ButtonExample';
import MenuExample from './examples/MenuExample/MenuExample';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

function App() {
  return (
    <>
      <ButtonExample></ButtonExample>
      <MenuExample></MenuExample>
      <FontAwesomeIcon icon={faEnvelope} />
    </>
  );
}

export default App;
