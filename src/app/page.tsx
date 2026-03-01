"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { nanoid } from "nanoid";
import { BooleanLiteral } from "typescript";

const tabs = ["All", "Completed", "Incomplete"];

type Todo = {
  id: string;
  isDone: Boolean;
  text: string;
};

export default function Todo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [value, setValue] = useState("");
  const [selectedButton, setSelectedButton] = useState("All");

  return (
    <div className="w-screen h-screen flex justify-center items-center py-60">
      <Card className="w-[400px] h-fit">
        <CardHeader>
          <h1 className="flex items-center justify-center text-[20px]">
            To-Do List
          </h1>
          <div className="flex gap-4 ">
            <Input
              className="flex-1"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <Button
              onClick={() => {
                if (value === "") return;
                setTodos([
                  ...todos,
                  {
                    id: nanoid<string>(),
                    isDone: false,
                    text: value,
                  },
                ]);
                setValue("");
              }}
            >
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex mb-4 text-white">
            {tabs.map((tab) => (
              <Button
                key={tab}
                variant="ghost"
                className="flex-1"
                style={{
                  backgroundColor:
                    tab === selectedButton ? "black" : "transparent",
                  color: tab === selectedButton ? "white" : "black",
                }}
                onClick={() => {
                  setSelectedButton(tab);
                }}
              >
                {tab}
              </Button>
            ))}
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {todos
              .filter((item) => {
                if (selectedButton === "All") return true;
                if (selectedButton === "Completed") return item.isDone === true;
                return item.isDone === false;
              })
              .map((item) => (
                <Card key={item.id}>
                  <CardContent className="flex gap-4 items-center">
                    <Checkbox
                      checked={item.isDone}
                      onClick={() => {
                        const newTodos = todos.map((todo) => {
                          if (todo.id !== item.id) return todo;
                          return {
                            isDone: !item.isDone,
                            text: item.text,
                            id: item.id,
                          };
                        });

                        setTodos(newTodos);
                      }}
                    />
                    <p className="flex-1 ">{item.text}</p>

                    <Button
                      onClick={() => {
                        const newTodos = todos.filter(
                          (todo) => todo.id !== item.id,
                        );
                        setTodos(newTodos);
                      }}
                    >
                      Delete
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>

          <div className="mt-4 flex justify-center">
            {todos.filter((todo) => todo.isDone).length} of {todos.length}
            {""}completed
          </div>

          <div className="flex justify-center gap-1 pt-10">
            <p className="text-[12px] text-gray-500">Powered by</p>
            <h1 className="text-[12px]">Pinecone academy</h1>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
