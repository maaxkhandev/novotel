import { Table, Button, Dropdown, Menu, Flex } from "antd";
import { useState } from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";
import styled from "styled-components";
import { SizedBox } from "@components";
import { COLORS } from "@constants";
import { TitleMedium } from "styles/GlobalStyles";
import { useRateContext } from "@hooks";

const RateTable = () => {
  const { rates, loading } = useRateContext();

  const columns = [
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Cancellation Policy",
      dataIndex: "cancellationPolicy",
      key: "cancellationPolicy",
    },
    {
      title: "Deals",
      dataIndex: "deal",
      key: "deal",
      render: (deal: string | null) => (deal ? deal : "N/A"),
    },
    {
      title: "Total Capicity",
      dataIndex: "totalCapacity",
      key: "totalCapacity",
    },
    {
      title: "Price per Day",
      dataIndex: "pricePerDay",
      key: "pricePerDay",
      render: (pricePerDay: number) => `$${pricePerDay.toFixed(2)}`,
    },
    // {
    //   title: "Availability",
    //   dataIndex: "availability",
    //   key: "availability",
    //   render: (availability: number) => {
    //     const color =
    //       availability === 0 ? "red" : availability < 5 ? "blue" : "green";
    //     return (
    //       <Tag style={{ borderRadius: "12px" }} color={color}>
    //         {availability === 0 ? "Full" : `${availability} rooms`}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Actions",
      key: "actions",
      render: () => {
        const menu = (
          <Menu
            items={[
              { key: "1", label: "Edit" },
              { key: "2", label: "Delete" },
              { key: "3", label: "Details" },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button type="text" icon={<CgMoreVerticalAlt size={22} />} />
          </Dropdown>
        );
      },
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.ceil(rates.length / pageSize);

  const paginatedData = rates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <TitleMedium>Loading...</TitleMedium>;
  }

  return (
    <div>
      <Table columns={columns} dataSource={paginatedData} pagination={false} />
      <SizedBox height={20} />
      <Flex style={{ padding: "0 2rem" }} justify="space-between">
        <PaginationButton
          isActive={false}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </PaginationButton>
        <Flex>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <PaginationContainer
                key={page}
                isActive={page === currentPage}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </PaginationContainer>
            )
          )}
        </Flex>
        <PaginationButton
          isActive={false}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </PaginationButton>
      </Flex>
    </div>
  );
};

export default RateTable;

const PaginationContainer = styled.button<{ isActive: boolean }>`
  background-color: ${(props) =>
    props.isActive ? `${COLORS.primary}33` : "transparent"};
  color: ${(props) => (props.isActive ? COLORS.primary : COLORS.grey)};
  border: none;
  font-size: 16px;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
`;

const PaginationButton = styled.button<{ isActive: boolean }>`
  border: 1px solid gray;
  padding: 8px 20px;

  color: ${(props) => (props.isActive ? "white" : "black")};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? COLORS.primary : "#f0f0f0"};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
