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
  useToast,
} from "@chakra-ui/react";
import { ArrowBackIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Save user info and token together
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...data.user, // id, username, email, role
          token: data.token,
        })
      );

      // Show toast
      toast({
        title: "Login successful",
        description: `Welcome back, ${
          data.user.username || data.user.email
        }!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Navigate to homepage
      navigate("/");
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
      {/* Back Button */}
      <IconButton
        icon={<ArrowBackIcon />}
        aria-label="Go back"
        mb={4}
        variant="ghost"
        onClick={() => navigate("/")}   // ✅ back to main page
      />

      <Heading mb={6} textAlign="center">
        Login
      </Heading>

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
              placeholder="Enter your email"
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
                placeholder="Enter your password"
              />
              <InputRightElement>
                <IconButton
                  tabIndex={-1}
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
