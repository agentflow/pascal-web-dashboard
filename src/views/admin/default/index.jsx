/*!
██████   █████  ███████  ██████  █████  ██      
██   ██ ██   ██ ██      ██      ██   ██ ██      
██████  ███████ ███████ ██      ███████ ██      
██      ██   ██      ██ ██      ██   ██ ██      
██      ██   ██ ███████  ██████ ██   ██ ███████                                                                                                                                                                                                                                                                                                                                    
*/

// Chakra imports
import {
  Avatar,
  Box,
  Button,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../../api";

// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdHouse,
  MdFactCheck,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { AiFillFolderOpen } from "react-icons/ai";
import TableTopCreators from "views/admin/marketplace/components/TableTopCreators";
import tableDataTopCreators from "views/admin/marketplace/variables/tableDataTopCreators.json";
import { tableColumnsTopCreators } from "views/admin/marketplace/variables/tableColumnsTopCreators";

import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import Card from "components/card/Card";
import { build } from "pdfjs-dist";

export default function UserReports() {
  const [listings, setListings] = React.useState("");
  const [grossCommissions, setGrossCommissions] = React.useState("");
  const [grossTotal, setGrossTotal] = React.useState("");
  const [dealsThisMonth, setDealsThisMonth] = React.useState("");
  const [dealsThisMonthPercentage, setDealsThisMonthPercentage] =
    React.useState("");
  const [deals, setDeals] = React.useState("");
  const [clients, setClients] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [agentView, setAgentView] = React.useState(false);
  const [brokerageView, setBrokerageView] = React.useState(false);
  const [dealsOpenBrokerage, setDealsOpenBrokerage] = React.useState([]);
  const [dealsClosedBrokerage, setDealsClosedBrokerage] = React.useState([]);
  const [liveFeed, setLiveFeed] = React.useState([]);
  const [brokerageListings, setBrokerageListings] = React.useState([]);
  const [numEscrowsBrokerage, setNumEscrowsBrokerage] = React.useState(0);
  const [numListingsBrokerage, setNumListingsBrokerage] = React.useState(0);
  const [numBuyerBrokerage, setNumBuyerBrokerage] = React.useState(0);
  const [escrowPercentBrokerage, setEscrowPercentBrokerage] = React.useState(0);
  const [dealsOpenBrokerLength, setDealsOpenBrokerLength] = React.useState(0);
  const [commissionsInPipeline, setCommissionsInPipeline] = React.useState(0);
  const [grossCommissionsBroker, setGrossCommissionsBroker] = React.useState(0);
  const [inEscrowPie, setInEscrowPie] = React.useState(0);
  const [closedPie, setClosedPie] = React.useState(0);
  const [preescrowPie, setPreescrowPie] = React.useState(0);
  const textColor = useColorModeValue("navy.700", "white");

  async function processDeals(deals) {
    let buildColumns = [];
    let sellerTotalSteps = 15;
    let buyerTotalSteps = 10;
    // Define a function that processes each item asynchronously
    async function processItem(i) {
      let item = {};
      if (item.type == "seller") {
        item.progress = Math.floor(
          (deals[i].statusSteps / sellerTotalSteps) * 100
        );
      } else {
        item.progress = Math.floor(
          (deals[i].statusSteps / buyerTotalSteps) * 100
        );
      }
      item.address = deals[i].address;
      item.status = deals[i].journeyCategory;
      item.agent = deals[i].agentOwnerName;
      buildColumns.push(item);
    }

    // Use a for...of loop to iterate through the array asynchronously
    for (let i = 0; i < deals.length; i++) {
      await processItem(i);
    }

    // After the loop is finished, set the state
    setDealsOpenBrokerage(buildColumns);
  }

  async function processLiveFeed(notifications) {
    let buildColumns = [];

    // Define a function that processes each item asynchronously
    async function processItem(i) {
      let item = {};
      let miniArr = [];
      miniArr[0] = notifications[i].copy;
      miniArr[1] = notifications[i].avatar;
      item.name = miniArr;
      item.address = notifications[i].address;
      buildColumns.push(item);
    }
    if (notifications) {
      for (let i = 0; i < notifications.length; i++) {
        await processItem(i);
      }
    }
    // Use a for...of loop to iterate through the array asynchronously

    // After the loop is finished, set the state
    setLiveFeed(buildColumns);
  }

  useEffect(() => {
    const fetchUserAndDocuments = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");

        if (userJson) {
          const userObj = JSON.parse(userJson);
          const userId = userObj.id;
          if (userObj.isAdmin) {
            setIsAdmin(true);
            setBrokerageView(true);
            setAgentView(false);
          } else {
            setAgentView(true);
          }
          const response = axiosInstance
            .get("/users/buildDashboard/buildDashboard", {
              params: {
                userId: userObj.id,
                isAgent: userObj.isAgent,
                timezoneOffset: new Date().getTimezoneOffset(),
              },
            })
            .then((response) => response.data)
            .then((jsonData) => {
              setListings(jsonData.dealStats.listings);
              setDeals(jsonData.dealStats.total);
              setClients(jsonData.user.clients.length);
              setGrossTotal(
                "$" + jsonData.dealStats.grossTotal.toLocaleString()
              );
              setGrossCommissions(
                "$" + jsonData.dealStats.grossCommissions.toLocaleString()
              );
              setDealsThisMonth(jsonData.dealStats.dealsThisMonth);
              setDealsThisMonthPercentage(
                jsonData.dealStats.escrowPercentage + "%"
              );
              if (userObj.isAdmin) {
                processDeals(jsonData.adminView.dealsOpenBrokerage);
                processLiveFeed(jsonData.adminView.brokerNotify);
                setDealsOpenBrokerLength(
                  jsonData.adminView.dealsOpenBrokerage.length
                );
                setDealsClosedBrokerage(
                  jsonData.adminView.dealsClosedBrokerage
                );
                setBrokerageListings(jsonData.adminView.numListings.length);
                setNumBuyerBrokerage(jsonData.adminView.numBuyDeals.length);
                setNumEscrowsBrokerage(
                  jsonData.adminView.numEscrowsOpen.length
                );
                setEscrowPercentBrokerage(
                  jsonData.adminView.escrowPercentage + "%"
                );
                setCommissionsInPipeline(
                  "$" +
                    jsonData.adminView.commissionsInPipeline.toLocaleString()
                );
                setInEscrowPie(jsonData.adminView.inEscrowPie);
                setClosedPie(jsonData.adminView.closedPie);
                setPreescrowPie(jsonData.adminView.preEscrowPie);
                setGrossCommissionsBroker(
                  "$" + jsonData.adminView.grossCommissions.toLocaleString()
                );
              }

              return jsonData;
            })
            .catch((error) => {
              window.location.href = "/";
              console.log(error);
            });
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

  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");

  const brandColor = useColorModeValue("#274C77", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isAdmin ? (
        <Flex
          mb="20px"
          pl="20px"
          align="center"
          backgroundColor="white"
          borderRadius="20px"
        >
          <header
            style={{
              textAlign: "left",
              marginBottom: "20px",
              justifyContent: "center",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#274C77",
                marginTop: "10px",
              }}
            >
              My Insights
            </h1>
          </header>
          <Flex pl={"20px"}>
            <Button
              ml="10px" // Add some margin to separate the buttons
              bg={boxBg}
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              borderRadius="7px"
              onClick={() => {
                setAgentView(false);
                setBrokerageView(true);
              }}
            >
              Your Team / Brokerage View
            </Button>
            <Button
              bg={boxBg}
              ml="10px" // Add some margin to separate the buttons
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              borderRadius="7px"
              onClick={() => {
                setAgentView(true);
                setBrokerageView(false);
              }}
            >
              Your Agent View
            </Button>
          </Flex>
        </Flex>
      ) : null}

      {agentView ? (
        <div>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={'#01B574'}
                    />
                  }
                />
              }
              name="Commissions in the Pipeline"
              value={grossCommissions}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Deals"
              value={deals}
            />

            
            <MiniStatistics
              growth={dealsThisMonthPercentage}
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Deals this Month"
              value={dealsThisMonth}
            />
                      <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="Gross Commissions"
              value={grossTotal}
            />
            <MiniStatistics
              endContent={<Flex me="-16px" mt="10px"></Flex>}
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={MdHouse} color={brandColor} />
                  }
                />
              }
              name="Listings"
              value={listings}
            />
  
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdOutlinePersonSearch}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Clients"
              value={clients}
            />
          </SimpleGrid>
          {/* <TableTopCreators
            tableData={tableDataTopCreators}
            columnsData={tableColumnsTopCreators}
          /> */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            {/* <TotalSpent mainCommission={123} /> */}
            <WeeklyRevenue name={"Client Growth"} />
            <WeeklyRevenue name={"Deal Growth"} />
          </SimpleGrid>
        </div>
      ) : (
        <div>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap="20px"
            mb="20px"
          >
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdAttachMoney}
                      color={'#01B574'}
                    />
                  }
                />
              }
              name="Commissions in the Pipeline"
              value={commissionsInPipeline}
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdBarChart}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Total Open Deals"
              value={dealsOpenBrokerLength}
            />

            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFactCheck}
                      color={brandColor}
                    />
                  }
                />
              }
              growth={escrowPercentBrokerage}
              name="Open Escrows"
              value={numEscrowsBrokerage}
            />
            <MiniStatistics
                        startContent={
                          <IconBox
                            w="56px"
                            h="56px"
                            bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                            icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                          />
                        }
              name="Closed Commissions"
              value={grossCommissionsBroker}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon w="32px" h="32px" as={MdHouse} color={brandColor} />
                  }
                />
              }
              // endContent={<Flex me="-16px" mt="10px"></Flex>}
              name="Active Listings"
              value={brokerageListings}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdOutlinePersonSearch}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Buyer Deals"
              value={numBuyerBrokerage}
            />
            {/* <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
                  icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
                />
              }
              name="Gross Commissions"
              value={grossTotal}
            />
            <MiniStatistics
              startContent={
                <IconBox
                  w="56px"
                  h="56px"
                  bg={boxBg}
                  icon={
                    <Icon
                      w="32px"
                      h="32px"
                      as={MdFileCopy}
                      color={brandColor}
                    />
                  }
                />
              }
              name="Clients"
              value={clients}
            /> */}
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={dealsOpenBrokerage}
            />
            <TableTopCreators
              tableData={liveFeed}
              columnsData={tableColumnsTopCreators}
            />
          </SimpleGrid>
          {/* <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
            <TotalSpent mainCommission={123} /> 
            <WeeklyRevenue name={"Client Growth"} />
            <WeeklyRevenue name={"Deal Growth"} />
          </SimpleGrid> */}
          <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            {/* <CheckTable
              columnsData={columnsDataCheck}
              tableData={tableDataCheck}
            />
            <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px"> */}
            {/* <DailyTraffic /> */}
            <PieCard data={[inEscrowPie, closedPie, preescrowPie]} />
            {/* </SimpleGrid> */}
          </SimpleGrid>
          {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
            <ComplexTable
              columnsData={columnsDataComplex}
              tableData={tableDataComplex}
            />
            <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
              <Tasks />
              <MiniCalendar h="100%" minW="100%" selectRange={false} />
            </SimpleGrid>
          </SimpleGrid>  */}
        </div>
      )}
    </Box>
  );
}
