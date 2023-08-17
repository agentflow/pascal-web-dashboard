import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import DefaultAuth from "layouts/auth/Default";
import illustration from "assets/img/auth/Back.jpg";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";
import { setAuthTokens } from "axios-jwt";




function SignIn() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory(); 

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.post(
        "https://agentflow-v1.herokuapp.com/v1/auth/login",
        {
          email: email,
          password: password,
        }
      )

      console.log(response.data);


      setAuthTokens({
        accessToken: response.data.tokens.access.token,
        refreshToken: response.data.tokens.refresh.token
      })

      //Save the user object to async storage 
      await AsyncStorage.setItem("user", JSON.stringify(response.data.user));
      


      

      // Handle the response here

      console.log("Login successful:", response.data);
      history.push("/admin/default");
      console.log("Redirecting to dashboard route");
    } catch (error) {
      // Handle login error here

      console.error("Login error:", error);
    }
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "10vh" }}
        flexDirection="column"
      >
        
        
        <Box me="auto">
          <Heading fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text mb="36px" ms="4px" fontWeight="400" fontSize="md">
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              mb="8px"
            >
              Email<Text color="brand.500">*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@simmmple.com"
              mb="24px"
              fontWeight="500"
              size="lg"
              value={email}
              onChange={handleEmailChange}
            />
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              display="flex"
            >
              Password<Text color="brand.500">*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="24px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                value={password}
                onChange={handlePasswordChange}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color="gray.400"
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brand"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text color="brand.500" fontSize="sm" w="124px" fontWeight="500">
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              onClick={handleSignIn}
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            <Text fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/sign-up">
                <Text as="span" ms="5px" fontWeight="500">
                  Create an Account
                </Text>
              </NavLink>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
