import './App.scss';
import DefaultRoutes from './components/routes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <DefaultRoutes />
      </div>
    </AuthProvider>
  );
}

export default App;
