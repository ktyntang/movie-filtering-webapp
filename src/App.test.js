import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

const movieListMock = [
	[
		{
			name: "Deadpool",
			productionYear: 2016,
			genre: "Action",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "Barnyard",
			productionYear: 2006,
			genre: "Animation",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "Duplex",
			productionYear: 2003,
			genre: "Comedy",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "127 Hours",
			productionYear: 2010,
			genre: "Adventure",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "Tomorrowland",
			productionYear: 2015,
			genre: "Action",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "After Earth",
			productionYear: 2013,
			genre: "Fantasy",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "Alice in Wonderland",
			productionYear: 2010,
			genre: "Comedy",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
		{
			name: "Mowgli",
			productionYear: 2018,
			genre: "Adventure",
			synopsisShort: "",
			synopsis: "",
			image: "",
		},
	],
];

// test('show filter menu when user clicks filter button',()=>{

// })
