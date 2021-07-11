window.onload = () => {
	const components = document.querySelectorAll('.svelte-component')

	components.forEach(elem => {
		const name = elem.getAttribute('data-name')
		const parsed_props = JSON.parse(elem.getAttribute('data-props'))

		const props_to_watch = []

		for (const key of Object.keys(parsed_props))
			props_to_watch.push(key)

		const props = {
			"props_to_watch": props_to_watch ? props_to_watch:[],
			"component": name,
			"props": parsed_props ? parsed_props:{}
		}
		

		const svelte_app = require(`./svelte/${ name }`)
		if (!svelte_app) {
			return
		}

		const _app = new svelte_app.default({
			target: document.body,
			props: parsed_props,
		})
	})
}

export default null