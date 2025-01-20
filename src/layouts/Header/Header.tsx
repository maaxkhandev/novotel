import { useState } from "react";
import styled from "styled-components";
import { Avatar, Flex } from "antd";
import { useNavigate } from "react-router";
import { BiLogOut } from "react-icons/bi";
import { Notifications } from "@assets/icons/svg";
import AvatarImage from "@assets/images/avatar.jpg";
import { SizedBox, Spacer } from "@components";
import { PrimaryButton } from "@components";
import { CustomSearchBar } from "@components";
import { BookingModal } from "../../pages/GuestPage/components/BookingModal";
import { COLORS, ROUTES } from "@constants";
import { authService } from "@services";
import dayjs from "dayjs";
import { TitleMedium } from "styles/GlobalStyles";
import { useAuthContext } from "@hooks";

export const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = (data) => {
    console.log("Submitted Data:", data);
    setIsModalVisible(false);
  };

  return (
    <HeaderDiv>
      <Flex justify="space-between">
        <LeftContainer>
          <TitleMedium>Welcom {currentUser.displayName}</TitleMedium>
        </LeftContainer>
        <RightContainer>
          <BiLogOut
            size={20}
            style={{ cursor: "pointer", color: COLORS.grey }}
            onClick={() => {
              navigate(ROUTES.login);
              authService.logOut();
            }}
          />
          <Notifications />
          <Avatar size={30} src={AvatarImage} />
        </RightContainer>
      </Flex>
      <SizedBox height={20} />
      <Flex align="center">
        <CustomSearchBar
          hint="Search for rooms and offers"
          onChange={(v) => {
            console.log(v);
          }}
        />
        <Spacer />
        <p>{dayjs().format("dddd, MMMM DD, YYYY")}</p>
        <Spacer />
        <PrimaryButton title="Create Booking" onClick={showModal} />
      </Flex>
      <BookingModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    </HeaderDiv>
  );
};

const HeaderDiv = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  padding: 10px 2rem;
  width: calc(100% - 200px);
  margin-left: auto;
  border-bottom: 1px solid rgb(234, 231, 231);
  background-color: #fff !important;
`;

const LeftContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; /* Add spacing between items */
`;

export default Header;
