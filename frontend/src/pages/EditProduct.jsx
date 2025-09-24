// frontend/src/pages/EditProduct.jsx
import {
  Box,
  VStack,
  Input,
  Button,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const toast = useToast();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  // Fetch existing product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();

        if (res.ok) {
          setProduct({
            name: data.name || "",
            price: data.price?.toString() || "",
            image: data.image || "",
          });
        } else {
          toast({
            title: "Error",
            description: data.message || "Failed to fetch product",
            status: "error",
            isClosable: true,
          });
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
        toast({
          title: "Error",
          description: "Something went wrong while fetching product",
          status: "error",
          isClosable: true,
        });
      }
    };
    fetchProduct();
  }, [id, toast]);

  // Handle update
  const handleUpdate = async () => {
    // Validation
    if (!product.name.trim() || !product.price.trim() || !product.image.trim()) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const priceValue = parseFloat(product.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Error",
        description: "Price must be a valid number greater than 0",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || ""}`,
        },
        body: JSON.stringify({
          name: product.name,
          price: priceValue,
          image: product.image,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update product");
      }

      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        isClosable: true,
      });

      navigate("/"); // back to homepage
    } catch (err) {
      console.error("Failed to update product", err);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={10}>
      <VStack spacing={4}>
        <Heading>Edit Product</Heading>
        <Input
          placeholder="Product Name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
        <Input
          placeholder="Price"
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
        <Input
          placeholder="Image URL"
          value={product.image}
          onChange={(e) => setProduct({ ...product, image: e.target.value })}
        />
        <Button colorScheme="blue" onClick={handleUpdate}>
          Update
        </Button>
      </VStack>
    </Box>
  );
};

export default EditProduct;
