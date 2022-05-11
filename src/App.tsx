import React, { lazy, memo, Suspense } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import PageHome from "./pages/PageHome";
import { store } from "./redux-modules/store";

import "./App.css";

const PageDetail = lazy(() => import("./pages/PageDetail"));

const App = memo(
  (): JSX.Element => (
    <Provider store={store}>
      <Router>
        <Suspense>
          <Routes>
            <Route path="/" element={<PageHome />} />
            <Route path="/detail/:id" element={<PageDetail />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  )
);

export default App;
