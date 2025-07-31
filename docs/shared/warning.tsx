import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Warning(props: Props) {
  return (
    <div className="warning">
      <img src="/warning.svg" />
      {props.children}
    </div>
  );
}
