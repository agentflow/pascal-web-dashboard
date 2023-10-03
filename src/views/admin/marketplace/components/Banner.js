import React from "react";

// Chakra imports
import { Button, Flex, Link, Text } from "@chakra-ui/react";

// Assets

export default function Banner() {
  return (
    <div style={{ width: '50%' }}>
      <Flex
        direction='column'
        bgColor={{ base: 'rgb(255, 255, 255)' }}
        bgSize='cover'
        py={{ base: '10px', md: '20px' }}
        px={{ base: '10px', md: '20px' }}
        borderRadius='30px'>
        <Text
          fontSize={{ base: '24px', md: '34px' }}
          color='black'
          mb='14px'
          maxW={{
            base: '50%',
            md: '64%',
            lg: '46%',
            xl: '70%',
            '2xl': '50%',
            '3xl': '42%',
          }}
          fontWeight='700'
          lineHeight={{ base: '32px', md: '42px' }}>
          View all your deals, in one place
        </Text>
        <Text
          fontSize='md'
          color='black'
          maxW={{
            base: '100%',
            md: '64%',
            lg: '40%',
            xl: '56%',
            '2xl': '46%',
            '3xl': '34%',
          }}
          fontWeight='500'
          mb='40px'
          lineHeight='28px'>
          Coming Soon..
        </Text>
      </Flex>
    </div>
  );
}
