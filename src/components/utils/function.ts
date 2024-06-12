import { VariablesColors } from "@/styles/Variables.colors";

const { whiteColor } = new VariablesColors();

/**
 * Returns the style container with the specified color.
 *
 * @param color - The color of the box container.
 * @returns The style object for the box container.
 */
export const styleBoxContainer = (color: string) => {
  return {
    p: 2,
    mt: 3,
    backgroundColor: whiteColor,
    borderTop: `2px solid ${color}`,
  };
};
