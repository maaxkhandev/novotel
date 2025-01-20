import { SizedBox } from "@components";
import { COLORS } from "@constants";
import { Table, Tag, Button, Dropdown, Menu, Flex } from "antd";
import { useGuestContext } from "hooks/useGuestContext";
import { useState } from "react";
import { CgMoreVerticalAlt } from "react-icons/cg";
import styled from "styled-components";
import { TitleMedium } from "styles/GlobalStyles";

const GuestTable = () => {
  const { guests, loading, checkoutGuest } = useGuestContext();

  const columns = [
    {
      title: "Reservation ID",
      dataIndex: "reservationId",
      key: "reservationId",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Room Number",
      dataIndex: "roomNumber",
      key: "roomNumber",
      render: (roomNumber) => <p>{roomNumber.join(", ")}</p>,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) => `$${totalAmount}`,
    },
    {
      title: "Amount Paid",
      dataIndex: "amountPaid",
      key: "amountPaid",
      render: (amountPaid: number) => `$${amountPaid}`,
    },
    {
      title: "Duration",
      dataIndex: "totalDuration",
      key: "totalDuration",
      render: (totalDuration: number) => `${totalDuration} Days`,
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        const color =
          status === "Pick up"
            ? "orange"
            : status === "Clean"
            ? "geekblue"
            : status === "Dirty"
            ? "volcano"
            : status === "Inspected"
            ? "green"
            : "orange";
        return (
          <Tag style={{ borderRadius: "12px" }} color={color}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu
            items={[
              {
                key: "1",
                label: "Edit",
                onClick: () => handleEdit(record.reservationId),
              },
              {
                key: "2",
                label: "Check-out",
                onClick: () => handleCheckout(record.id),
              },
              {
                key: "3",
                label: "Details",
                onClick: () => handleDetails(record.reservationId),
              },
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
  const totalPages = Math.ceil(guests.length / pageSize);

  const paginatedData = guests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleEdit = (reservationId: string) => {
    console.log(`Edit reservation with ID: ${reservationId}`);
    // Add your edit logic here
  };

  const handleCheckout = (id: string) => {
    checkoutGuest(id);
  };

  const handleDetails = (reservationId: string) => {
    console.log(`View details for reservation ID: ${reservationId}`);
    // Add your details logic here
  };

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

export default GuestTable;

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
