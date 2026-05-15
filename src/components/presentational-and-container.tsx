interface ListItem {
  id: string;
  desc: string;
}
interface ListProps {
  list: ListItem[];
}
const List = ({ list }: ListProps) => (
  <div>
    <ul
      style={{
        maxWidth: "600px",
        margin: "3rem auto 0",
        padding: 0,
        listStyle: "none",
        backgroundColor: "#f9fafb",
        borderRadius: "0.5rem",
        border: "1px solid #e5e7eb",
      }}
    >
      {list.map((item, index) => (
        <li
          key={item.id}
          style={{
            textAlign: "start",
            padding: "1rem",
            color: "gray",
            borderBottom:
              index !== list.length - 1 ? "1px solid #e5e7eb" : undefined,
          }}
        >
          {item.desc}
        </li>
      ))}
    </ul>
  </div>
);

import { useState, useEffect } from "react";

export default function PresentationalAndContainer() {
  const [list, setList] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.resolve([
      {
        id: "1",
        desc: "The container component, which acts as the component responsible for the data fetching or computation.",
      },
      {
        id: "2",
        desc: "The presentation component, whose job is to render the fetched data or computed value on the UI(user interface).",
      },
    ]).then((data) => {
      setList(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <List list={list} />;
}
