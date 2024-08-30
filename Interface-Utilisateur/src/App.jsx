import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header/Header';
import Patrimoine from './ChartPatrimoine/Patrimoine';
import PossessionTable from './TablePossession/PossessionTable';
import UpdatePossessionForm from './CRUD/UpdatePossession';

const route = createBrowserRouter([
  {
    path: "/",
    element: <Header/>,
  },
  {
    path: "/patrimoine",
    element: <Patrimoine/>,
  },
  {
    path: "/possession",
    element: <PossessionTable/>,
  },{
    path: "update-possession",
    element: <UpdatePossessionForm />
  }
])

export default route;