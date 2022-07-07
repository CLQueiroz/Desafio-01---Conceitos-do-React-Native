import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    if (id !== 0) {
      setTasks(tasks.filter(e => e.id !== id));
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