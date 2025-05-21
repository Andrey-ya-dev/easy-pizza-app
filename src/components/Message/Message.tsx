import type { PropsWithChildren } from "react";

import { Title } from "../Typography";

interface MessageProps extends PropsWithChildren {
  className?: string;
}

export function Message({ children }: MessageProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        gridColumn: "span 2",
        display: "flex",
        justifyContent: "center",
        fontSize: "22px",
        color: "lightgrey",
      }}
    >
      <Title>{children}</Title>
    </div>
  );
}
