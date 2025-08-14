"use server";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";
export async function actionCreateTodo(todoText: string) {
  try {
    await createTodos(todoText);
  } catch (err: any) {
    if (typeof err === "string") {
      return { message: err };
    } else {
      return { message: "Unknown Error" };
    }
  }
  revalidatePath("/");
  return { message: "" };
}

export async function actionUpdateTodo(curId: string, todoTextUpdated: string) {
  try {
    await updateTodo(curId, todoTextUpdated);
  } catch (err) {
    if (typeof err === "string") {
      return { message: err };
    } else {
      return { message: "Unknown Error" };
    }
  }
  revalidatePath("/");
  return { message: "" };
}

export async function actionDeleteTodo(curId: string) {
  "use server";
  try {
    await deleteTodo(curId);
  } catch (err) {
    if (typeof err === "string") {
      return { message: err };
    } else {
      return { message: "Unknown Error" };
    }
  }
  revalidatePath("/");
}

// * DB Functionality
// I need to include this with server-action function so that I don't get multiple copies of todos arrays.
// This inclusion would not be necessary when I use real database.
const DB_LATENCY = 1000; // ms

let todos = [
  {
    id: "123456", // For some reasons, if I "genId" this ID there will be some inconsistencies when updating. Might have to do with caching.
    todoText: "My First Todo",
  },
];

function genId() {
  return new Date().getTime().toString().slice(-6);
}

export async function getTodos() {
  await sleep(DB_LATENCY);
  return todos;
}

export async function createTodos(todoText: string) {
  await sleep(DB_LATENCY);
  if (!todoText) return Promise.reject("Empty Text");
  todos.push({
    id: genId(),
    todoText: todoText,
  });
}

export async function deleteTodo(id: string) {
  await sleep(DB_LATENCY);
  todos = todos.filter((el) => el.id !== id);
}

export async function searchTodo(id: string) {
  await sleep(DB_LATENCY);
  const todo = todos.find((el) => el.id === id);
  return todo;
}

export async function updateTodo(id: string, todoTextUpdated: string) {
  await sleep(DB_LATENCY);
  if (!todoTextUpdated) return Promise.reject("Empty Text");
  const idx = todos.findIndex((el) => el.id === id);
  if (idx > -1) {
    todos[idx].todoText = todoTextUpdated;
  } else {
    return Promise.reject("Invalid Todo ID");
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export type Todo = Awaited<ReturnType<typeof getTodos>>[0];
