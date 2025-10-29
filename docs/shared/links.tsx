import { getCustomMDXComponent } from "@rspress/core/theme";

interface Props {
  codeUrl: string;
  docsUrl: string;
  mui?: { title: string; url: string };
}

const components = getCustomMDXComponent();
const Link = components.a;
const List = components.ul;
const ListItem = components.li;

export default function Links(props: Props) {
  const githubRootUrl =
    "https://github.com/unimorphic/adaptive-material-ui/tree/master";
  const muiRootUrl = "https://mui.com/material-ui/";

  return (
    <List>
      <ListItem>
        Component Source&nbsp;
        <Link href={`${githubRootUrl}/src/${props.codeUrl}`} target="_blank">
          {props.codeUrl.substring(props.codeUrl.lastIndexOf("/") + 1)}
        </Link>
      </ListItem>
      <ListItem>
        Doc Source&nbsp;
        <Link
          href={`${githubRootUrl}/docs/pages/docs/${props.docsUrl}`}
          target="_blank"
        >
          {props.docsUrl.substring(props.docsUrl.lastIndexOf("/") + 1)}
        </Link>
      </ListItem>
      {props.mui ? (
        <ListItem>
          MUI&nbsp;
          <Link href={`${muiRootUrl}${props.mui.url}`} target="_blank">
            {props.mui.title}
          </Link>
        </ListItem>
      ) : null}
    </List>
  );
}
