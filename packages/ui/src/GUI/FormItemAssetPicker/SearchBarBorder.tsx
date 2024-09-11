import React from "react";

import { styled } from "../../../design-system";

const StyledBorder = styled("div", {
  borderBottom: "1px solid transparent",
  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.3)"
});

function SearchBarBorder({ scrollingRef }: { scrollingRef: React.RefObject<HTMLDivElement> }) {
  const [visible, setVisible] = React.useState(scrollingRef.current && scrollingRef.current.scrollTop > 0);

  React.useEffect(() => {
    if (scrollingRef.current) {
      const scrollElement = scrollingRef.current;
      const scrollHandler = () => {
        if (scrollElement && scrollElement.scrollTop > 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      };
      scrollElement.addEventListener("scroll", scrollHandler);
      return () => {
        scrollElement.removeEventListener("scroll", scrollHandler);
      };
    }
  }, [scrollingRef]);

  return visible ? <StyledBorder /> : null;
}

export { SearchBarBorder };
