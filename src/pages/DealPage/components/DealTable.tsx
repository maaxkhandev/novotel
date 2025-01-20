import { SizedBox } from "@components";
import { COLORS } from "@constants";
import { Table, Tag, Button, Dropdown, Menu, Flex } from "antd";
import { useState } from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";
import styled from "styled-components";
import { useDealContext } from "@hooks";
import DateUtility from "utils/date.utils";
import { Timestamp } from "firebase/firestore";
import { TitleMedium } from "styles/GlobalStyles";
import { calculateDealStatus } from "@services";

const DealTable = () => {
  const { deals, loading } = useDealContext();
  const columns = [
    {
      title: "Deal Name",
      dataIndex: "dealName",
      key: "dealName",
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => `$${price}`,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount: number) => `$${discount}`,
    },
    {
      title: "Room Facility",
      dataIndex: "roomFacility",
      key: "roomFacility",
    },

    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (endDate: Timestamp) => DateUtility.formatReadableDate(endDate),
    },
    {
      title: "Status",
      key: "status",
      render: (_, record) => {
        // Use the imported function to calculate status
        const status = calculateDealStatus(record.startDate, record.endDate);

        // Assign colors to statuses
        const color =
          status === "Active"
            ? "green"
            : status === "Expired"
            ? "volcano"
            : status === "Upcoming"
            ? "blue"
            : "default";

        return (
          <Tag style={{ borderRadius: "12px" }} color={color}>
            {status}
          </Tag>
        );
      },
    },
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
  const pageSize = 8;
  const totalPages = Math.ceil(deals.length / pageSize);

  const paginatedData = deals.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <TitleMedium>Loading.... </TitleMedium>;
  }

  return (
    <div>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={false}
        rowKey="key"
      />
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

export default DealTable;

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
