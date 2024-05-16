import { render, screen } from "@testing-library/react";
import ProjectButton from "./ProjectButton";

test("render project button with text TaskFlow", () => {
    render(<ProjectButton text="TaskFlow" />);
    const button = screen.getByText(/taskflow/i);
    expect(button).toBeInTheDocument();
});
