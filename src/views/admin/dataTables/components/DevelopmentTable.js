import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosInstance } from "../../../../api";
import {
  Box,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  Divider,
  Modal, 
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai"; 
import YourLogoImage from "../../../../assets/img/auth/Eye.png";
import YourCustomIcon from "../../../../assets/img/auth/Share.png";
import AnotherCustomIcon from "../../../../assets/img/auth/X.png";


export default function SearchAndUpload(props) {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Address");
  const [filteredData, setFilteredData] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showAddressList, setShowAddressList] = useState(true);
  const [fetchedDocuments, setFetchedDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [selectedDealAddress, setSelectedDealAddress] = useState(null);
  const [selectedDealId, setSelectedDealId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); // State to control the visibility of the modal

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchIconClick = () => {
    searchForAddress();
  };

  const searchForAddress = () => {
    const filteredAddresses = data?.dealDocs?.filter(
      (deal) =>
        deal.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
        deal.clientName?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filteredAddresses);
  };

  const handleButtonClick = async (dealId, address) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get('/users/getDocumentsForDeal/getDocumentsForDeal', {
        params: {
          dealId: dealId,
        },
      });

      setFetchedDocuments(response.data);
      setLoading(false);
      setSelectedDealAddress(address);
      setSelectedAddress(address); 
      setSelectedDealId(dealId);

      console.log('Documents fetched successfully:', response.data);

    } catch (error) {
      setLoading(false);
      console.error('Error fetching documents for deal:', error);
    }
  };

  const handleSectionClick = (sectionTitle) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
  };

  const handleFileClick = async (document) => {
    try {
      console.log('DOC', document);
      const fileKey = document.file;

      if (fileKey) {
        console.log('File key:', fileKey);

        const response = await axiosInstance.get('/deals/getDealFile/getDealFile', {
          params: {
            key: fileKey,
          },
        });


        console.log('File fetched successfully:', response.data);

        const newWindow = window.open();
        newWindow.document.write(response.data);

      } else {
        console.error('File key is null');
      }
    } catch (error) {
      console.error('Error fetching file:', error);
    }
  };

  const handleDownloadClick = (document) => {
    console.log("Download clicked for:", document.name);
  };

  const handleAnotherButtonClick = (document) => {
    console.log("Another button clicked for:", document.name);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  useEffect(() => {
    const fetchUserAndDocuments = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");

        if (userJson) {
          const userObj = JSON.parse(userJson);
          const userId = userObj.id;
          setUserId(userId);
          const response = await axiosInstance.get("/users/getDocuments/getDocuments", {
            params: {
              userId: userId,
            },
          });
          setData(response.data);
        }
      } catch (error) {
        console.error("Error fetching user or documents:", error);
      }
    };

    fetchUserAndDocuments();
  }, []);


  const handleFileUpload = async (file, dealId, dealStep, name) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('dealId', dealId);
      formData.append('dealStep', dealStep);
      formData.append('name', name);

      const response = await axiosInstance.post('/deals/uploadDealFile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('File uploaded successfully:', response.data);

    

    } catch (error) {
      console.error('Error uploading file:', error.response); 
      console.error('Error message:', error.message); 

     
    }
  };

  return (
    <Box>
      <Box mt="30px" />
      <FormControl>
        <InputGroup>
          <Input
            placeholder={`Search ${selectedOption}`}
            value={searchInput}
            onChange={handleSearchInputChange}
            size="sm"
            height="40px"
            px="1"
            width="600px"
          />
          <InputRightElement
            pointerEvents="auto"
            onClick={handleSearchIconClick}
            cursor="pointer"
            p="2px"
            left="550px" 
            zIndex="1" 
          >
            <AiOutlineSearch size="20px"/>
          </InputRightElement>
        </InputGroup>
        <Box mt="30px" />
        <Flex alignItems="stretch">
          <Box p="10px" flex="1">
            {/* Render filtered data */}
            {filteredData.map((deal, index) => (
              <Flex key={index} align="center" justify="space-between" mb="20px">
                <Box>
                  <Text
                    fontSize="lg"
                    fontWeight={selectedDealAddress === deal.address ? "bold" : "normal"}
                    flexBasis="60%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                  >
                    {deal.address}
                  </Text>
                  <Text>Type: {deal.type}</Text>
                  <Text>Client Name: {deal.clientName}</Text>
                </Box>
                <Button onClick={() => handleButtonClick(deal.dealId, deal.address)} disabled={loading}>
                  {loading ? 'Loading...' : `${deal.length} Files`}
                </Button>
              </Flex>
            ))}
          </Box>
          <Divider orientation="vertical" mx="150px" borderColor="black" />
          <Box p="10px" flex="1">
            {/* Display selected address */}
            {selectedAddress && (
              <Flex align="center" justify="space-between" >
                <Text fontSize="lg" fontWeight="bold" mb="10px" whiteSpace="nowrap" maxWidth="100%">
                  {selectedAddress}
                </Text>
                <Box marginLeft="60px" marginTop="-15px">
                  <Button onClick={openAddModal}>
                    <Box marginLeft="-41px">
                      <AiFillPlusCircle size="41px" color="#3182CE" />
                    </Box>
                  </Button>
                </Box>
              </Flex>
            )}
    
            {/* Render fetched documents */}
            {fetchedDocuments.map((step, index) => (
              <Box key={index} mt="20px" marginbottom="100px">
                <Button onClick={() => handleSectionClick(step.title)}>{step.title}</Button>
                {expandedSection === step.title && (
                  <Box ml="20px">
                    {step.content.map((document, docIndex) => (
                      <Box key={docIndex}>
                        <Flex align="center" justify="space-between">
                          <Text fontSize="md" whiteSpace="nowrap" maxWidth="70%">
                            {document.name}
                          </Text>
                          <Flex align="center" ml="20px">
                            <Button onClick={() => handleFileClick(document)}>
                              <img src={YourLogoImage} alt="Logo" width="26" height="21" />
                            </Button>
                            <Button onClick={() => handleDownloadClick(document)} ml="8px">
                              <img src={YourCustomIcon} alt="Icon" width="24" height="21" />
                            </Button>
                            <Button onClick={() => handleAnotherButtonClick(document)} ml="8px">
                              <img src={AnotherCustomIcon} alt="Another Icon" width="20" height="15" />
                            </Button>
                          </Flex>
                        </Flex>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Flex>
      </FormControl>

      {/* Sliding*/}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} size="lg">
  <ModalOverlay />
  <ModalContent>
    <ModalBody
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      width="50%" 
      position="fixed"
      right="0"
      height="100%" 
      backgroundColor="white"
      boxShadow="-2px 0 10px rgba(0, 0, 0, 0.1)" 
      padding="20px"
    >
      <ModalCloseButton />
      <Box>
        <ModalHeader>Add Document To Deal</ModalHeader>
        <input
          type="file"
          accept=".pdf, .doc, .docx, .png, .jpg, .jpeg" 
          onChange={(event) => {
            const selectedFile = event.target.files[0];
            if (selectedFile) {
              handleFileUpload(selectedFile, selectedDealId, expandedSection, "New File Name");
            }
          }}
        />
      </Box>
      <Button onClick={closeAddModal} alignSelf="flex-end">
        Close
      </Button>
    </ModalBody>
  </ModalContent>
</Modal>

    </Box>
  );
}
