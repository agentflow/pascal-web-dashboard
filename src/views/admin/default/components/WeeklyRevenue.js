// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Card from "components/card/Card.js";
// Custom components
import BarChart from "components/charts/BarChart";
import React from "react";
import {
  barChartDataConsumption,
  barChartOptionsConsumption,
} from "variables/charts";
import { MdBarChart } from "react-icons/md";
import { Overlay } from 'react-overlays';

export default function WeeklyRevenue(props) {
  const { ...rest } = props;
  console.log(props.name);

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const iconColor = useColorModeValue("#54739C", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );
  return (

    <Card align='center' direction='column' w='100%' {...rest}>
    <Flex align='center' w='100%' px='15px' py='10px'>
      <Text
        me='auto'
        color={textColor}
        fontSize='xl'
        fontWeight='700'
        lineHeight='100%'>
        {props.name}
      </Text>
      <Button
        align='center'
        justifyContent='center'
        bg={bgButton}
        _hover={bgHover}
        _focus={bgFocus}
        _active={bgFocus}
        w='37px'
        h='37px'
        lineHeight='100%'
        borderRadius='10px'
        {...rest}>
        <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
      </Button>
    </Flex>
  
    <Box h='240px' mt='auto' position='relative'>
      <BarChart
        chartData={barChartDataConsumption}
        chartOptions={barChartOptionsConsumption}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          borderRadius: '20px',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text color='white' fontSize='xl'>
          Coming Soon
        </Text>
      </div>
    </Box>
  </Card> 
  );
}
