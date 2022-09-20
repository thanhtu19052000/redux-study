import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useSelector, useDispatch } from "react-redux";
import { add, addNewTodo } from "../../redux/todoSlice";
import { useState } from "react";
// import { addTodos } from "../../redux/todoSlice";

export default function TodoList() {
  const todoList = useSelector((state) => state.todoList.todos);
  const searchList = useSelector((state) => state);
  function handleSearch() {
    const adapt = todoList.filter((item) => {
      return item.name.includes(searchList.search.search);
    });
    const filterRadio = () => {
      if (searchList.search.radio === "All") {
        return adapt;
      }
      if (searchList.search.radio === "Completed") {
        return adapt.filter((item) => item.status === true);
      }
      if (searchList.search.radio === "Todo") {
        return adapt.filter((item) => item.status === false);
      }
    };
    const filterPrio = () => {
      let newarr = [];

      if (searchList.search.priority.length === 0) {
        newarr.push(...filterRadio());
      } else {
        if (searchList.search.priority.includes("High")) {
          const adapt = filterRadio().filter((item) =>
            item.priority.includes("High")
          );
          newarr.push(...adapt);
        }
        if (searchList.search.priority.includes("Medium")) {
          const adapt = filterRadio().filter((item) =>
            item.priority.includes("Medium")
          );
          newarr.push(...adapt);
        }
        if (searchList.search.priority.includes("Low")) {
          const adapt = filterRadio().filter((item) =>
            item.priority.includes("Low")
          );
          newarr.push(...adapt);
        }
      }
      return newarr;
    };

    return filterPrio();
  }

  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [radio, setRadio] = useState("Medium");
  const handleAdd = () => {
    setInput("");
    dispatch(
      addNewTodo({
        id: todoList.length + 1,
        completed: false,
        name: input,
        priority: radio,
      })
    );
  };
  return (
    <Row style={{ height: "calc(100% - 40px)" }}>
      <Col span={24} style={{ height: "calc(100% - 40px)", overflowY: "auto" }}>
        {handleSearch().map((item) => {
          return (
            <Todo
              key={item.id}
              id={item.id}
              completed={item.completed}
              name={item.name}
              prioriry={item.priority}
            />
          );
        })}
      </Col>
      <Col span={24}>
        <Input.Group style={{ display: "flex" }} compact>
          <Input
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
            }}
          />
          <Select defaultValue={radio} onChange={(value) => setRadio(value)}>
            <Select.Option value="High" label="High">
              <Tag color="red">High</Tag>
            </Select.Option>
            <Select.Option value="Medium" label="Medium">
              <Tag color="blue">Medium</Tag>
            </Select.Option>
            <Select.Option value="Low" label="Low">
              <Tag color="gray">Low</Tag>
            </Select.Option>
          </Select>
          <Button type="primary" onClick={handleAdd}>
            Add
          </Button>
        </Input.Group>
      </Col>
    </Row>
  );
}
