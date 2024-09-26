import type { Meta, StoryObj } from "@storybook/react";
import { SelectInput } from "../SelectInput";

const meta = {
  title: "Commons/BasicInputs/SelectInput",
  component: SelectInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SelectInput>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Select: Story = {
  args: {
    options: [
      { value: "apple", label: "Apple" },
      { value: "mountain", label: "Mountain" },
      { value: "ocean", label: "Ocean" },
      { value: "whisper", label: "Whisper" },
      { value: "butterfly", label: "Butterfly" },
      { value: "galaxy", label: "Galaxy" },
      { value: "harmony", label: "Harmony" },
      { value: "puzzle", label: "Puzzle" },
      { value: "symphony", label: "Symphony" },
      { value: "labyrinth", label: "Labyrinth" },
    ],
  },
};