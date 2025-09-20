// frontend/src/pages/Dashboard.jsx
import { useEffect } from "react";
import { Box, VStack, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/home"); // ✅ safe redirect
    }
  }, [user, navigate]);

  return (
    <Box textAlign="center" py={20}>
      <VStack spacing={6}>
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          Welcome to the Product App 🛒
        </Heading>

        <Button
          colorScheme="blue"
          size="lg"
          w="200px"
          onClick={() => navigate("/signup")}
        >
          Signup
        </Button>

        <Button
          colorScheme="green"
          size="lg"
          w="200px"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Dashboard;
