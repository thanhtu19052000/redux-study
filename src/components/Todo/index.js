import { Row, Tag, Checkbox } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updatechecked, updateCheckedThunk } from "../../redux/todoSlice";

const priorityColorMapping = {
  High: "red",
  Medium: "blue",
  Low: "gray",
};

export default function Todo({ completed, name, prioriry, id }) {
  const dispatch = useDispatch();
  const toggleCheckbox = (e) => {
    dispatch(updateCheckedThunk(e.target.id));
  };

  return (
    <Row
      justify="space-between"
      style={{
        marginBottom: 3,
        ...(completed ? { opacity: 0.5, textDecoration: "line-through" } : {}),
      }}
    >
      <Checkbox
        checked={completed}
        onChange={toggleCheckbox}
        value={name}
        id={id}
      >
        {name}
      </Checkbox>
      <Tag color={priorityColorMapping[prioriry]} style={{ margin: 0 }}>
        {prioriry}
      </Tag>
    </Row>
  );
}
