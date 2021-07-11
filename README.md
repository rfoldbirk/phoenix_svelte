# Setup guide

Hej Jakob 👋

Version 16 af Nodejs fungerer åbenbart ikke med nogle af de dependencies som skal downloades 🤷‍♀️. Version 12 virker til gengæld.


--------------


Tilføj poison til `mix.exs`

```exs
defp deps do
  [
    # ...
    {:poison, "~> 3.1"}
  ]
end
```

Det er en god idé at skrive `mix deps.get` i den nærmeste terminal efter du har tilføjet den nye dependency.

Derefter skal du finde filen `lib/din_app_web/views/page_view.ex` og tilføje:

```ex
defmodule DinAppWeb.PageView do
  # ...
  def svelte(name, props) do
    id = generate_id(name)

    raw """
    <div 
      class="svelte-component"
      id=#{id}
      data-name=#{name}
      data-props=#{json(props)}
      >
    </div>
    """
  end


  defp json(props) do
    props
    |> Poison.encode
    |> case do
      {:ok, message} ->
        message
      {:error, reason} ->
        IO.inspect(reason)
        ""
    end
  end

  defp generate_id(name) do
    "svelte-#{name}-#{get_random_numbers()}"
  end

  defp get_random_numbers do
    Enum.random(0..1000000000000)
  end
end
```

--------------

Tilføj/erstat følgende filer i mappen `assets/`

1. [tsconfig.json](tsconfig.json)
2. [package.json](package.json)
3. [webpack.config.js](webpack.config.js)
4. [js/sveltegen.js](sveltegen.js)


Derefter skal du tilføje
```js
import sveltegen from "./sveltegen"
```
til `assets/js/app.js`


Til sidst skal du bare tilføje mappen svelte: `assets/js/svelte`


--------
# Eksempel

`assets/js/svelte/test.svelte`
```svelte
<script lang="ts">
  export let count: number
</script>

<p> { count } </p>

<style lang="scss">
  # ...
</style>
```


`lib/din_app_web/templates/page/index.html.eex`
```eex
# ...
<%= svelte("test", %{count: 3}) %>
# ...
```
