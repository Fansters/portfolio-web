import * as React from "react";
import { useMotionValue, Reorder } from "framer-motion";

interface Props {
  item: string;
}

export const Item = ({ item }: Props) => {
  const y = useMotionValue(0);

  return (
    <Reorder.Item value={item} id={item} style={{ y }}>
      <span>{item}</span>
    </Reorder.Item>
  );
};
