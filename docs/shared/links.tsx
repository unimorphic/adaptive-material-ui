import Stack from "@mui/material/Stack";
import { getCustomMDXComponent } from "rspress/theme";

interface Props {
  codeUrl: string | string[];
  docsUrl: string;
  mui?: { title: string; url: string };
}

const components = getCustomMDXComponent();
const Link = components.a;
const List = components.ul;
const ListItem = components.li;

export default function Links(props: Props) {
  const githubRootUrl =
    "https://github.com/unimorphic/adaptive-material-ui/blob/master";
  const muiRootUrl = "https://mui.com/material-ui/";

  return (
    <List>
      <ListItem>
        Component Source&nbsp;
        <Stack direction="row" spacing={1} sx={{ display: "inline" }}>
          {(Array.isArray(props.codeUrl) ? props.codeUrl : [props.codeUrl]).map(
            (url) => (
              <Link
                href={`${githubRootUrl}/src/${url}`}
                key={url}
                target="_blank"
              >
                {url.substring(url.lastIndexOf("/") + 1)}
              </Link>
            ),
          )}
        </Stack>
      </ListItem>
      <ListItem>
        Doc Source&nbsp;
        <Link
          href={`${githubRootUrl}/docs/pages/docs/${props.docsUrl}?plain=1`}
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
