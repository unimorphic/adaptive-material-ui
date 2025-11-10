import { svgIconClasses } from "@mui/material/SvgIcon";

export function IosCheckedIcon() {
  return (
    <div className={svgIconClasses.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.83em"
        height="0.83em"
        viewBox="0 0 20 20"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M10.6461792,0.119820016 C11.0022676,0.346673312 11.1070333,0.819240884 10.88018,1.17532923 L5.59004012,9.47918548 C5.44456028,9.70754308 5.19802823,9.83254199 4.94596825,9.83309245 C4.59813173,9.83364386 4.39457446,9.67360825 4.28105047,9.53831563 L1.17887189,5.84128316 C0.907480501,5.5178515 0.949667479,5.03565214 1.27309914,4.76426075 C1.59653081,4.49286936 2.07873017,4.53505633 2.35012156,4.858488 L4.8346263,7.81909046 L9.59067001,0.353820775 C9.81752331,-0.00226757161 10.2900909,-0.10703328 10.6461792,0.119820016 Z"
          transform="translate(4 5.483)"
        />
      </svg>
    </div>
  );
}

export function IosIndeterminateIcon() {
  return (
    <div className={svgIconClasses.root}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="0.83em"
        height="0.83em"
        viewBox="0 0 20 20"
      >
        <line
          x1="2"
          y1="10.5"
          x2="18"
          y2="10.5"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function IosUncheckedIcon() {
  return <div className={svgIconClasses.root} />;
}
