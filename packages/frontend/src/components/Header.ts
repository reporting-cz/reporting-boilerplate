import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import style from "./Header.style";

@customElement('bp-header')
export class Header extends LitElement {

	static styles = [style];

	@property({ type: String })
	text = 'header';

	render = () => html`
		<h1>${this.text}</h1>
	`;

}
