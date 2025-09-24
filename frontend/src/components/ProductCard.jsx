// frontend/src/components/ProductCard.jsx
import React, { useState, useEffect } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  VStack,
} from "@chakra-ui/react";

// ✅ Use the same BASE_URL logic as store/product.js
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.MODE === "development" ? "http://localhost:5000" : "");

const ProductCard = ({ product, onProductUpdate, onProductDelete }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem("user"));

  // Initialize updatedProduct safely
  useEffect(() => {
    setUpdatedProduct({
      name: product.name || "",
      price: product.price?.toString() || "",
      image: product.image || "",
    });
  }, [product]);

  // Check if user is owner or admin
  const isOwnerOrAdmin =
    user?.id === product.owner?._id || user?.role === "admin";

  // Update product
  const handleUpdateProduct = async (pid, updatedProduct) => {
    if (!pid) return;

    if (
      !updatedProduct.name.trim() ||
      !updatedProduct.price.trim() ||
      !updatedProduct.image.trim()
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const priceValue = parseFloat(updatedProduct.price);
    if (isNaN(priceValue) || priceValue <= 0) {
      toast({
        title: "Error",
        description: "Price must be a valid number greater than 0",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token || ""}`,
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          price: priceValue,
          image: updatedProduct.image,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      toast({
        title: "Success",
        description: "Product updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      if (onProductUpdate) onProductUpdate(data.data);
    } catch (err) {
      console.error("Update product error:", err);
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Delete product
  const handleDeleteProduct = async (pid) => {
    if (!pid) return;

    try {
      const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token || ""}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");

      toast({
        title: "Success",
        description: "Product deleted successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      if (onProductDelete) onProductDelete(pid);
    } catch (err) {
      console.error("Delete product error:", err);
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
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        {isOwnerOrAdmin && (
          <HStack spacing={2}>
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={() => {
                setUpdatedProduct({
                  name: product.name || "",
                  price: product.price?.toString() || "",
                  image: product.image || "",
                });
                onOpen();
              }}
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={() => handleDeleteProduct(product._id)}
            />
          </HStack>
        )}
      </Box>

      {/* Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Product Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;

// import React, { useState } from 'react';
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import { Box, Heading, HStack, IconButton, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
// import { useProductStore } from '../store/product.js';
// import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
// import { Input, VStack } from '@chakra-ui/react';




// const ProductCard = ({product}) => {
//     const [updatedProduct, setUpdatedProduct] = useState(product);
    
//     const textColor = useColorModeValue("gray.600", "gray.200"); 
//     const bg= useColorModeValue("white", "gray.800");

//     const {deleteProduct, updateProduct} = useProductStore();
//     const toast = useToast();
//     const { isOpen, onOpen, onClose } = useDisclosure();

//     const handleDeleteProduct = async (pid) => {
//         const {success,message} = await deleteProduct(pid)
//         if(!success) {
//             return toast({
//                 title:"Error",
//                 description:message,
//                 status:"error",
//                 duration:3000,
//                 isClosable:true,
//             });
//         } else {
//             return toast({
//                 title:"Success",
//                 description:message,
//                 status:"success",
//                 duration:3000,
//                 isClosable:true,
//             });
//         }
//     }
     
//     const handleUpdateProduct = async (pid, updatedProduct) => {
//       const {success, message} = await updateProduct(pid, updatedProduct);
//         onClose();
//         if(!success) {
//             toast({
//                 title: "Error",
//                 description: message,
//                 status:"error",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         } else {
//             toast({
//                 title: "Success",
//                 description: message,
//                 status: "success",
//                 duration: 3000,
//                 isClosable: true,
//             });
//         }
//     }

//   return (
//     <Box 
//     shadow={"lg"}
//     rounded={"lg"}
//     overflow={"hidden"}
//     transition={"all 0.3s"}
//     _hover={{transform:"translateY(-5px)", shadow:"xl"}}
//     bg={bg}
//     >
//         <img src={product.image} alt={product.name} style={{width:"100%", height:"200px", objectFit:"cover"}} />
//         <Box p={4}>
//         <Heading as={"h3"} size={"md"} mb={2}>
//             {product.name}
//         </Heading>
        
//         <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
//             ${product.price}
//         </Text>

//         <HStack spacing={2}>
//             <IconButton icon={<EditIcon />} 
//             onClick={onOpen}
//             colorScheme="blue" />
//             <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} 
//             colorScheme="red" />
//         </HStack>
//         </Box>

//         <Modal isOpen={isOpen} onClose={onClose}>
//             <ModalOverlay />

            
//             <ModalContent>
//                 <ModalHeader>Update Product</ModalHeader>
//                 <ModalCloseButton />
//                 <ModalBody>
//                   <VStack spacing={4}>
//                     <Input
//                         placeholder='Product Name'
//                         name='name'
//                         onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
//                     />
//                     <Input
//                         placeholder='Product Price'
//                         name='price'
//                         type='number'
//                         onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
//                     />
//                     <Input
//                         placeholder='Product Image URL'
//                         name='image'
//                         onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
//                     />
//                   </VStack>
//                </ModalBody>
        
//                <ModalFooter>
//                 <Button colorScheme='blue' mr={3} 
//                   onClick={() => handleUpdateProduct(product._id, updatedProduct)}
//                 >
//                    Update
//                 </Button>
//                 <Button variant='ghost' onClick={onClose}>
//                     Cancel
//                 </Button>
//                </ModalFooter>
//               </ModalContent>

//         </Modal>
//     </Box>
//   )
// }

// export default ProductCard