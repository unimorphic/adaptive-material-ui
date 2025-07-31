import { ReactNode } from "react";

interface Props {
  items: ReactNode[];
}

export default function Adaptiveness(props: Props) {
  return (
    <div className="adaptiveness">
      <div>Adaptiveness</div>
      <ul className="list-disc pl-5 leading-7">
        {props.items.map((item, index) => (
          <li className="[&:not(:first-child)]:mt-1" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
