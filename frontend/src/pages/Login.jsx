// frontend/src/pages/Login.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Text,
  useColorModeValue,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  // 🔗 Use same Render/localhost logic
  const API_URL =
    import.meta.env.MODE === "production"
      ? "https://your-backend.onrender.com" // ⬅️ replace with your real Render backend
      : "http://localhost:5000";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save user/token in localStorage for protected routes
      localStorage.setItem("user", JSON.stringify(data));

      toast({
        title: "Login successful",
        description: "Welcome back!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/dashboard"); // or wherever you want after login
    } catch (err) {
      setError(err.message);
      toast({
        title: "Login failed",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const borderColor = useColorModeValue("gray.300", "gray.600");
  const textColor = useColorModeValue("black", "white");

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      rounded="lg"
      shadow="md"
    >
      <HStack mb={4}>
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          variant="ghost"
        />
        <Heading size="lg">Login</Heading>
      </HStack>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              bg={inputBg}
              color={textColor}
              border="1px solid"
              borderColor={borderColor}
              placeholder="Enter email"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={show ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                bg={inputBg}
                color={textColor}
                border="1px solid"
                borderColor={borderColor}
                placeholder="Enter password"
              />
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  aria-label={show ? "Hide password" : "Show password"}
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShow((s) => !s)}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="blue" w="full">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default Login;
