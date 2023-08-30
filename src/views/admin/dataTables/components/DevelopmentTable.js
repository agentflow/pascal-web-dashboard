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
  Icon,
} from "@chakra-ui/react";
import { AiOutlineSearch, AiFillPlusCircle } from "react-icons/ai";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { BsXLg } from "react-icons/bs";

export default function SearchAndUpload(props) {
  const [selectedCategory, setSelectedCategory] = useState("");
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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedType, setSelectedType] = useState("");
  const [filePreview, setFilePreview] = useState(null);
  const history = useHistory();
  const [dealStep, setDealStep] = useState(null);

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

  const handleButtonClick = async (dealId, address, type) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        "/users/getDocumentsForDeal/getDocumentsForDeal",
        {
          params: {
            dealId: dealId,
          },
        }
      );
      setFetchedDocuments(response.data);
      setLoading(false);
      setSelectedDealAddress(address);
      setSelectedAddress(address);
      type == "buyer" ? setSelectedType("buyer") : setSelectedType("seller");
      setSelectedDealId(dealId);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching documents for deal:", error);
      history.push("/auth/login");
    }
  };

  const handleSectionClick = (sectionTitle) => {
    setExpandedSection(expandedSection === sectionTitle ? null : sectionTitle);
    setDealStep(sectionTitle);
  };
  const [showPDF, setShowPDF] = useState(false);
  const [filePDF, setFilePDF] = useState(null);

  const handleFileClick = async (document) => {
    try {
      const fileKey = document.file;

      if (fileKey) {
        console.log("File key:", fileKey);

        const response = await axiosInstance.get(
          "/deals/getDealFile/getDealFile",
          {
            params: {
              key: fileKey,
            },
          }
        );

        console.log("File fetched successfully:", response.data);
        setShowPDF(true);
        console.log("showPDF", showPDF);
        // let buildFileName =
        //   "https://docs.google.com/gview?url=" +
        //   response.data +
        //   "&embedded=true";
        // setFilePDF(buildFileName);
        setFilePDF(response.data);

        //const newWindow = window.open();
        //newWindow.document.write(response.data);
      } else {
        console.error("File key is null");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
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
    setUploadedFileName("");
    setSelectedFile(null);
  };

  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFilePreview(e.target.result);
        setSelectedFile(selectedFile);
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const sellerCategories = [
    { title: "Listing Agreement Signed", value: "listingAgreementSigned" },
    { title: "Offer(s) Sent", value: "offersSent" },
    { title: "Offer Accepted", value: "offerAccepted" },
    { title: "Open Escrow", value: "openEscrow" },
    { title: "Earnest Deposit Sent", value: "earnestDepositSent" },
    { title: "Physical Contingencies", value: "physicalContingencies" },
    { title: "Loan Contingencies", value: "loanContingencies" },
    { title: "Appraisal Contingencies", value: "appraisalContingencies" },
    { title: "Final Walkthrough", value: "finalWalkthrough" },
    { title: "Recording of Title", value: "recordingOfTitle" },
    { title: "Utilities & Contacts", value: "utilitiesAndContacts" },
    { title: "Close of Escrow", value: "closeOfEscrow" },
    { title: "Listing Agreement Signed", value: "listingAgreementSigned" },
    { title: "Property Prepping", value: "propertyPrepping" },
    { title: "Photography", value: "photography" },
    { title: "Live On the MLS", value: "liveOnMls" },
  ];

  const buyerCategories = [
    { title: "Offer(s) Sent", value: "offersSent" },
    { title: "Offer Accepted", value: "offerAccepted" },
    { title: "Open Escrow", value: "openEscrow" },
    { title: "Earnest Deposit Sent", value: "earnestDepositSent" },
    { title: "Physical Contingencies", value: "physicalContingencies" },
    { title: "Loan Contingencies", value: "loanContingencies" },
    { title: "Appraisal Contingencies", value: "appraisalContingencies" },
    { title: "Final Walkthrough", value: "finalWalkthrough" },
    { title: "Recording of Title", value: "recordingOfTitle" },
    { title: "Utilities & Contacts", value: "utilitiesAndContacts" },
    { title: "Close of Escrow", value: "closeOfEscrow" },
  ];

  const categories =
    selectedType === "buyer" ? buyerCategories : sellerCategories;

  const handleUploadClick = async () => {
    if (selectedFile && selectedCategory) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("dealId", selectedDealId);
      formData.append("dealStep", selectedCategory);
      formData.append("name", uploadedFileName);

      try {
        const response = await axiosInstance.post(
          "/deals/uploadDealFile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully:", response.data);

        const updatedFetchedDocuments = fetchedDocuments.map((step) => {
          if (step.title === selectedCategory) {
            return {
              ...step,
              content: [...step.content, response.data],
            };
          }
          return step;
        });

        setFetchedDocuments(updatedFetchedDocuments);
        setUploadedFileName("");
        setSelectedFile(null);
        setIsAddModalOpen(false);
        fetchUserAndDocuments();
      } catch (error) {
        console.error("Error uploading file:", error.response);
        console.error("Error message:", error.message);
      }
    }
  };
  const fetchUserAndDocuments = async () => {
    try {
      const userJson = await AsyncStorage.getItem("user");

      if (userJson) {
        const userObj = JSON.parse(userJson);
        const userId = userObj.id;
        setUserId(userId);
        const response = await axiosInstance.get(
          "/users/getDocuments/getDocuments",
          {
            params: {
              userId: userId,
            },
          }
        );
        setData(response.data);
        let dat = response.data;
        const filteredAddresses = dat?.dealDocs?.filter(
          (deal) =>
            deal.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
            deal.clientName?.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredData(filteredAddresses);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      window.location.href = "/";
      console.error("Error fetching user or documents:", error);
    }
  };

  useEffect(() => {
    const fetchUserAndDocuments = async () => {
      try {
        const userJson = await AsyncStorage.getItem("user");

        if (userJson) {
          const userObj = JSON.parse(userJson);
          const userId = userObj.id;
          setUserId(userId);
          const response = await axiosInstance.get(
            "/users/getDocuments/getDocuments",
            {
              params: {
                userId: userId,
              },
            }
          );
          setData(response.data);
          let dat = response.data;
          const filteredAddresses = dat?.dealDocs?.filter(
            (deal) =>
              deal.address?.toLowerCase().includes(searchInput.toLowerCase()) ||
              deal.clientName?.toLowerCase().includes(searchInput.toLowerCase())
          );
          setFilteredData(filteredAddresses);
        } else {
          window.location.href = "/";
        }
      } catch (error) {
        window.location.href = "/";
        console.error("Error fetching user or documents:", error);
      }
    };

    fetchUserAndDocuments();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchForAddress();
    }
  };

  const handleDeleteClick = async (item) => {
    let dealStepName = "";
    if (dealStep == "Offer(s) Received") {
      dealStepName = "offersReceived";
    }
    if (dealStep == "Property Prepping") {
      dealStepName = "propertyPrepping";
    }
    if (dealStep == "Photography") {
      dealStepName = "photography";
    }
    if (dealStep == "Live On the MLS") {
      dealStepName = "liveOnMls";
    }
    if (dealStep == "Listing Agreement Signed") {
      dealStepName = "listingAgreementSigned";
    }

    if (dealStep == "Loan Contingencies") {
      dealStepName = "loanContingencies";
    }
    if (dealStep == "Appraisal Contingencies") {
      dealStepName = "appraisalContingencies";
    }
    if (dealStep == "Physical Contingencies") {
      dealStepName = "physicalContingencies";
    }
    if (dealStep == "Earnest Deposit Sent") {
      dealStepName = "earnestDepositSent";
    }
    if (dealStep == "Open Escrow") {
      dealStepName = "openEscrow";
    }
    if (dealStep == "Offer(s) Sent") {
      dealStepName = "offersSent";
    }
    if (dealStep == "Offer Accepted") {
      dealStepName = "offerAccepted";
    }
    if (dealStep == "Final Walkthrough") {
      dealStepName = "finalWalkthrough";
    }
    if (dealStep == "Recording of Title") {
      dealStepName = "recordingOfTitle";
    }
    if (dealStep == "Utilities & Contacts") {
      dealStepName = "utilitiesAndContacts";
    }
    if (dealStep == "Close of Escrow") {
      dealStepName = "closeOfEscrow";
    }

    try {
      const response = await axiosInstance.post("/deals/deleteDealFile", {
        key: item.file,
        dealId: selectedDealId,
        dealStep: dealStepName,
      });

      if (response.data) {
        console.log("File Deleted Successfully");
        const updatedFetchedDocuments = fetchedDocuments.map((step) => {
          if (step.title === selectedCategory) {
            return {
              ...step,
              content: step.content.filter((file) => file.file !== item.file),
            };
          }
          return step;
        });
        console.log("updatedFetchedDocuments", updatedFetchedDocuments);

        // Update the fetchedDocuments state with the updated array
        setFetchedDocuments(updatedFetchedDocuments);
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <Box>
      <FormControl>
        <InputGroup width="450px">
          <Input
            placeholder={`Search ${selectedOption}`}
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            size="sm"
            height="40px"
            px="1"
            borderRadius="9px"
            backdropBlur={20}
            backgroundColor={"#fff"}
          />
          <InputRightElement
            onClick={handleSearchIconClick}
            cursor="pointer"
            p="8px"
          >
            <AiOutlineSearch size="20px" />
          </InputRightElement>
        </InputGroup>
        <Box mt="30px" />
        <Flex alignItems="stretch">
          <Box p="10px" flex="1" width="50%">
            {filteredData ? (
              filteredData.map((deal, index) => (
                <Flex
                  key={deal.id}
                  align="center"
                  justify="space-between"
                  alignContent={"center"}
                  mb="20px"
                  w={"100%"}
                  // backgroundColor="white"
                  onClick={() =>
                    handleButtonClick(deal.dealId, deal.address, deal.type)
                  }
                  style={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    padding: "10px",
                  }}
                >
                  <Flex
                    key={deal.id}
                    align="center"
                    justify="space-between"
                    alignContent={"center"}
                    mb="20px"
                    w={"75%"}
                    // backgroundColor="white"

                    onClick={() =>
                      handleButtonClick(deal.dealId, deal.address, deal.type)
                    }
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    <Box flex="1">
                      <Text
                        fontSize="lg"
                        fontWeight={
                          selectedDealAddress === deal.address
                            ? "bold"
                            : "normal"
                        }
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {deal.address.split(",")[0] +
                          ", " +
                          deal.address.split(",")[1]}
                      </Text>
                      <Text style={{ textTransform: "capitalize" }}>
                        {deal.type} deal
                      </Text>
                      <Text>Client Name: {deal.clientName}</Text>
                    </Box>
                  </Flex>
                  <Flex
                    key={deal.id}
                    align="center"
                    justify="space-between"
                    alignContent={"center"}
                    mb="20px"
                    h={"100%"}
                    // backgroundColor="white"

                    onClick={() =>
                      handleButtonClick(deal.dealId, deal.address, deal.type)
                    }
                    style={{
                      cursor: "pointer",
                      borderRadius: "8px",
                      padding: "10px",
                    }}
                  >
                    <Text
                      style={{
                        flex: "none",
                        width: "200px",
                        textAlign: "right",
                      }}
                    >
                      {loading ? "Loading..." : `${deal.length} Files`}
                    </Text>
                  </Flex>
                </Flex>
              ))
            ) : (
              <p>Loading data...</p>
            )}
          </Box>

          <Divider orientation="vertical" mx="150px" borderColor="black" />
          <Box p="10px" flex="1">
            {/* Display selected address */}
            {selectedAddress && (
              <Flex align="center" justify="space-between">
                <Text
                  fontSize="lg"
                  fontWeight="bold"
                  mb="10px"
                  whiteSpace="nowrap"
                  maxWidth="100%"
                >
                  {selectedAddress.split(",")[0] +
                    ", " +
                    selectedAddress.split(",")[1]}
                </Text>
                <Box
                  marginLeft="20px"
                  marginTop="-15px"
                  onClick={openAddModal}
                  style={{ cursor: "pointer" }}
                >
                  <AiFillPlusCircle size="40px" color="#3182CE" />
                </Box>
              </Flex>
            )}

            {/* Render fetched documents */}
            {fetchedDocuments.map((step, index) => (
              <Box key={step.name} mt="20px" marginbottom="100px">
                <Button onClick={() => handleSectionClick(step.title)}>
                  {step.title}
                </Button>
                {expandedSection === step.title && (
                  <Box ml="20px">
                    {step.content.map((document, docIndex) => (
                      <Box key={document.name}>
                        <Flex align="center" justify="space-between">
                          <Text
                            fontSize="md"
                            whiteSpace="nowrap"
                            maxWidth="70%"
                          >
                            {document.name}
                          </Text>
                          <Flex align="center" ml="20px">
                            <Button onClick={() => handleFileClick(document)}>
                              <Icon as={AiOutlineCloudDownload} />
                              {/* <img
                                src={AiOutlineCloudDownload}
                                alt="Logo"
                                width="26"
                                height="21"
                              /> */}
                            </Button>
                            {/* <Button
                              onClick={() => handleDownloadClick(document)}
                              ml="8px"
                            >
                              <img
                                src={YourCustomIcon}
                                alt="Icon"
                                width="24"
                                height="21"
                              />
                            </Button> */}
                            <Button
                              onClick={() => handleDeleteClick(document)}
                              ml="8px"
                            >
                              <Icon as={BsXLg} />
                              {/* <img
                                src={AnotherCustomIcon}
                                alt="Delete Icon"
                                width="20"
                                height="15"
                              /> */}
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
          {showPDF && (
            // <iframe src={filePDF}/>
            <iframe src={filePDF} frameborder="0" target="_blank"></iframe>
          )}
        </Flex>
      </FormControl>

      {/* Sliding */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            width="100%"
            right="0"
            height="100%"
            backgroundColor="white"
            boxShadow="-2px 0 10px rgba(0, 0, 0, 0.1)"
            padding="20px"
          >
            <ModalCloseButton />
            <Box>
              <ModalHeader
                padding="20px"
                color="274C77"
                style={{ color: "Navy Blue", fontWeight: "bold" }}
              >
                Add Document To Deal
              </ModalHeader>
              <Box paddingLeft="20px" paddingTop="50px">
                <text style={{ color: "black", fontWeight: "bold" }}>
                  What step does this belong to :{" "}
                </text>
                <select
                  onChange={(event) => setSelectedCategory(event.target.value)}
                >
                  <option value="">Select a Category</option>
                  {categories.map((category, index) => (
                    <option key={category.value} value={category.value}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </Box>
              {selectedCategory && (
                <Box>
                  <Box paddingTop="50px" paddingLeft="20px">
                    <text style={{ color: "black", fontWeight: "bold" }}>
                      Upload Document :{" "}
                    </text>

                    <input
                      type="file"
                      accept=".pdf, .doc, .docx, .png, .jpg, .jpeg"
                      onChange={handleFileInputChange}
                    />
                  </Box>
                  {selectedFile && (
                    <Box paddingTop="20px" paddingLeft="20px">
                      {selectedFile.type &&
                      selectedFile.type.includes("image") ? (
                        <img src={filePreview} alt="File Preview" width="100" />
                      ) : (
                        <div>{uploadedFileName}</div>
                      )}
                    </Box>
                  )}
                  <Box paddingTop="50px">
                    <Box
                      paddingBottom="20px"
                      paddingLeft="20px"
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      <text>File Name</text>
                    </Box>
                    <Box paddingLeft="20px">
                      <input
                        type="text"
                        value={uploadedFileName}
                        onChange={(event) =>
                          setUploadedFileName(event.target.value)
                        }
                        placeholder="Enter file name"
                        style={{
                          border: "1px solid rgba(0,0,0,0.2)",
                          padding: "5px",
                          borderRadius: "9px",
                        }}
                      />
                    </Box>
                    <Box>
                      <Box paddingLeft="150px" paddingTop="50px">
                        <Button
                          onClick={handleUploadClick}
                          border={"1px solid rgba(0,0,0,0.2)"}
                          backgroundColor={"rgba(255,255,255,0.2)"}
                        >
                          Upload
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}
            </Box>
            {/* <Button onClick={closeAddModal} alignSelf="flex-end">
              Close
            </Button> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
