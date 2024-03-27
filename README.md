# deno-satori-example

The example of creating SVG file using satori in Deno.

## Environments

- Deno 1.41.3
- React 18.2.0
- [satori](https://www.npmjs.com/package/satori) 0.10.13

The script uses Morisawa BIZ UDGothic to create SVG file.

- [Morisawa BIZ UDGothic](https://github.com/googlefonts/morisawa-biz-ud-gothic)

## Usage

Run the following command to create an SVG file in `./out` directory.

```bash
$ deno task run
Task run deno run --allow-env --allow-net --allow-write --allow-read --allow-run main.tsx
Downloading font...
Archive:  ./tmp/out.zip
  inflating: ./tmp/BIZUDPGothic-Regular.ttf  
  inflating: ./tmp/BIZUDGothic-Bold.ttf  
  inflating: ./tmp/BIZUDPGothic-Bold.ttf  
  inflating: ./tmp/BIZUDGothic-Regular.ttf  
Creating SVG...
SVG created successfully. Output: ./out/output.svg
```

## License

[MIT License](LICENSE)

## Author

[toms74209200](<https://github.com/toms74209200>)
