import { PrimaryButton, SizedBox, Spacer } from "@components";
import { Flex } from "antd";
import { SingleSelectChip } from "@components";
import { useState } from "react";
import { AddRoomModal } from "./AddRoomModal";

const RoomHeader = () => {
  const [selectedOption, setSelectedOption] = useState("All room(100)");
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleSave = () => {
    setModalVisible(false);
    console.log("Deal Saved");
  };
  return (
    <div>
      <Flex align="center">
        <SingleSelectChip
          options={["All room(100)", "Available room(20)", "Booked(80)"]}
          selectedOption={selectedOption}
          onOptionChange={(e) => {
            setSelectedOption(e);
          }}
        />
        <Spacer />
        <PrimaryButton title="Add Room" onClick={handleOpenModal} />
      </Flex>

      <SizedBox height={20} />

      <AddRoomModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default RoomHeader;
