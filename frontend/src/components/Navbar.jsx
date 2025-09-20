import { Button, Container, Flex, HStack, Text, useColorMode } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // redirect to Dashboard
  };

  return (
    <Container maxW="1140px" px={4}>
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
        >
          <Link to="/">Product Store 🛒</Link>
        </Text>

        <HStack spacing={2} alignItems="center" mt={{ base: 2, sm: 0 }}>
          {user && (
            <>
              <Button colorScheme="red" onClick={handleLogout}>
                Logout
              </Button>

              <Link to="/create">
                <Button>
                  <PlusSquareIcon fontSize={20} />
                </Button>
              </Link>
            </>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;


// import { Button, Container, Flex, HStack, Text, useColorMode,  } from '@chakra-ui/react';
// import { Link } from "react-router-dom";

// import { PlusSquareIcon } from "@chakra-ui/icons";
// import { MoonIcon, SunIcon } from "@chakra-ui/icons";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();
//   return <Container maxW={"1140px"} px={4}>
//     <Flex
//       h={16}
//       alignItems={"center"}
//       justifyContent={"space-between"}
//       flexDir={{
//         base:"column",
//         sm:"row"
//       }}
//     >
  
//  <Text
//   fontSize={{ base: "22", sm: "28" }}
//   fontWeight="bold"
//   textTransform="uppercase"
//   textAlign="center"
//   bgGradient="linear(to-r, cyan.400, blue.500)"
//   bgClip="text"
// >
//   <Link to={"/"}> Product Store 🛒 </Link> 
//   </Text>

//    <HStack spacing={2} alignItems={"center"}>
//     <Link to={"/create"}>
//      <Button>
//         <PlusSquareIcon fontSize={20} />
//      </Button>
//     </Link>
//     <Button onClick={toggleColorMode}>
//         {colorMode === "light" ? <MoonIcon /> : 
//         <SunIcon size="20" /> }
//     </Button>
//    </HStack>

//    </Flex>
// </Container>
  
// }

// export default Navbar;

// import { Button, Container, Flex, HStack, Text, useColorMode } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import { PlusSquareIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

// const Navbar = () => {
//   const { colorMode, toggleColorMode } = useColorMode();

//   return (
//     <Container maxW="1140px" px={4}>
//       <Flex
//         h={16}
//         alignItems="center"
//         justifyContent="space-between"
//         flexDir={{ base: "column", sm: "row" }}
//       >
//         <Text
//           fontSize={{ base: "22px", sm: "28px" }}
//           fontWeight="bold"
//           textTransform="uppercase"
//           textAlign="center"
//           bgGradient="linear(to-r, cyan.400, blue.500)"
//           bgClip="text"
//         >
//           <Link to="/">Product Store 🛒</Link>
//         </Text>

//         <HStack spacing={2} alignItems="center">
//           <Link to="/create">
//             <Button>
//               <PlusSquareIcon boxSize={5} />
//             </Button>
//           </Link>

//           <Button onClick={toggleColorMode}>
//             {colorMode === "light" ? <MoonIcon boxSize={5} /> : <SunIcon boxSize={5} />}
//           </Button>
//         </HStack>
//       </Flex>
//     </Container>
//   );
// };

// export default Navbar;
