##  Installation

Install the plugin with npm:
```shell
npm install --save bastidest-vue-json-tree-view
```

Then, in your Application JavaScript, add:
```javascript
import TreeView from 'bastidest-vue-json-tree-view';
Vue.use(TreeView);
```

Done.

## Usage

Put the `tree-view` element into your  HTML where you want the Tree View to appear.
```html
<div>
  <tree-view :data="jsonSource" :options="{maxDepth: 3}"></tree-view>
</div>
```

## Props

#### `data`

The JSON to be displayed. Expects a valid JSON object.

#### `options`

The defaults are:
```
{
  maxDepth: 4,
  rootObjectKey: "root",
  modifiable: false
}
```
- maxDepth: The maximum number of levels of the JSON Tree that should be expanded by default. Expects an Integer from 0 to Infinity.
- rootObjectKey: the name of the Root Object, will default to `root`
- modifiable: To modify the json value. 

## Event

#### updated json data
If `modifiable` is true and you want to take the updated json data, you must register event handler as `v-on:change-data=...`. Only one argument is passed that is updated data - `data`.
```html
<div>
  <tree-view :data="jsonSource" :options="{modifiable: true}" @change-data="onChangeData"></tree-view>
</div>

// in your vue code
  ...
  methods: {
    onChangeData: function(data) {
      console.log(JSON.stringify(data))
    }
  },
  ...

```


## Custom Styling

All leaves will have their type indicated as a CSS class, like `tree-view-item-value-string`. Supported types: String, Number, Function, Boolean and Null Values.


## Changelog

- 1.0.0: Initial Release
