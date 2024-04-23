# 基本使用

```tsx
import React, { useState } from 'react';
import { DragList, DragColumn } from 'salita-components';

export default () => {
  const [col, setCol] = useState([
    { dataIndex: 'name', title: 'Person' },
    { dataIndex: 'interest', title: 'Most interest in' },
    { dataIndex: 'age', title: 'Age' },
    { dataIndex: 'random', title: 'Random' },
  ]);

  const [data, setData] = useState<Record<string, string | number>[]>([
    { name: 'John', interest: 'football', age: 18, random: Math.random() },
    { name: 'Jane', interest: 'basketball', age: 19, random: Math.random() },
    { name: 'Jim', interest: 'baseball', age: 20, random: Math.random() },
    { name: 'Joe', interest: 'tennis', age: 21, random: Math.random() },
    { name: 'Jenny', interest: 'swimming', age: 22, random: Math.random() },
  ]);

  const arrayMove = (arr: any[], fromIndex: number, toIndex: number) => {
    const newArr = [...arr];
    newArr.splice(toIndex, 0, newArr.splice(fromIndex, 1)[0]);
    return newArr;
  };

  return (
    <DragList
      onDragEnd={(from, to) => {
        setData((pre) => arrayMove(pre, from, to));
      }}
      nodeSelector="tbody tr"
    >
      <DragColumn
        onDragEnd={(from, to) => {
          setCol((pre) => arrayMove(pre, from, to));
        }}
        nodeSelector="thead tr th"
        handleSelector="button"
      >
        <table border={1}>
          <thead>
            <tr>
              {col.map(({ dataIndex, title }) => (
                <th key={dataIndex}>
                  {<button>handle</button>}
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name}>
                {col.map(({ dataIndex }) => (
                  <th key={dataIndex}>{item[dataIndex]}</th>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DragColumn>
    </DragList>
  );
};
```

# API

<API src='src/DragList/index.tsx' hideTitle id="DragList">
