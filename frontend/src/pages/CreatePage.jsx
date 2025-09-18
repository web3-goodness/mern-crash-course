import { Container, useColorModeValue, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { VStack, Heading, Button, Box, Input } from "@chakra-ui/react";
import { useProductStore } from "../store/product";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  });
  const toast = useToast();


  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    try {
      const { success, message } = await createProduct(newProduct);
      if (!success) {
        toast({
          title: "Error",
          description: message,
          status: "error",
          isClosable: true
        });
      } else {
        toast({
          title: "Success",
          description: message,
          status: "success",
          isClosable: true
        });
        setNewProduct({ name: "", price: "", image: "" });
      }
          
      

    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
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


