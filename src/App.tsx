import TranslateSections from './components/Translate Sections/TranslateSections';
import logo from '/icons/logo.svg';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './App.module.css';

function App() {

  return (
    <>
      <div className={styles.hero}>
        <div className={styles.logo}>
          <img
            src={logo}
            alt="Logo Translate app"
            width={200}
          />
        </div>

        <TranslateSections />
      </div>

      <ToastContainer />
    </>
  );
}

export default App;
