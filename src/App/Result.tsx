import * as React from 'react';

import correctSelectionImages from "@Src/correctSelectionImageURLs";
import incorrectSelectionImages from "@Src/incorrectSelectionImageURLs";

type ResultProps = {
  result: boolean
};

const Result: React.FunctionComponent<ResultProps> = ({ result }: ResultProps) => {
  const imageURL: string = result
    ? correctSelectionImages[Math.floor(Math.random() * correctSelectionImages.length)]
    : incorrectSelectionImages[Math.floor(Math.random() * incorrectSelectionImages.length)];

  return (
    <div>
      The result is {String(result)}
      <img src={imageURL} />
    </div>
  )
}

export default Result;
