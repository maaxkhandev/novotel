import { Modal, Input, Form, Button, Select } from "antd";
import styled from "styled-components";
import { useRateContext, useRoomContext } from "@hooks";

export const AddRoomModal = ({ visible: open, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const { addRoom } = useRoomContext();
  const { rates } = useRateContext();
  const roomTypes: string[] = rates.map((rate) => rate.roomType);
  const bedTypes = ["Single bed", "Double bed", "VIP"];

  const roomFacilities = ["AC", "Shower", "Towel", "Bathtub", "TV"];

  const roomFloors = [
    "Ground Floor",
    "First Floor",
    "Second Floor",
    "Third Floor",
    "Fourth Floor",
    "Fifth Floor",
  ];

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("Room Data:", values);
        addRoom({ ...values, status: "Available" });
        onSubmit(values);
        form.resetFields(); // Reset the form after submission
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  return (
    <Modal title="Add New Room" open={open} onCancel={onCancel} footer={null}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          roomNumber: "",
          bedType: undefined,
          floor: "",
          facilities: [],
          status: "Available",
        }}
      >
        <FormItemDiv
          name="roomNumber"
          label="Room Number"
          rules={[{ required: true, message: "Room number is required!" }]}
        >
          <Input placeholder="Enter room number (e.g., #001)" />
        </FormItemDiv>
        <FormItemDiv
          name="bedType"
          label="Bed Type"
          rules={[{ required: true, message: "Bed type is required!" }]}
        >
          <Select placeholder="Select bed type">
            {bedTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </FormItemDiv>
        <FormItemDiv
          name="floor"
          label="Room Floor"
          rules={[{ required: true, message: "Room floor is required!" }]}
        >
          <Select placeholder="Enter floor (e.g., Floor - 1)">
            {roomFloors.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </FormItemDiv>
        <FormItemDiv
          name="roomType"
          label="Room Type"
          rules={[{ required: true, message: "Room Type is required!" }]}
        >
          <Select placeholder="Select room rype">
            {roomTypes.map((type) => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </FormItemDiv>

        <FormItemDiv
          name="facilities"
          label="Room Facilities"
          rules={[{ required: true, message: "Facilities are required!" }]}
        >
          <Select mode="multiple" placeholder="Select facilities" allowClear>
            {roomFacilities.map((facility) => (
              <Select.Option key={facility} value={facility}>
                {facility}
              </Select.Option>
            ))}
          </Select>
        </FormItemDiv>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Add Room
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const FormItemDiv = styled(Form.Item)`
  margin-bottom: 16px;
`;
