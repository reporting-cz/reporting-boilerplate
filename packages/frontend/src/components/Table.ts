import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { map } from "lit/directives/map.js";
import { TestRow } from "../types";
import style from "./Table.style";

@customElement('bp-table')
export class Table extends LitElement {

	static styles = [style];

	@property({ type: Array })
	data: TestRow[];

	render = () => this.data ? html`
		<table>
			<thead>
				<tr>
					<th>IDZ</th>
					<th>NAME</th>
				</tr>
			</thead>
			<tbody>
				${map(this.data, row => html`
					<tr>
						<td>${row.IDZ}</td>
						<td>${row.NAME}</td>
					</tr>
				`)}
			</tbody>
		</table>
	` : '';

}
