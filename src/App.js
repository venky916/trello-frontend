import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import TodoPage from './pages/TodoPage';
import AuthPage from './pages/AuthPage';
import { Provider } from 'react-redux';
import store from './store/store';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <TodoPage />
        },
        {
          path: '/auth',
          element: <AuthPage />
        }
      ]
    }
  ])

  return (
    <div className="">
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
        <RouterProvider router={appRouter} />
        </DndProvider>
      </Provider>
    </div>
  );
}

export default App;
