import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { Suspense, useEffect, useRef, useState } from "react";

const StyledDiv = styled("div")(() => ({
  width: "100%",
}));

function Container(props: {
  children?: React.ReactNode;
  onLoad: (height: number) => void;
}) {
  const { children, onLoad } = props;
  const containerElement = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (containerElement.current) {
      onLoad(containerElement.current.clientHeight);
    }
  }, [onLoad]);

  return <StyledDiv ref={containerElement}>{children}</StyledDiv>;
}

/**
 * Only show a skeleton if the suspense lasts long
 */
function TimedFallback(props: { height: number }) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTimedOut(true);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, []);

  if (timedOut) {
    return (
      <Skeleton height={props.height} variant="rectangular" width="100%" />
    );
  }

  return <div style={{ height: props.height }} />;
}

export default function AutoHeightSuspenseSkeleton(props: {
  children?: React.ReactNode;
}) {
  const [height, setHeight] = useState(100);

  return (
    <Suspense fallback={<TimedFallback height={height} />}>
      <Container onLoad={setHeight}>{props.children}</Container>
    </Suspense>
  );
}
