import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import DelayedSuspense from "./delayedSuspense";

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
 * Suspense with a Skeleton that remembers the previous content height
 */
export default function AutoHeightSuspenseSkeleton(props: {
  children?: React.ReactNode;
}) {
  const [height, setHeight] = useState(100);

  return (
    <DelayedSuspense
      fallback={<Skeleton height={height} variant="rectangular" width="100%" />}
      placeholderProps={{ style: { height: height } }}
    >
      <Container onLoad={setHeight}>{props.children}</Container>
    </DelayedSuspense>
  );
}
