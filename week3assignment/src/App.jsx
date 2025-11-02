import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import ApiData from "./pages/ApiData";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/data" element={<ApiData />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
