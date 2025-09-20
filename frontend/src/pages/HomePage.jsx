// frontend/src/pages/HomePage.jsx
import {
  Container,
  VStack,
  SimpleGrid,
  Box,
  Button,
  Heading,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { products, fetchProducts } = useProductStore();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Load products on mount
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    };
    load();
  }, []);

  // Callback to update product in local state after edit
  const handleProductUpdate = (updatedProduct) => {
    useProductStore.setState({
      products: products.map((p) =>
        p._id === updatedProduct._id ? updatedProduct : p
      ),
    });
  };

  // Callback to remove product from local state after delete
  const handleProductDelete = (deletedProductId) => {
    useProductStore.setState({
      products: products.filter((p) => p._id !== deletedProductId),
    });
  };

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Heading
          fontSize="3xl"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products 🚀
        </Heading>

        {loading ? (
          <Spinner size="xl" color="blue.500" />
        ) : products && products.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w="full">
            {products.map((product) => (
              <Box
                key={product._id}
                p={4}
                shadow="md"
                borderWidth="1px"
                rounded="md"
              >
                <ProductCard
                  product={product}
                  onProductUpdate={handleProductUpdate}
                  onProductDelete={handleProductDelete}
                />
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Box textAlign="center" fontWeight="bold" color="gray.500">
            No products found 😢
            {user && (
              <Button
                colorScheme="blue"
                mt={4}
                onClick={() => navigate("/create")}
              >
                Create a product
              </Button>
            )}
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;

// import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react';
// import { useEffect } from 'react';
// import { Link } from "react-router-dom";
// import { useProductStore } from '../store/product';
// import ProductCard from '../components/ProductCard';

// const HomePage = () => {
//     const {fetchProducts, products } = useProductStore();
//     useEffect(() => {
//       fetchProducts();
//     }, [fetchProducts]);
//      console.log("products", products);


//     return ( <Container maxW="container.xl" py={12}>
//     <VStack spacing={8}>
//       <Text
//         fontSize={"30"}
//         fonweight={"bold"}
//         bgGradient={"linear(to-r, cyan.400, blue.500)"}
//         bgClip={"text"}
//         textAlign={"center"}
//       >
//         Current Products 🚀
//       </Text>

//        <SimpleGrid
//         columns={{ base: 1, md: 2, lg: 3 }}
//         spacing={10}
//         w="full"
//        >
//           {products.map((product) => (
//             <ProductCard key={product._id} product={product} />
//           ))}
//        </SimpleGrid>
   
//       {products.length === 0 && (<Text fontSize="xl" textAlign={"center"} fonweight={"bold"} color={"gray.500"}>
//         No products found 😢{""}
//         <Link to={"/create"}>
//           <Text as={"span"} color="blue.400" _hover={{ textDecoration: "underline" }}>
//             Create a product
//           </Text>
//         </Link>
//       </Text>
//       )}
//     </VStack>
//   </Container>
//   )
// }

// export default HomePage;



