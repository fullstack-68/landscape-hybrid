import { getTodos } from "./actionsAndDb";
import { FormInput } from "@/components/FormInput";
import { TodoList } from "@/components/TodoList";
import { Spinner } from "@/components/Spinner";
import { Suspense } from "react";

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ params, searchParams }: PageProps) {
  const todosPromise = getTodos();
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC + RCC)</h1>
      </a>
      <FormInput />
      <Suspense fallback={<div>Loading...</div>}>
        <TodoList todosPromise={todosPromise} />
      </Suspense>
      <Spinner />
    </main>
  );
}
