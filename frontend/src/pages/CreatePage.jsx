// frontend/src/pages/CreatePage.jsx
import { Container, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { VStack, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "", // controlled input as string
    image: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    // Trim inputs and validate
    const name = newProduct.name.trim();
    const price = newProduct.price.trim();
    const image = newProduct.image.trim();

    if (!name || !price || !image) {
      toast({
        title: "Error",
        description: "All fields are required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const priceValue = parseFloat(price);
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

    const { success, message } = await createProduct({
      name,
      price: priceValue,
      image,
    });

    toast({
      title: success ? "Success" : "Error",
      description: message,
      status: success ? "success" : "error",
      duration: 3000,
      isClosable: true,
    });

    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
      navigate("/home"); // go to homepage after creation
    }
  };

  return (
    <Container maxW="container.sm" py={12}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center">
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" w="full" onClick={handleAddProduct}>
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;

// import { Container, useColorModeValue,  } from "@chakra-ui/react";

// import { useState } from "react"

// import { VStack, Heading, Button, Box, Input } from "@chakra-ui/react";
// import { useProductStore } from "../store/product";



// const CreatePage = () => {
//     const [newProduct, setNewProduct] = useState({
//       name:"",
//       price:"",
//       image:""
//     }); 

//     const {createProduct} = useProductStore();

//     const handleAddProduct = async () => {
//       const {success,message} = await createProduct(newProduct);
//       console.log("Success:",success)
//       console.log("Message:",message)
//     }
//  return (
//     <Container maxW={"container.sm"}>
//       <VStack spacing={8}>
//         <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
//           Create New Product
//         </Heading>

//         <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
//           <VStack spacing={4}>
//             <Input
//               placeholder="Product Name"
//               name="name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             />
//             <Input
//               placeholder="Price"
//               name="price"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             />
//             <Input
//               placeholder="Image URL"
//               name="image"
//               value={newProduct.image}
//               onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//             />
//             <Button colorScheme="blue" onClick={handleAddProduct} w="full">
//               Add Product
//             </Button>
//           </VStack>
//         </Box>
//       </VStack>
//     </Container>
//   );
// };

// export default CreatePage;




// src/pages/CreatePage.jsx
// import { Container, useColorModeValue, VStack, Heading, Button, Box, Input } from "@chakra-ui/react";
// import { useState } from "react";

// const CreatePage = () => {
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     price: "",
//     image: ""
//   });

//   const handleAddProduct = () => {
//     console.log(newProduct);
//     alert("Product created! Check console for details.");
//   };

//   return (
//     <Container maxW={"container.sm"}>
//       <VStack spacing={8}>
//         <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
//           Create New Product
//         </Heading>

//         <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
//           <VStack spacing={4}>
//             <Input
//               placeholder="Product Name"
//               name="name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//             />
//             <Input
//               placeholder="Price"
//               name="price"
//               value={newProduct.price}
//               onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//             />
//             <Input
//               placeholder="Image URL"
//               name="image"
//               value={newProduct.image}
//               onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//             />
//             <Button colorScheme="blue" onClick={handleAddProduct} w="full">
//               Add Product
//             </Button>
//           </VStack>
//         </Box>
//       </VStack>
//     </Container>
//   );
// };

// export default CreatePage;


