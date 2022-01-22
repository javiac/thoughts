import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorProvider } from './contexts/ErrorProvider';
import { Layout } from './views/Layout/Layout';
import { Me } from './views/Me/Me';
import { Messages } from './views/Messages/Messages';
import { NoPage } from './views/NoPage/NoPage';
import { Program } from './views/Program/Program';
import { ThoughtDetails } from './views/ThoughtDetails/ThoughtDetails';
import { ThoughtsList } from './views/ThoughtsList/ThoughtsList';

function App() {
  return (
    <ErrorProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="program" element={<Program />} />
            <Route path="messages" element={<Messages />} />
            <Route path="thoughts" element={<ThoughtsList />} />
            <Route path="thoughts/:id" element={<ThoughtDetails />} />
            <Route path="me" element={<Me />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorProvider>
  );
}

export default App;
