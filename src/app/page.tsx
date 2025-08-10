import { getTodos } from "./actionsAndDb";
import { FormInput } from "@/components/FormInput";
import { TodoList } from "@/components/TodoList";
import { Spinner } from "@/components/Spinner";
import { use } from "react";
import { Suspense } from "react";
interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Home({ params, searchParams }: PageProps) {
  // const todos = await getTodos();

  // const todos = use(getTodos());

  const todosPromise = getTodos();
  return (
    <main className="container">
      <a href="/">
        <h1>Todo (RSC + RCC)</h1>
      </a>

      <FormInput />
      <Suspense fallback={<div>Loading Todos...</div>}>
        <TodoList todosPromise={todosPromise} />
        {/* {JSON.stringify(todos)} */}
      </Suspense>
      <Spinner />
    </main>
  );
}
