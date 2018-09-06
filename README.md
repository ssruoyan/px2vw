# px2vw
A processor that transform px to viewport unit.


## Usage

### CLI

```
px2rem -o build ./**/*.css -w 750
```

```
Options:

    -v, -version             output the version number
    -w, --vw [value]         set vw unit value. default: 375 (default: 375)
    -p, --precision [value]  set value precision, default: 4 (default: 4)
    -o, --output [path]      set output path, overwrite the input file by default
    -l, --list [value]       set px2vw white list
    -m, --media [value]      set whether to ignore media query (default: true)
    -h, --help               output usage information

Examples:

    $ px2vw ./**/*.css -w 375
    $ px2vw -h
```


### API

const Px2vw = require('px2vw')
const px2vw = new Px2vw(config)
const cssText = 'body { font-size: 375px }'
const newText = px2vw.processCss(cssText)

// 'body { font-size: 100vw }'