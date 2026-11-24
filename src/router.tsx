import {createBrowserRouter, redirect} from "react-router-dom";
import Layout from "./components/Layout.tsx";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import CollectionsCatalog from "./pages/CollectionsCatalog/CollectionsCatalog.tsx";
import Collection from "./pages/Collection/Collection.tsx";
import Question from "./pages/Question/Question.tsx";
import NotFound from "./pages/NotFound/NotFound.tsx";

export const router= createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        index: true,
        loader: async () => redirect('/collections'),

      },
      {
        path: 'collections',
        element: <CollectionsCatalog />,
      },
      {
        path: 'collection/:id',
        element: <Collection />,
      },
      {
        path: 'questions/:id',
        element: <Question />,
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
])