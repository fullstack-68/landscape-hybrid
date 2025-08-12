"use client";
import { type FC } from "react";
import { type Todo } from "@/app/actionsAndDb";
import { actionDeleteTodo } from "@/app/actionsAndDb";
import useStore from "@/utils/store";
import styles from "./spinner.module.css";
import { useShallow } from "zustand/shallow";
import { use } from "react";

interface Props {
  todosPromise: Promise<Todo[]>;
}

export const TodoList: FC<Props> = ({ todosPromise }) => {
  const { curTodo } = useStore((state) => state);
  const todos = use(todosPromise);
  return (
    <>
      {todos.map((todo, idx) => {
        const fontStyle = todo.id === curTodo.id ? "700" : "400";
        const fontClass = todo.id === curTodo.id ? "pico-color-blue-400" : "";

        return (
          <article
            key={todo.id}
            className="grid"
            style={{
              alignItems: "center",
              gridTemplateColumns: "0.5fr 4fr 1fr 1fr",
            }}
          >
            <span>({idx + 1})</span>
            <span style={{ fontWeight: fontStyle }} className={fontClass}>
              ✍️ {todo.todoText}
            </span>
            <ButtonDelete todo={todo} />
            <ButtonUpdate todo={todo} />
          </article>
        );
      })}
    </>
  );
};

const ButtonDelete: FC<{ todo: Todo }> = ({ todo }) => {
  const [mode, pending, setPending] = useStore(
    useShallow((state) => [state.mode, state.pending, state.setPending])
  );

  function handleClick() {
    setPending(true);
    actionDeleteTodo(todo.id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPending(false);
      });
  }

  if (mode === "EDIT" || pending) return <></>;
  return (
    <div
      className={styles["custom-btn"]}
      onClick={handleClick}
      style={{ marginBottom: 0 }}
    >
      🗑️
    </div>
  );
};

const ButtonUpdate: FC<{ todo: Todo }> = ({ todo }) => {
  const [mode, setMode, setCurTodo, pending, setInputText] = useStore(
    useShallow((state) => [
      state.mode,
      state.setMode,
      state.setCurTodo,
      state.pending,
      state.setInputText,
    ])
  );

  if (mode === "EDIT" || pending) return <></>;

  return (
    <div
      className={styles["custom-btn"]}
      style={{ marginBottom: 0 }}
      onClick={() => {
        setMode("EDIT");
        setCurTodo(todo);
        setInputText(todo.todoText);
      }}
    >
      🖊️
    </div>
  );
};
