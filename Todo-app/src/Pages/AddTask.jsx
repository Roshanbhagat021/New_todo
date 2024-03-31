import { Button, Container } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  due_date: "",
  description: "",
  status: "false",
};

function reducer(state, action) {
  // console.log(action.payload);
  switch (action.type) {
    case "INPUTCHANGE":
      return { ...state, [action.payload.name]: action.payload.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const AddTask = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("state: ", state);


  const navigate=useNavigate()

  function handelinputChange(e) {
    // console.log("e: ", e.target.value);
    const { name, value } = e.target;
    dispatch({ type: "INPUTCHANGE", payload: { name, value } });
  }

  async function addData() {
    try {
      let res = await axios.post(`http://localhost:3000/todos`, state);
      console.log("res: ", res.data);
      dispatch({ type: "RESET" });
      navigate("/")
    } catch (error) {
      console.log("error: ", error);
    }
  }

  function handelSubmit(e) {
    e.preventDefault();
    addData();
  }

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
        ADD TODO
      </Container>
      <div className="mt-4 max-w-[600px] mx-auto border-2 py-4 px-6">
        <form onSubmit={handelSubmit}>
          <label>
            <b>Task Title</b>
            <input
              placeholder="Task"
              onChange={handelinputChange}
              name="title"
              type="text"
              className="w-full outline-none border-2 h-10 rounded-md px-2 mb-4"
              value={state.title}
            />
          </label>
          <label>
            <b>Due Date</b>
            <input
              placeholder="Due Date"
              onChange={handelinputChange}
              name="due_date"
              type="number"
              className="w-full outline-none border-2 h-10 rounded-md px-2 mb-4"
              value={state.due_date}
            />
          </label>
          <br />
          <label>
            <b>Description</b>
            <textarea
              name="description"
              id=""
              rows="4"
              onChange={handelinputChange}
              placeholder="Describe your task......."
              className="outline-none border-2 rounded-lg italic p-2 w-full box-sizing: border-box mb-4 "
              value={state.description}
            ></textarea>
          </label>

          <Button colorScheme="blue" type="submit" w={"full"}>
            Add
          </Button>
        </form>
      </div>
    </>
  );
};

export default AddTask;
