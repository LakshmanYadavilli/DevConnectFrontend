import Body from "./components/Body";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInOut from "./components/LogInOut";
import Home from "./components/Home";
import Profile from "./components/Profile";
function App() {
  console.log("from APP");

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/login" element={<LogInOut />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
