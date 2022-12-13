import { render, screen } from "@testing-library/react";
import ErrorMessage from "../components/ErrorMessage";
import HeaderBar from "../components/HeaderBar";

test("header bar has 1 header", () => {
	render(<HeaderBar />);
	expect(screen.getAllByRole("heading").length).toEqual(1);
});

test("error message has 1 refresh button", () => {
	expect.assertions(2);
	render(<ErrorMessage />);
	expect(screen.getAllByRole("button").length).toEqual(1);
	expect(screen.getByRole("button")).toContainHTML("Refresh");
});
