interface Props {
  codeUrl: string;
  docsUrl: string;
}

export default function SourceLinks(props: Props) {
  const rootUrl =
    "https://github.com/unimorphic/adaptive-material-ui/tree/master";

  return (
    <div className="source-links">
      <div>
        <a href={`${rootUrl}/src/${props.codeUrl}`} target="_blank">
          Source Code
        </a>
      </div>
      <div>
        <a href={`${rootUrl}/docs/pages/docs/${props.docsUrl}`} target="_blank">
          Doc Source
        </a>
      </div>
    </div>
  );
}
