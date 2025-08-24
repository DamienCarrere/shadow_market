export function makeNode({
	type = "",
	content = "",
	parent = document.body,
	refParent = null,
	className = "",
	id = "",
	attributes = {},
	events = {},
} = {}) {
	const element = document.createElement(type);

	if (content) element.textContent = content;

	if (className) element.className = className;
	if (id) element.id = id;

	Object.entries(attributes).forEach(([key, value]) => {
		element.setAttribute(key, value);
	});

	Object.entries(events).forEach(([event, handler]) => {
		element.addEventListener(event, handler);
	});

	if (refParent) {
		parent.insertBefore(element, refParent);
	} else {
		parent.appendChild(element);
	}

	return element;
}
