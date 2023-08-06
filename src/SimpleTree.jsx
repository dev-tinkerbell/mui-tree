import React from "react";
import TreeFilter from "./component/TreeFilter";

const sampleData = {
  id: "0",
  name: "root - 0",
  children: [
    {
      id: "1",
      name: "Child - 1",
      children: [
        {
          id: "10",
          name: "Child - 10",
        },
        {
          id: "11",
          name: "Children -11",
        },
      ],
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Children - 4",
          children: [
            {
              id: "5",
              name: "Child - 5",
              children: [
                {
                  id: "6",
                  name: "Child - 6",
                },
                {
                  id: "7",
                  name: "Child - 7",
                },
                {
                  id: "8",
                  name: "Child - 8",
                },
                {
                  id: "9",
                  name: "Child - 9",
                },
              ],
            },
          ],
        },
        { id: "12", name: "Child - 12" },
      ],
    },
  ],
};

const SimpleTree = () => {
  return <TreeFilter data={sampleData} />;
};

export default SimpleTree;
