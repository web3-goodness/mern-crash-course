import React, { useState } from 'react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { useProductStore } from '../store/product.js';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';
import { Input, VStack } from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      return toast({
        title: "Error", 
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      return toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    onClose();
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product updated successfully", 
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "200px", objectFit: "cover" }} />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={() => {
              // ✅ Populate modal with current product details when opening
              setUpdatedProduct({
                name: product.name,
                price: product.price,
                image: product.image
              });
              onOpen();
            }}
            colorScheme="blue"
          />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name} // ✅ Bind value to state
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder='Product Price'
                name='price'
                type='number'
                value={updatedProduct.price} // ✅ Bind value to state
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder='Product Image URL'
                name='image'
                value={updatedProduct.image} // ✅ Bind value to state
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme='blue'
              mr={3}
              onClick={() => handleUpdateProduct(product._id, updatedProduct)}
            >
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>
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