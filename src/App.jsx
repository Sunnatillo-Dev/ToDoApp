import { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  VStack,
  Spacer,
  Heading,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

function App() {
  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", JSON.stringify("dark"));
    JSON.parse(localStorage.getItem("Task"))
      ? JSON.parse(localStorage.getItem("Task"))
      : [];
  }, []);
  let [tasks, setTasks] = useState(() => {
    let storedTasks = JSON.parse(localStorage.getItem("Task")) || [];
    return storedTasks;
  });
  let [newTask, setNewTask] = useState("");

  let addTask = () => {
    if (newTask.trim() !== "") {
      let updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem("Task", JSON.stringify(updatedTasks));
      setNewTask("");
    }
  };

  let deleteTask = (task) => {
    const index = tasks.indexOf(task);
    if (index !== -1) {
      let updatedTasks = [...tasks];
      updatedTasks.splice(index, 1);
      setTasks(updatedTasks);
      localStorage.setItem("Task", JSON.stringify(updatedTasks));
    }
  };

  useEffect(() => {
    let storedTasks = JSON.parse(localStorage.getItem("Task")) || [];
    if (!arraysEqual(tasks, storedTasks)) {
      setTasks(storedTasks);
    }
  }, [tasks]);
  function arraysEqual(arr1, arr2) {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
  }

  return (
    <ChakraProvider>
      <VStack
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        width={"700px"}
        p={4}
        spacing={4}
        align="stretch"
        bgColor="gray.800"
        color="white"
      >
        <Heading mb={4}>Todo App</Heading>
        <Box display={"flex"} alignItems={"center"} gap={"20px"}>
          <Input
            placeholder="Add a new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            width={"500px"}
            variant="filled"
            bgColor="gray.700"
            color="white"
            onKeyUp={(e) => {
              e.key == "Enter" ? addTask() : "";
            }}
          />
          <Button
            leftIcon={<AddIcon />}
            colorScheme="teal"
            onClick={addTask}
            width={"20%"}
          >
            Add Task
          </Button>
        </Box>
        <Spacer />
        <VStack width={"100%"} align="stretch" spacing={4}>
          {tasks.map((task, index) => (
            <Box
              key={index}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              d="flex"
              alignItems="flex-start"
              bgColor="gray.700"
              width={"100%"}
              display={"flex"}
            >
              <Text width={"90%"}>
                {JSON.parse(localStorage.getItem("Task"))[index]}
              </Text>
              <Spacer />
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => deleteTask(task)}
              />
            </Box>
          ))}
        </VStack>
      </VStack>
    </ChakraProvider>
  );
}

export default App;
