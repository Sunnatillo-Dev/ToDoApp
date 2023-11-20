import { useEffect, useState } from "react"
import React from "react"
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
  Flex,
} from "@chakra-ui/react"
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
function App() {
  let [tasks, setTasks] = useState(() => {
    let storedTasks = JSON.parse(localStorage.getItem("Task")) || []
    return storedTasks
  })
  let [newTask, setNewTask] = useState("")
  let [editingIndex, setEditingIndex] = useState(-1)

  useEffect(() => {
    localStorage.setItem("chakra-ui-color-mode", JSON.stringify("dark"))
    JSON.parse(localStorage.getItem("Task"))
      ? JSON.parse(localStorage.getItem("Task"))
      : []
  }, [])

  let addTask = () => {
    if (newTask.trim() !== "") {
      let updatedTasks = [...tasks, newTask]
      setTasks(updatedTasks)
      localStorage.setItem("Task", JSON.stringify(updatedTasks))
      setNewTask("")
    }
  }

  let deleteTask = (task) => {
    let index = tasks.indexOf(task)
    if (index !== -1) {
      let updatedTasks = [...tasks]
      updatedTasks.splice(index, 1)
      setTasks(updatedTasks)
      localStorage.setItem("Task", JSON.stringify(updatedTasks))
    }
  }

  let editTask = (index) => {
    setEditingIndex(index)
  }

  let updateTask = (index, updatedTask) => {
    let updatedTasks = [...tasks]
    updatedTasks[index] = updatedTask
    setTasks(updatedTasks)
    localStorage.setItem("Task", JSON.stringify(updatedTasks))
    setEditingIndex(-1)
  }

  let handleEditChange = (index, e) => {
    let updatedTasks = [...tasks]
    updatedTasks[index] = e.target.value
    setTasks(updatedTasks)
  }

  let handleEditKeyUp = (index, e) => {
    if (e.key === "Enter") {
      updateTask(index, e.target.value)
    }
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
              e.key === "Enter" ? addTask() : ""
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
              {editingIndex === index ? (
                <Input
                  value={task}
                  onChange={(e) => handleEditChange(index, e)}
                  onKeyUp={(e) =>
                    !e.target.value && e.key == "Enter"
                      ? deleteTask(task)
                      : handleEditKeyUp(index, e)
                  }
                  width={"90%"}
                  variant="filled"
                  bgColor="gray.700"
                  color="white"
                />
              ) : (
                <Text width={"520px"}>{task}</Text>
              )}
              <Spacer />
              <Flex gap={"15px"}>
                <IconButton
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  onClick={() => deleteTask(task)}
                />
                <IconButton
                  icon={<EditIcon />}
                  colorScheme="teal"
                  onClick={() => editTask(index)}
                />
              </Flex>
            </Box>
          ))}
        </VStack>
      </VStack>
    </ChakraProvider>
  )
}

export default App
