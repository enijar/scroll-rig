# Scroll Rig

A React scroll rig for custom scroll bar styles and controlled scrolling state.

### Getting Started

Install the package:

```shell
npm add scroll-rig
```

**Basic Example**

A callback with the state object to do something with

```jsx
<ScrollRig
  // Do something when the scroll updates
  onScrollUpdate={(state) => console.log(state.progress.y)}
>
  components...
</ScrollRig>
```

**API Example**

Usage of the API via a ref. Call methods or read state from the API of the `ScrollRig`.

```jsx
function Example() {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    scrollRef.current.update();
  }, []);

  return (
    <ScrollRig
      ref={scrollRef}
      // Do something when the scroll updates
      onScrollUpdate={(state) => console.log(state.progress.y)}
    >
      components...
    </ScrollRig>
  );
}
```

**Important**

>Make sure the parent element for the `ScrollRig` has `overflow: hidden` on it or the `ScrollRig` won't work

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| onScrollUpdate | `(state) => {}` | `undefined` | Callback for every scroll event with current scroll state |
| native | `boolean` | `false` | When `true` will switch to the native browser scroll |
| scrollBarSize | `string` | `15px` | Size of the scrollbars |
| classNamePrefix | `string` | `scroll-rig` | Prefix for the classes on the scroll elements |
| controlled | `boolean` | `false` | If `true` will disable scroll until `api.update()` is called |

### API

| Prop | Type | Description |
| --- | --- | --- |
| update | `() => {}` | Update the scroll |
| onScroll | `(fn) => {}` | Callback function executed on every scroll event |
| state | `object` | State of the scroll rig |

### Contributing

Install and run the development server:

```shell
npm install
npm start
```
