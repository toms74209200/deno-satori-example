import React from "react";
import satori from "satori";
import { decompress } from "zip";
import { readAll } from "std/io/read_all.ts";
import { download } from "download";

const DOWNLOAD_DIR = "./tmp";
const FONT_URL =
  "https://github.com/googlefonts/morisawa-biz-ud-gothic/releases/download/v1.051/BIZUDGothic.zip";
const USE_FONT = "BIZUDPGothic-Regular";
const OUTPUT_SVG = "./out/output.svg";

const main = async () => {
  console.log("Downloading font...");
  await downloadFont({ url: FONT_URL, downloadDir: DOWNLOAD_DIR }).catch(
    (e) => {
      Promise.reject(e);
    },
  );

  const fontBuf = await loadFont({
    fontPath: `${DOWNLOAD_DIR}/${USE_FONT}.ttf`,
  }).catch((e) => {
    return Promise.reject(e);
  });

  console.log("Creating SVG...");
  const svg = await satori(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        fontSize: 32,
      }}
      lang="ja-JP"
    >
      <div>あのイーハトーヴォのすきとおった風</div>
    </div>,
    {
      width: 600,
      height: 400,
      fonts: [{
        name: USE_FONT,
        data: fontBuf,
      }],
    },
  );

  await Deno.writeTextFile(OUTPUT_SVG, svg).catch((e) => {
    return Promise.reject(e);
  });
  console.log(`SVG created successfully. Output: ${OUTPUT_SVG}`);
};

/**
 * Download zip archive of fonts and extract it.
 * @param url
 * @param downloadDir
 * @returns extracted directory path
 */
const downloadFont = async (
  { url, downloadDir }: { url: string; downloadDir: string },
): Promise<string> => {
  const zipPath = "out.zip";
  await download(url, {
    dir: downloadDir,
    file: zipPath,
  }).catch((e) => {
    return Promise.reject(e);
  });
  const destination = await decompress(`${downloadDir}/${zipPath}`, downloadDir)
    .catch(
      (e) => {
        return Promise.reject(e);
      },
    );
  await Deno.remove(`${downloadDir}/${zipPath}`).catch((e) => {
    return Promise.reject(e);
  });
  return destination
    ? destination
    : Promise.reject("Failed to extract archive.");
};

/**
 * Load font file.
 * @param fontPath font file path. For example, "./BIZUDGothic/BIZUDPGothic-Regular.ttf"
 * @returns buffer of font file
 */
const loadFont = async (
  { fontPath }: { fontPath: string },
): Promise<Uint8Array> => {
  const fontFile = await Deno.open(fontPath).catch(
    (e) => {
      return Promise.reject(e);
    },
  );
  const fontBuf = await readAll(fontFile).catch((e) => {
    return Promise.reject(e);
  });
  fontFile.close();
  return fontBuf;
};

await main().catch((e) => {
  console.error(e);
}).finally(async () => {
  await Deno.stat(DOWNLOAD_DIR).catch(() => false) &&
    await Deno.remove(DOWNLOAD_DIR, { recursive: true });
});
