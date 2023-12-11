import { html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { TestRow } from "../types";
import style from "./App.style";

@customElement('bp-app')
export class App extends LitElement {

	static styles = [style];

	@state()
	data: TestRow[];

	@state()
	loading = false;

	_onClick = async () => {
		this.loading = true;
		const response = await fetch('/api/test');
		this.data = await response.json();
		this.loading = false;
	}

	render = () => html`
		<bp-header text="Hello World"></bp-header>
		<div>
			<div>
				<button @click="${this._onClick}">Load data</button>
			</div>
			<div>
				${this.loading ? html`loading...` : ''}
				${this.data ? html`
					<bp-table .data="${this.data}"></bp-table>
				` : ``}
			</div>
		</div>
	`;

}
