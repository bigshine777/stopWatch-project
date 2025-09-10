import { Routes, Route } from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;