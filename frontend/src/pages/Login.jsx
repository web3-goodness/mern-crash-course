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

  // Use VITE_API_URL when set; otherwise use relative paths so the same origin is used (works on Render)
  const API_URL = import.meta.env.VITE_API_URL ?? "";

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      // Some non-JSON responses (HTML errors) can break res.json(); handle safely
      const text = await res.text();
      let data;
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { message: text || "Unexpected server response" };
      }

      if (!res.ok) throw new Error(data.message || "Login failed");

      // normalize user object and token
      const userObj = data.user ?? data.data ?? data;
      const token = data.token ?? userObj.token ?? null;

      // Persist to localStorage in a consistent shape: { ...userFields, token }
      const toStore = { ...(userObj || {}), token };
      localStorage.setItem("user", JSON.stringify(toStore));

      toast({
        title: "Login successful",
        description: `Welcome back, ${userObj.username || userObj.email || "user"}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // navigate to home (or `/dashboard` if you prefer)
      navigate("/");
    } catch (err) {
      const msg = err?.message || "Login failed";
      setError(msg);
      toast({
        title: "Login failed",
        description: msg,
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
