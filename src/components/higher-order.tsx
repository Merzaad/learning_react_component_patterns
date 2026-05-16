import React, { ComponentType, useEffect, useState } from "react";

const data = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com" },
];

function withDataFetching<T extends { data?: any }>(
  WrappedComponent: ComponentType<T>,
  mockData: any,
) {
  return (props: Omit<T, "data">) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const timer = setTimeout(() => {
        setData(mockData);
        setLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }, []);

    if (loading) return <div>Loading...</div>;

    return <WrappedComponent {...(props as T)} data={data} />;
  };
}

interface ListItem {
  id: string;
  name: string;
  email: string;
}

interface ListProps {
  data: ListItem[];
}

const List: React.FC<ListProps> = ({ data }) => {
  return (
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
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.name}</strong> - {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

const ListWithData = withDataFetching(List, data);

const HigherOrder: React.FC = () => {
  return <ListWithData />;
};

export default HigherOrder;
