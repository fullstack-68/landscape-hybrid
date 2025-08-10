"use client";
import { FC, useState } from "react";
import { actionUpdateTodo, actionCreateTodo } from "@/app/actionsAndDb";
import useStore from "@/utils/store";
import { useShallow } from "zustand/shallow";

export const FormInput: FC = () => {
  const { mode } = useStore((state) => state);
  const [message, setMessage] = useState("");
  return (
    <>
      <div
        className="grid"
        style={{
          gridTemplateColumns: mode === "ADD" ? "4fr 1fr" : "4fr 1fr 1fr",
          alignItems: "start",
        }}
      >
        <div style={{ display: "contents" }}>
          <InputText />
          <ButtonSubmit setMessage={setMessage} />
          <ButtonUpdate setMessage={setMessage} />
          <ButtonCancel />
        </div>
      </div>
      {<i className="pico-color-red-300">{message ?? ""}</i>}
    </>
  );
};

interface PropsInputText {}
const InputText: FC<PropsInputText> = () => {
  const [pending, inputText, setInputText] = useStore(
    useShallow((state) => [state.pending, state.inputText, state.setInputText])
  );

  function handleChange(e: any) {
    setInputText(e.target.value);
  }

  return (
    <input
      type="text"
      disabled={pending}
      value={inputText}
      onChange={handleChange}
    />
  );
};

interface PropsButtonSubmit {
  setMessage: (e: string) => void;
}
const ButtonSubmit: FC<PropsButtonSubmit> = ({ setMessage }) => {
  const [mode, pending, setPending, inputText, setInputText] = useStore(
    useShallow((state) => [
      state.mode,
      state.pending,
      state.setPending,
      state.inputText,
      state.setInputText,
    ])
  );

  const submit = actionCreateTodo.bind(null, inputText);
  function handleClick() {
    setPending(true);
    submit()
      .then((res) => {
        setMessage(res.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPending(false);
        setInputText("");
      });
  }

  if (mode !== "ADD") return <></>;
  return (
    <button disabled={pending} onClick={handleClick}>
      Submit
    </button>
  );
};

interface PropsButtonUpdate {
  setMessage: (e: string) => void;
}
const ButtonUpdate: FC<PropsButtonUpdate> = ({ setMessage }) => {
  const [
    mode,
    setMode,
    pending,
    setPending,
    inputText,
    setInputText,
    curTodo,
    setCurTodo,
  ] = useStore(
    useShallow((state) => [
      state.mode,
      state.setMode,
      state.pending,
      state.setPending,
      state.inputText,
      state.setInputText,
      state.curTodo,
      state.setCurTodo,
    ])
  );

  const submit = actionUpdateTodo.bind(null, curTodo.id, inputText);
  function handleClick() {
    setPending(true);
    submit()
      .then((res) => {
        setMessage(res.message);
        if (res.message) return; // If there is err, stop here
        setMode("ADD");
        setCurTodo({ id: "", todoText: "" });
        setInputText("");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setPending(false);
      });
  }

  if (mode !== "EDIT") return <></>;
  return (
    <button disabled={pending} onClick={handleClick}>
      Update
    </button>
  );
};

const ButtonCancel: FC = () => {
  const [mode, pending, setMode, setCurTodo, setInputText] = useStore(
    useShallow((state) => [
      state.mode,
      state.pending,
      state.setMode,
      state.setCurTodo,
      state.setInputText,
    ])
  );

  function handleCancel() {
    setMode("ADD");
    setCurTodo({ id: "", todoText: "" });
    setInputText("");
  }

  if (mode !== "EDIT") return <></>;
  return (
    <button className="contrast" onClick={handleCancel} disabled={pending}>
      Cancel
    </button>
  );
};
