import {
  Button,
  Flex,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import logoWhite from "assets/img/layout/logoWhite.png";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import logo1 from "assets/img/bhills.png";
import logo2 from "assets/img/foxx.png";

export default function SidebarDocs() {
  const bgColor = "linear-gradient(135deg, #868CFF 0%, #4318FF 100%)";
  const borderColor = useColorModeValue("white", "navy.800");
  const [brokerage, setBrokerage] = React.useState("");
  const getUser = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");

      if (userJson) {
        const userObj = JSON.parse(userJson);
        if(userObj.brokerage){
          setBrokerage(userObj.brokerage);
        }
		// const refreshToken = getRefreshToken().then(refreshToken => setRefreshToken(refreshToken));

      }
    } catch (error) {
      console.error("Error fetching user or documents:", error);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);
  return (
    <Flex
      justify='center'
      direction='column'
      align='center'
      borderRadius='30px'
      paddingRight='20px'
      position='relative'>
        {brokerage == "The Beverly Hills Estates" ? (
          <Image src={logo1}  />
        ) : null}
        {brokerage == "Sync Brokerage Inc - Foxx Group" ? (
          <Image src={logo2}/>
        ) : null}
      {/* <Flex
        border='5px solid'
        borderColor={borderColor}
        bg='linear-gradient(135deg, #868CFF 0%, #4318FF 100%)'
        borderRadius='50%'
        w='94px'
        h='94px'
        align='center'
        justify='center'
        mx='auto'
        position='absolute'
        left='50%'
        top='-47px'
        transform='translate(-50%, 0%)'>
        <Image src={logoWhite} w='40px' h='40px' />
      </Flex>
      <Flex
        direction='column'
        mb='12px'
        align='center'
        justify='center'
        px='15px'
        pt='55px'>
        <Text
          fontSize={{ base: "lg", xl: "18px" }}
          color='white'
          fontWeight='bold'
          lineHeight='150%'
          textAlign='center'
          px='10px'
          mt="10px"
          mb='6px'>
          Upgrade to PRO
        </Text>
        <Text
          fontSize='14px'
          color={"white"}
          fontWeight='500'
          px='10px'
          mb='6px'
          textAlign='center'>
          Improve your development process and start doing more with Horizon UI
          PRO!
        </Text>
      </Flex>
      <Link href='https://horizon-ui.com/pro?ref=horizon-chakra-free'>
        <Button
          bg='whiteAlpha.300'
          _hover={{ bg: "whiteAlpha.200" }}
          _active={{ bg: "whiteAlpha.100" }}
          mb={{ sm: "16px", xl: "24px" }}
          color={"white"}
          fontWeight='regular'
          fontSize='sm'
          minW='185px'
          mx='auto'>
          Upgrade to PRO
        </Button>
      </Link> */}
    </Flex>
  );
}
