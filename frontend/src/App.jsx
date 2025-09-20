// frontend/src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

function App() {
  return (
    <>
      <Navbar /> {/* Navbar appears on all pages */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
        <Route path="/edit/:id" element={<EditProduct />} />
      </Routes>
    </>
  );
}

export default App;


// // frontend/src/App.jsx
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import HomePage from "./pages/HomePage";
// import CreateProduct from "./pages/CreateProduct"; // if you have this page
// import EditProduct from "./pages/EditProduct"; // if you have this page

// function App() {
//   return (
//     <Router>
//       <Navbar /> {/* Navbar appears on all pages */}
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<HomePage />} />
//         <Route path="/create" element={<CreateProduct />} />
//         <Route path="/edit/:id" element={<EditProduct />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import { Box, useColorModeValue } from "@chakra-ui/react";
// import { Route, Routes } from "react-router-dom";
// import CreatePage from "./pages/CreatePage";
// import HomePage from "./pages/HomePage";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
//       <Navbar />
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Protected routes (later we’ll restrict them with auth check) */}
//         <Route path="/create" element={<CreatePage />} />
//       </Routes>
//     </Box>
//   );
// }

// export default App;


// import { Box, useColorModeValue } from "@chakra-ui/react";
// import { Route, Routes } from "react-router-dom";
// import CreatePage from "./pages/CreatePage";
// import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
//       <Navbar /> 
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/create" element={<CreatePage />} />
//       </Routes> 
//     </Box>
//   )
// }

// export default App  




// import { Button } from "@chakra-ui/react"

// function App() {
//   return (
//     <>
//       <Button colorScheme="teal">Hello</Button>
//     </>
//   )
// }

// export default App



