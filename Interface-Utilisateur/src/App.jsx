import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import PossessionTable from './Possession/PossessionTable';
import Patrimoine from './Patrimoine/Patrimoine';
import Header from './Header/Header';
import UpdatePossessionForm from './Update/UpdatePossession';

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