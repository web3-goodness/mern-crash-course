// frontend/src/pages/EditProduct.jsx
import { Box, VStack, Input, Button, Heading, Textarea } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (res.ok) {
          setName(data.name);
          setDescription(data.description);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ name, description }),
      });

      if (res.ok) {
        navigate("/home");
      }
    } catch (err) {
      console.error("Failed to update product", err);
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={10}>
      <VStack spacing={4}>
        <Heading>Edit Product</Heading>
        <Input
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update
        </Button>
      </VStack>
    </Box>
  );
};

export default EditProduct;
