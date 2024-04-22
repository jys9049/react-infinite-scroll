import React, { Fragment, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import useInfiniteObserverRef from './hooks/useInfiniteObserverRef';
import InfiniteScroll from './InfiniteScroll';

function App() {
  const [number, setNumber] = useState<any[]>([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27,
  ]);

  const handleNumber = (amount: number) => {
    console.log(1);
    const array = [...number, amount];
    setNumber(array);
  };
  const parentRef = useRef<HTMLDivElement>(null);

  const asyncConsoleLog = async () => {
    console.log('Loading data...');

    // 데이터 로드를 시뮬레이션하기 위해 setTimeout 사용
    await new Promise((resolve) => setTimeout(resolve, 100)); // 2초 대기
    handleNumber(number.length + 1);
    console.log('Data loading complete.');
  };

  return (
    <div
      style={{
        width: '500px',
        height: '800px',
        overflow: 'auto',
        border: '1px solid red',
      }}
      ref={parentRef}
    >
      <InfiniteScroll
        loadMore={asyncConsoleLog}
        hasNext={false}
        parentRef={parentRef}
      >
        <div>
          {number.map((item) => (
            <Fragment key={item}>
              <p>{item}</p>
            </Fragment>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default App;
