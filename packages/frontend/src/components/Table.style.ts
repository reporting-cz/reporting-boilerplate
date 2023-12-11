import { css } from "lit";

export default css`
	* {
		box-sizing: border-box;
	}

	:host {
		display: block;
	}

	table {
		font-family: Arial, Helvetica, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	table td, table th {
		border: 1px solid #ddd;
		padding: 2px;
	}

	table tr:nth-child(even) {
		background-color: #f2f2f2;
	}

	table tr:hover {
		background-color: #ddd;
	}

	table th {
		padding-top: 2px;
		padding-bottom: 2px;
		text-align: left;
		background-color: #04AA6D;
		color: white;
	}
`;
