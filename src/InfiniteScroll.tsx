// InfiniteScroll 컴포넌트 수정
import React, { useEffect, useState } from 'react';
import useInfiniteObserverRef from './hooks/useInfiniteObserverRef';

interface IInfiniteScrollProps {
  parentRef?: React.RefObject<HTMLElement>;
  loadMore?: () => Promise<void>;
  useWindow?: boolean;
  hasNext: boolean;
}

const InfiniteScroll = ({
  children,
  parentRef,
  loadMore,
  hasNext,
}: React.PropsWithChildren<IInfiniteScrollProps>) => {
  const [hasScroll, setHasScroll] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTest = async () => {
    if (loadMore) {
      setLoading(true);
      try {
        await loadMore();
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
  };

  const scrollRef = useInfiniteObserverRef(handleTest);

  useEffect(() => {
    if (parentRef?.current) {
      const scrollCheck =
        parentRef.current.scrollHeight > parentRef.current.clientHeight;

      setHasScroll(scrollCheck && hasNext);
    }
  }, [parentRef, hasNext]);

  return (
    <div>
      {children}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div
          ref={hasScroll ? scrollRef : undefined}
          style={{ height: '1px' }}
        />
      )}
    </div>
  );
};

export default InfiniteScroll;
