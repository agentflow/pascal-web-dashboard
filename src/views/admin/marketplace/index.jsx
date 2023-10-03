/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useEffect } from "react";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../../api";

// Custom components
import Banner from "views/admin/marketplace/components/Banner";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import HistoryItem from "views/admin/marketplace/components/HistoryItem";
import Deal from "components/card/Deal";
import Card from "components/card/Card.js";

// Assets
import Nft1 from "assets/img/nfts/Nft1.png";
import Nft2 from "assets/img/nfts/Nft2.png";
import Nft3 from "assets/img/nfts/Nft3.png";
import Nft4 from "assets/img/nfts/Nft4.png";
import Nft5 from "assets/img/nfts/Nft5.png";
import Nft6 from "assets/img/nfts/Nft6.png";
import Avatar1 from "assets/img/avatars/avatar1.png";
import Avatar2 from "assets/img/avatars/avatar2.png";
import Avatar3 from "assets/img/avatars/avatar3.png";
import Avatar4 from "assets/img/avatars/avatar4.png";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

export default function Marketplace() {
  const [openDeals, setOpenDeals] = React.useState([]);
  const [closedDeals, setClosedDeals] = React.useState([]);

  useEffect (() => {
    const fetchUserAndDocuments = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");

        if (userJson) {
          const userObj = JSON.parse(userJson);
          const userId = userObj.id;
          const brokerage = userObj.brokerage;
          if(userObj.isAdmin) {
            const response = axiosInstance
            .get('/users/getDealsForBrokerage/getDealsForBrokerage', {
              params: {
                userId: userObj.id,
                brokerageName: userObj.brokerage,
              },
            }).then(response => response.data)
            .then(jsonData => {
              setOpenDeals(jsonData.dealsOpen);
              setClosedDeals(jsonData.dealsClosed);
              return jsonData;
            })
            .catch(error => {
              //window.location.href = "/";
              console.log(error);
            });
          }

          else {
              const response = axiosInstance
              .get('/users/getDealsWeb/getDealsWeb', {
                params: {
                  userId: userObj.id,
                },
              }).then(response => response.data)
              .then(jsonData => {
                console.log(jsonData);
                setOpenDeals(jsonData.dealsOpen);
                setClosedDeals(jsonData.dealsClosed);  
                return jsonData;
              })
              .catch(error => {
                //window.location.href = "/";
                console.log(error);
              });
          }
   
          
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        window.location.href = "/";
        console.error("Error fetching user or dashboard:", error);
      }
    };

    fetchUserAndDocuments();
  }, []);


  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("#54739C", "white");
  return (
    <Box pt={{ base: "180px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
          {/* <Banner />
          <Banner /> */}
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                Open Deals
              </Text>
              {/* <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Art
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Music
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Collectibles
                </Link>
                <Link color={textColorBrand} fontWeight='500' to='#sports'>
                  Sports
                </Link>
              </Flex> */}
            </Flex>
  <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' style={{ width: '70vw' }}>

    {openDeals && openDeals.length > 0 ? (
      openDeals.map((deal, index) => (
        <Deal
          name={deal.address}
          author={deal.agentOwnerName}
          image={deal.images && deal.images[0]}
          type={deal.type}
          currentbid={deal.price && deal.price}
        />
      ))
    ) : (
      <Deal name={"No Deals Open"} />
    )}
  </SimpleGrid>
            <Text
              mt='45px'
              mb='36px'
              color={textColor}
              fontSize='2xl'
              ms='24px'
              fontWeight='700'>
              Closed Deals
            </Text>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px' style={{ width: '70vw' }}>

             
            {closedDeals && closedDeals.length > 0 ? (
              closedDeals.map((deal, index) => (

                <Deal
                name={deal.address}
                author={deal.agentOwnerName}
                image={deal.images && deal.images[0]}
                type={deal.type}
                currentbid={deal.price && deal.price}
                />
              ))
            ) : (
              <Deal
                name={"No Closed Deals"}
                />
            )}
            </SimpleGrid>
          </Flex>
        </Flex>
        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
          <Card p='0px'>
            <Flex
              align={{ sm: "flex-start", lg: "center" }}
              justify='space-between'
              w='100%'
              px='22px'
              py='18px'>
              <Text color={textColor} fontSize='xl' fontWeight='600'>
                History
              </Text>
              <Button variant='action'>See all</Button>
            </Flex>

            <HistoryItem
              name='Colorful Heaven'
              author='By Mark Benjamin'
              date='30s ago'
              image={Nft5}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Abstract Colors'
              author='By Esthera Jackson'
              date='58s ago'
              image={Nft1}
              price='0.91 ETH'
            />
            <HistoryItem
              name='ETH AI Brain'
              author='By Nick Wilson'
              date='1m ago'
              image={Nft2}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Swipe Circles'
              author='By Peter Will'
              date='1m ago'
              image={Nft4}
              price='0.91 ETH'
            />
            <HistoryItem
              name='Mesh Gradients '
              author='By Will Smith'
              date='2m ago'
              image={Nft3}
              price='0.91 ETH'
            />
            <HistoryItem
              name='3D Cubes Art'
              author='By Manny Gates'
              date='3m ago'
              image={Nft6}
              price='0.91 ETH'
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
