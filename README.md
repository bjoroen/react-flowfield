<div align="center"><h1>React-Flowfield</h1></div>

![flowfieldPicture](example/pictures/flowfield.png 'head-img')

React-flowfield is a background component for react, it will give you a highly customizable component to make very creative backgrounds.

## Installation

Use the package manager [npm](https://npmjs.com) or [yarn](https://yarnpkg.com/) to install React-Flowfield.

To install with npm:

```bash
npm install react-flowfield
```

To install with yarn:

```bash
yarn add react-flowfield
```

## Usage

It works straight out the box, and will give you a white background with black particals as defualt. You can change the color of the particals and the background with props.

The background component will fill the parent component, it uses a html canvas. To place elements ontop of the background, the elements needs to have Position set to absolute.

```ts
import react from 'react';

const Component = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        top: 0,
        left: 0,
      }}
    >
      <FlowField style={{ position: 'absolute' }} lengthOfAnimation={1000} />
      <div
        style={{
          height: 'auto',
          width: '300px',
          backgroundColor: 'gray',
          position: 'absolute',
          left: '50%',
          top: '50%',
          textAlign: 'center',
        }}
      >
        <h1>Hello world</h1>
      </div>
    </div>
  );
};
```

The example above will create this effect:

![flowfieldGif](example/pictures/FlowFieldGif.gif 'Gif')

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
