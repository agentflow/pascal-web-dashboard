import React from "react";

// Chakra imports
import { Flex, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");

  return (
    <Flex align='center' direction='column'>
       <svg
        width='200'
        height='100'
        viewBox="0 0 733.95 194.9"
        color="#274C77"
        xmlns='http://www.w3.org/2000/svg'
      >
        <path fill="#274C77" class="cls-1" d="m128.66,59.11c-5.24-10.74-12.48-19.09-21.73-25.05-9.27-5.96-20.14-8.94-32.62-8.94-11.56,0-21.52,2.98-29.85,8.94-5.52,3.94-10.19,8.94-13.99,14.98l-1.57-20.08H0v165.94h30.83v-49.01c3.73,5.83,8.28,10.66,13.63,14.49,8.33,5.96,18.29,8.94,29.85,8.94,12.48,0,23.35-2.98,32.62-8.94,9.25-5.96,16.49-14.35,21.73-25.19,5.24-10.82,7.84-23.47,7.84-37.97s-2.6-27.39-7.84-38.11Zm-55.58,77.06c-7.15,2.03-14.03,2.27-20.67.68-6.63-1.57-12.45-5.05-17.46-10.41-4.77-5.09-7.63-10.89-8.58-17.42-.95-6.52-.05-13.14,2.7-19.88,2.75-6.71,7.29-13.02,13.58-18.91,6.15-5.76,12.68-9.8,19.57-12.12,6.89-2.29,13.6-2.73,20.09-1.27,6.51,1.45,12.15,4.7,16.91,9.8,5.15,5.5,8.31,11.57,9.52,18.23,1.2,6.68.49,13.42-2.13,20.29-2.63,6.84-7.09,13.23-13.38,19.12-6.29,5.89-13.02,9.86-20.16,11.88Z"/><path fill="#274C77" class="cls-1" d="m264.19,54.56c-4.4-9.73-11.07-17.07-19.95-22.02-8.91-4.95-20.05-7.43-33.44-7.43-10.45,0-19.49,1.57-27.1,4.68-7.63,3.12-13.89,7.34-18.86,12.65-4.95,5.33-8.98,11.01-12.1,17.07l28.07,9.92c3.29-5.7,7.42-9.92,12.38-12.67,4.95-2.75,10.63-4.13,17.07-4.13,6.96,0,12.59,1.66,16.91,4.95,4.3,3.31,7.47,8.08,9.5,14.31,1.07,3.33,1.85,7.09,2.35,11.29h-34.29c-17.24,0-30.67,3.75-40.31,11.28-9.63,7.53-14.45,18.44-14.45,32.76,0,13.38,4.55,23.76,13.63,31.09,9.08,7.34,21.86,11.01,38.39,11.01s29.03-5.37,37-16.11c.44-.59.88-1.2,1.28-1.83l.78,14.64h28.9l.84-75.41c0-14.3-2.22-26.32-6.61-36.04Zm-28.76,71.42c-2.85,5.22-6.78,9.44-11.83,12.65-5.05,3.21-10.97,4.82-17.75,4.82-7.7,0-13.72-1.51-18.02-4.53-4.32-3.04-6.48-7.2-6.48-12.54,0-6.23,2.48-11.05,7.43-14.45,4.95-3.38,13.59-5.08,25.88-5.08h25.04v2.2c0,6.06-1.41,11.7-4.26,16.93Z"/><path fill="#274C77" class="cls-1" d="m346.75,169.32c-9.18,0-17.61-1.38-25.32-4.13-7.71-2.75-14.31-6.65-19.82-11.69-5.5-5.04-9.73-10.96-12.66-17.75l26.69-11.83c2.75,5.14,6.83,9.45,12.25,12.93,5.41,3.49,11.42,5.23,18.03,5.23,7.16,0,12.89-1.24,17.2-3.72,4.31-2.48,6.47-5.92,6.47-10.32s-1.65-7.47-4.95-9.77c-3.3-2.29-7.98-4.17-14.03-5.64l-12.94-3.58c-13.03-3.3-23.21-8.57-30.55-15.82-7.34-7.25-11.01-15.55-11.01-24.91,0-13.76,4.45-24.4,13.35-31.92,8.9-7.52,21.69-11.28,38.39-11.28,8.44,0,16.19,1.24,23.25,3.71,7.06,2.48,13.16,5.96,18.3,10.46,5.13,4.5,8.71,9.77,10.73,15.82l-25.59,11.56c-1.84-4.58-5.32-8.12-10.46-10.6-5.14-2.48-10.83-3.72-17.06-3.72s-11.1,1.33-14.58,3.99c-3.49,2.66-5.23,6.38-5.23,11.15,0,2.75,1.56,5.28,4.68,7.57,3.12,2.3,7.61,4.18,13.49,5.64l16.24,3.85c8.99,2.2,16.33,5.64,22.02,10.32,5.68,4.68,9.91,9.91,12.66,15.69,2.75,5.78,4.13,11.61,4.13,17.48,0,8.26-2.34,15.51-7.02,21.74-4.68,6.24-11.05,11.05-19.13,14.45-8.08,3.39-17.25,5.09-27.52,5.09Z"/><path fill="#274C77" class="cls-1" d="m484.07,169.32c-14.13,0-26.6-3.08-37.43-9.22-10.83-6.14-19.31-14.63-25.46-25.46-6.15-10.82-9.22-23.3-9.22-37.43s3.07-26.6,9.22-37.43c6.14-10.82,14.59-19.31,25.32-25.46,10.74-6.14,23.07-9.22,37.02-9.22s25.87,3.26,36.88,9.77c11.01,6.52,19.17,15.82,24.49,27.93l-28.62,11.01c-2.94-6.06-7.43-10.91-13.48-14.59-6.05-3.67-12.94-5.5-20.64-5.5s-14.22,1.88-20.09,5.64c-5.88,3.76-10.46,8.9-13.76,15.41-3.3,6.52-4.95,13.99-4.95,22.43s1.69,15.92,5.09,22.43c3.39,6.52,8.07,11.65,14.03,15.41,5.96,3.76,12.7,5.64,20.23,5.64s14.59-1.97,20.64-5.92c6.05-3.94,10.55-9.31,13.49-16.1l28.62,11.01c-5.32,12.48-13.44,22.2-24.35,29.17-10.92,6.97-23.25,10.46-37.02,10.46Z"/><path fill="#274C77" class="cls-1" d="m670.65,54.56c-4.4-9.73-11.05-17.07-19.95-22.02-8.89-4.95-20.05-7.43-33.43-7.43-10.47,0-19.51,1.57-27.12,4.68-7.61,3.12-13.89,7.34-18.84,12.65-4.95,5.33-9,11.01-12.12,17.07l28.07,9.92c3.31-5.7,7.43-9.92,12.38-12.67,4.95-2.75,10.65-4.13,17.07-4.13,6.98,0,12.61,1.66,16.91,4.95,4.32,3.31,7.47,8.08,9.5,14.31,1.07,3.33,1.87,7.09,2.37,11.29h-34.29c-17.26,0-30.69,3.75-40.32,11.28-9.63,7.53-14.45,18.44-14.45,32.76,0,13.38,4.55,23.76,13.63,31.09,9.08,7.34,21.88,11.01,38.39,11.01s29.03-5.37,37.02-16.11c.44-.59.88-1.2,1.28-1.83l.78,14.64h28.9l.82-75.41c0-14.3-2.2-26.32-6.61-36.04Zm-28.76,71.42c-2.85,5.22-6.78,9.44-11.83,12.65-5.05,3.21-10.95,4.82-17.75,4.82-7.7,0-13.7-1.51-18.02-4.53-4.3-3.04-6.46-7.2-6.46-12.54,0-6.23,2.47-11.05,7.43-14.45,4.95-3.38,13.57-5.08,25.86-5.08h25.05v2.2c0,6.06-1.43,11.7-4.28,16.93Z"/><path fill="#274C77" class="cls-1" d="m703.13,166.02V0h30.82v166.02h-30.82Z"/>
      </svg>
      {/* <HorizonLogo h='100px' w='100px'  color={logoColor} /> */}
      <HSeparator mb='20px' />
    </Flex>
  );
}

export default SidebarBrand;
