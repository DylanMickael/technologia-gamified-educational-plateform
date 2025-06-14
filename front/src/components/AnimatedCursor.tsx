import React from 'react';
import { useAnimatedCursor } from '../hooks/useAnimatedCursor';

interface AnimatedCursorProps {
  selector?: string;
  cursor: string;
  darkCursor?: string;
}

export const AnimatedCursor: React.FC<AnimatedCursorProps> = ({
  selector = '.cursor-target',
  cursor,
  darkCursor
}) => {
  
  useAnimatedCursor(selector, cursor, darkCursor);

  return null;
};

export default React.memo(AnimatedCursor);