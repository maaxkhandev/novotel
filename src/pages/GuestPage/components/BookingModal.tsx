import {
  Modal,
  Input,
  Form,
  Button,
  Select,
  DatePicker,
  Flex,
  InputNumber,
} from "antd";
import dayjs from "dayjs";
import styled from "styled-components";
import { useState } from "react";
import { useRateContext, useRoomContext } from "@hooks";
import { useGuestContext } from "hooks/useGuestContext";
import { Timestamp } from "firebase/firestore";
export const BookingModal = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();
  const { getAvailableRoomNumbers } = useRoomContext();
  const availableRooms = getAvailableRoomNumbers();
  const { rates } = useRateContext();
  const { addGuest } = useGuestContext();

  const [totalAmount, setTotalAmount] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const updateTotalAmount = () => {
    const { dateRange, roomType, roomNumber } = form.getFieldsValue([
      "dateRange",
      "roomType",
      "roomNumber",
    ]);
    if (dateRange?.length === 2 && roomType) {
      const [startDate, endDate] = dateRange;
      const duration = dayjs(endDate).diff(dayjs(startDate), "day");
      setTotalDuration(duration);

      const selectedRate = rates.find((rate) => rate.id === roomType);
      const newTotalAmount =
        duration * (selectedRate?.pricePerDay || 0) * roomNumber.length;

      setTotalAmount(newTotalAmount);
    }
  };

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const { roomType } = values;

        const formattedValues = {
          ...values,
          startDate: Timestamp.fromDate(values.dateRange[0].toDate()),
          endDate: Timestamp.fromDate(values.dateRange[1].toDate()),
          totalDuration,
          totalAmount,
          roomType: rates.find((rate) => rate.id === roomType)?.roomType || 0,
          pricePerDay:
            rates.find((rate) => rate.id === roomType)?.pricePerDay || 0,
          status: "Clean",
        };
        delete formattedValues.dateRange;

        addGuest(formattedValues);
        onSubmit(formattedValues);

        form.resetFields();
      })
      .catch((error) => {
        console.error("Validation Failed:", error);
      });
  };

  return (
    <Modal
      title="Create Booking"
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSave}
        initialValues={{
          specialRequests: "",
        }}
        onValuesChange={(changedValues) => {
          if (
            changedValues.dateRange ||
            changedValues.roomType ||
            changedValues.roomNumber
          ) {
            updateTotalAmount();
          }
        }}
      >
        <Flex justify="space-between">
          <FormItemDiv
            name="reservationId"
            label="Reservation ID"
            rules={[
              { required: true, message: "Reservation ID is required!" },
              {
                validator: (_, value) => {
                  if (!value || value.toString().length === 13) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Reservation ID must be exactly 13 digits!")
                  );
                },
              },
            ]}
          >
            <Input
              placeholder="#1234"
              style={{ width: "100%" }}
              maxLength={13}
              onKeyPress={(event) => {
                const charCode = event.which || event.keyCode;
                // Allow only numeric characters (48-57) or backspace (8)
                if (charCode < 48 || charCode > 57) {
                  event.preventDefault();
                }
              }}
              onPaste={(event) => {
                // Prevent pasting non-numeric input
                const pasteData = event.clipboardData.getData("Text");
                if (!/^\d+$/.test(pasteData)) {
                  event.preventDefault();
                }
              }}
            />
          </FormItemDiv>

          <FormItemDiv
            name="name"
            label="Guest Name"
            rules={[{ required: true, message: "Guest name is required!" }]}
          >
            <Input placeholder="John Doe" />
          </FormItemDiv>
        </Flex>
        <Flex justify="space-between">
          <FormItemDiv
            name="contact"
            label="Contact Number"
            rules={[{ required: true, message: "Contact number is required!" }]}
          >
            <InputNumber placeholder="123-456-7890" style={{ width: "100%" }} />
          </FormItemDiv>
          <FormItemDiv
            name="roomType"
            label="Room Type"
            rules={[{ required: true, message: "Room type is required!" }]}
          >
            <Select placeholder="Select a room type">
              {rates.map((rate) => (
                <Select.Option key={rate.id} value={rate.id}>
                  {rate.roomType} - ${rate.pricePerDay}/day
                </Select.Option>
              ))}
            </Select>
          </FormItemDiv>
        </Flex>
        <Flex justify="space-between">
          <FormItemDiv
            name="dateRange"
            label="Check-In, Check-Out Dates"
            rules={[{ required: true, message: "Date range is required!" }]}
          >
            <DatePicker.RangePicker format="YYYY-MM-DD" />
          </FormItemDiv>
          <FormItemDiv
            name="roomNumber"
            label="Room Number"
            rules={[
              {
                required: true,
                message: "Please select at least one room number!",
              },
            ]}
          >
            <Select
              placeholder="Select room numbers"
              mode="multiple"
              allowClear
            >
              {availableRooms.length > 0 ? (
                availableRooms.map((number) => (
                  <Select.Option key={number} value={number}>
                    {number}
                  </Select.Option>
                ))
              ) : (
                <Select.Option disabled key="no-rooms" value="no-rooms">
                  No rooms available
                </Select.Option>
              )}
            </Select>
          </FormItemDiv>
        </Flex>

        <Form.Item
          name="amountPaid"
          label="Amount Paid"
          rules={[{ required: true, message: "Required" }]}
        >
          <InputNumber placeholder="Amount Paid" style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="specialRequests" label="Special Requests">
          <Input.TextArea rows={3} placeholder="Any specific requests?" />
        </Form.Item>
        <h3>
          Duration: <span>{totalDuration} Days</span>
        </h3>
        <h3>
          Total Amount: $<span>{totalAmount}</span>
        </h3>
        <div
          style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
        >
          <Button onClick={onCancel}>Cancel</Button>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

const FormItemDiv = styled(Form.Item)`
  width: 220px;
`;
