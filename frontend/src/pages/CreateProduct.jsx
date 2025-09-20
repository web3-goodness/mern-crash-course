// frontend/src/pages/CreateProduct.jsx
import { useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  Heading,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({ name: "", price: "", image: "" });
  const toast = useToast();
  const navigate = useNavigate();
  const bg = useColorModeValue("white", "gray.800");

  const user = JSON.parse(localStorage.getItem("user")); // logged-in user with token

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product.name || !product.price || !product.image) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || ""}`,
        },
        body: JSON.stringify(product),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create product");

      toast({
        title: "Success",
        description: "Product created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/"); // go back to home page
    } catch (err) {
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
    <Box maxW="md" mx="auto" mt={10} p={6} bg={bg} rounded="lg" shadow="md">
      <Heading mb={6} textAlign="center">
        Create Product
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <Input
            placeholder="Product Name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          <Input
            placeholder="Product Price"
            name="price"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Input
            placeholder="Product Image URL"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          <Button type="submit" colorScheme="blue" w="full">
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateProduct;
