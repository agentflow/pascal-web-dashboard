import React, { useEffect, useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CheckTable(props) {
  const { columnsData } = props;
  const [tableData, setTableData] = useState([]);

  const columns = useMemo(() => columnsData, [columnsData]);

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        // Fetch data from AsyncStorage
        const storedDataJson = await AsyncStorage.getItem("your_data_key");
        if (storedDataJson) {
          const storedData = JSON.parse(storedDataJson);
          setTableData(storedData);
        }
      } catch (error) {
        console.error("Error fetching data from AsyncStorage:", error);
      }
    };

    fetchTableData();
  }, []);

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    initialState,
  } = tableInstance;
  initialState.pageSize = 11;

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");

  return (
    <Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
      <Thead>
        {/* ... (Header groups rendering) */}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return (
            <Tr {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                let data = "";
                // ... (Cell rendering logic)
              })}
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
