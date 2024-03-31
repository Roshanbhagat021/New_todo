import { Container, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { AddIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const Home = () => {
  const [todoData, setTodoData] = useState([]);
  const [isSomethingUpdated, setIsSomethingUpdated] = useState(false);

  async function getTodoDetails(url) {
    try {
      let res = await axios.get(url);
      console.log("res: ", res);
      setTodoData(res.data);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handleStausFilter(e) {
    const status = e.target.value;
    getTodoDetails(`http://localhost:3000/todos?status=${status}`);
  }

  function handleDateWiseSorting(e) {
    if (e.target.value == "new") {
      getTodoDetails(`http://localhost:3000/todos?_sort=due_date`);
    }
    else(
        getTodoDetails(`http://localhost:3000/todos`)
    )
  }

  useEffect(() => {
    getTodoDetails(`http://localhost:3000/todos`);
  }, [isSomethingUpdated]);

  return (
    <>
      <Container
        maxW="6xl"
        bg="blue.600"
        h={8}
        rounded={5}
        color="white"
        textAlign="center"
        fontSize="xl"
      >
        TODO APP
      </Container>

      <Container maxW={"6xl"} display={"flex"} gap={"5"}>
        <Select placeholder="Sort by Date" onChange={handleDateWiseSorting}>
          <option value="new">New Tasks</option>
          <option value="old">Old Tasks</option>
        </Select>
        <Select onChange={handleStausFilter} placeholder="All">
          <option value="true">Completed</option>
          <option value="false">Pending</option>
        </Select>

        <Link to="/create">
          <button className="h-10   bg-blue-300 w-[250px]  px-2 outline-none rounded-[6px]">
            Add task <AddIcon />
          </button>
        </Link>
      </Container>

      {todoData.map((task) => {
        return (
          <TaskItem
            key={task.id}
            {...task}
            isSomethingUpdated={isSomethingUpdated}
            setIsSomethingUpdated={setIsSomethingUpdated}
          />
        );
      })}
    </>
  );
};

export default Home;
