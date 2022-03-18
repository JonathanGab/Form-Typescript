import './App.css';
import Header from './components/Header';
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';

function App() {
  if (typeof window !== 'undefined') {
    injectStyle();
  }
  return (
    <div className="App">
      <Header />
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Router />
    </div>
  );
}

export default App;
