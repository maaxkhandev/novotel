import { PrimaryButton, SizedBox, Spacer } from "@components";
import { Flex } from "antd";
import FilterButton from "pages/GuestPage/components/FilterButton";
import { useState } from "react";
import { AddRateModal } from "./AddRateModal";

const RateHeader = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);
  const handleSave = () => {
    setModalVisible(false);
  };
  return (
    <div>
      <Flex align="center">
        <Spacer />
        <PrimaryButton title="Add rate" onClick={handleOpenModal} />
        <SizedBox width={20} />
        <FilterButton
          options={["Ongoing", "Full", "Inactive", "New"]}
          selectedFilter={selectedFilter}
          onFilterChange={(e) => {
            setSelectedFilter(e);
          }}
        />
      </Flex>

      <SizedBox height={20} />
      <AddRateModal
        visible={modalVisible}
        onCancel={handleCloseModal}
        onSubmit={handleSave}
      />
    </div>
  );
};

export default RateHeader;
