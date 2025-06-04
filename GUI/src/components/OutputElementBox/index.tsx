import type { CSSProperties, FC } from 'react';
import { Box } from 'components';

type OutputElementBoxProps = {
  readonly text: string;
  readonly color?: 'green' | 'yellow';
  readonly draggable?: boolean;
};

export const OutputElementBox: FC<OutputElementBoxProps> = ({
  text,
  color = 'green',
  draggable = true,
}) => {
  const style: CSSProperties = {
    borderRadius: 46,
    paddingTop: 1.5,
    paddingBottom: 1.5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
  };

  return (
    <Box
      color={color}
      draggable={draggable}
      onDragStart={(event) => event.dataTransfer.setData('text/plain', text)}
      style={style}
    >
      {text}
    </Box>
  );
};
