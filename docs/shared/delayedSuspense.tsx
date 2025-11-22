import {
  DetailedHTMLProps,
  HTMLAttributes,
  Suspense,
  SuspenseProps,
  useEffect,
  useState,
} from "react";

interface DelayedSuspenseProps extends SuspenseProps {
  /**
   * The duration to delay before showing the fallback
   */
  delayMilliseconds?: number;

  /**
   * Props to apply to the placeholder div that's rendered before the fallback
   */
  placeholderProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >;
}

function TimedFallback(props: {
  children: React.ReactNode;
  delayMilliseconds?: number;
  placeholderProps?: DelayedSuspenseProps["placeholderProps"];
}) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setTimedOut(true);
    }, props.delayMilliseconds ?? 500);

    return () => window.clearTimeout(timeout);
  }, [props.delayMilliseconds]);

  if (timedOut) {
    return props.children;
  }

  return <div {...props.placeholderProps} />;
}

/**
 * Delay rendering the fallback to minimize flashing
 */
export default function DelayedSuspense(props: DelayedSuspenseProps) {
  const { delayMilliseconds, fallback, placeholderProps, ...otherProps } =
    props;

  return (
    <Suspense
      fallback={
        <TimedFallback
          delayMilliseconds={delayMilliseconds}
          placeholderProps={placeholderProps}
        >
          {fallback}
        </TimedFallback>
      }
      {...otherProps}
    />
  );
}
