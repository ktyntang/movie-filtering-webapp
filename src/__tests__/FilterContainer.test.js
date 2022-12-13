import { render, screen, waitFor } from "@testing-library/react";
import FilterContainer from "../components/FilterContainer";
import userEvent from "@testing-library/user-event";

const mockHandleClick = jest.fn();

// -----------------------------------------------------------------------

describe("FILTER BUTTON TOGGLE", () => {
	test("when clicked once, renders filter menu", () => {
		render(
			<FilterContainer
				defaultYears={["2003", "2018"]}
				yearInput={[]}
				yearChangeHandler={mockHandleClick}
				defaultGenres={["a", "b", "c"]}
				genreInput={["a"]}
				genreChangeHandler={mockHandleClick}
			/>
		);
		expect.assertions(1);
		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		expect(screen.getByTitle("filter-menu")).toBeInTheDocument();
	});

	test("when clicked twice, closes filter menu", async () => {
		render(
			<FilterContainer
				defaultYears={["2003", "2018"]}
				yearInput={[]}
				yearChangeHandler={mockHandleClick}
				defaultGenres={["a", "b", "c"]}
				genreInput={["a"]}
				genreChangeHandler={mockHandleClick}
			/>
		);

		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		await waitFor(() => {
			expect(screen.queryByTitle("filter-menu")).toBeNull();
		});
	});

	test("when clicked thirce, renders filter menu", () => {
		render(
			<FilterContainer
				defaultYears={["2003", "2018"]}
				yearInput={[]}
				yearChangeHandler={mockHandleClick}
				defaultGenres={["a", "b", "c"]}
				genreInput={["a"]}
				genreChangeHandler={mockHandleClick}
			/>
		);
		expect.assertions(1);
		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		userEvent.click(screen.getByTitle("toggle-filter-menu"));
		expect(screen.getByTitle("filter-menu")).toBeInTheDocument();
	});
});
