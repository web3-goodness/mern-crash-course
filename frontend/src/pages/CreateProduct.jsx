// frontend/src/pages/CreateProduct.jsx
import { useState } from "react";
import {
  Box, Button, Input, VStack, Heading, FormControl, FormLabel,
  useToast, Text
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const [product, setProduct] = useState({ name: "", price: "", description: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  // ✅ Dev uses localhost, prod uses Render-relative path
  const API_URL =
    import.meta.env.MODE === "development"
      ? "http://localhost:5000"
      : "";

  const handleChange = (e) =>
    setProduct((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      setError("Not authorized");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to create product");
      }

      toast({
        title: "Product created",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth={1} rounded="lg" shadow="md">
      <Heading size="lg" mb={6}>Create Product</Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input name="name" value={product.name} onChange={handleChange} required />
          </FormControl>

          <FormControl>
            <FormLabel>Price</FormLabel>
            <Input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Input
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </FormControl>

          {error && <Text color="red.500">{error}</Text>}
          <Button type="submit" colorScheme="blue" w="full">
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

export default CreateProduct;
