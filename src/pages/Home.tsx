import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const tasksExists = tasks.find(e => e.title === newTaskTitle);
    if (tasksExists) {
      Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome");
    }
    if (!tasks)
      return;

    const newTask = { id: new Date().getTime(), title: newTaskTitle, done: false }
    setTasks(oldTask => [...oldTask, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    if (id !== 0) {
      const taskUpload = tasks.map(task => ({ ...task }));
      taskUpload.filter(e => e.done = !e.done).find(f => f.id === id);
      setTasks(taskUpload);
    }
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Ask me later pressed"),
          style: "cancel"
        },
        {
          text: "Sim",
          onPress: () => {
            if (id !== 0) {
              setTasks(tasks.filter(e => e.id !== id));
            }
          },
          style: "default"
        }
      ]
    );
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    if (id !== 0 && !taskNewTitle) {
      const taskUpload = tasks.map(task => ({ ...task }));
      taskUpload.filter(e => e.title = taskNewTitle).find(f => f.id === id);
      setTasks(taskUpload);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})