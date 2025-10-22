interface Props {
  codeUrl: string;
  docsUrl: string;
  mui?: { title: string; url: string };
}

export default function Links(props: Props) {
  const githubRootUrl =
    "https://github.com/unimorphic/adaptive-material-ui/tree/master";
  const muiRootUrl = "https://mui.com/material-ui/";

  return (
    <ul className="list-disc pl-5 leading-7">
      <li className="[&:not(:first-child)]:mt-1">
        Component Source&nbsp;
        <a
          className="link_a7cea link_a9ef4 inline-link_f855c"
          href={`${githubRootUrl}/src/${props.codeUrl}`}
          target="_blank"
        >
          {props.codeUrl.substring(props.codeUrl.lastIndexOf("/") + 1)}
        </a>
      </li>
      <li className="[&:not(:first-child)]:mt-1">
        Doc Source&nbsp;
        <a
          className="link_a7cea link_a9ef4 inline-link_f855c"
          href={`${githubRootUrl}/docs/pages/docs/${props.docsUrl}`}
          target="_blank"
        >
          {props.docsUrl.substring(props.docsUrl.lastIndexOf("/") + 1)}
        </a>
      </li>
      {props.mui ? (
        <li className="[&:not(:first-child)]:mt-1">
          MUI&nbsp;
          <a
            className="link_a7cea link_a9ef4 inline-link_f855c"
            href={`${muiRootUrl}${props.mui.url}`}
            target="_blank"
          >
            {props.mui.title}
          </a>
        </li>
      ) : null}
    </ul>
  );
}
