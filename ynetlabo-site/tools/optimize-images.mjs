/**
 * public/images/ のラスタ画像から WebP を作る。
 *
 *   npm run images          変換されていないものだけ作る
 *   npm run images -- --force   すべて作り直す
 *
 * 記事のヒーロー画像は 1600px 幅のまま置かれていて、実際の表示枠は
 * カードで 418px・記事詳細で最大 1152px。転送量の 95% を画像が占めていたため、
 * 表示幅に合わせた WebP を 2 サイズ用意して srcset で出し分ける。
 * 元の JPEG / PNG は <picture> のフォールバックとして残す（消さない）。
 *
 * 変換には cwebp（Google の WebP ツール）を使う。入っていなければ
 * `brew install webp`。生成物は元ファイルの隣に置く:
 *   hero-186.jpg → hero-186-640.webp / hero-186-1280.webp
 */
import { readdir, stat, access } from "node:fs/promises";
import { execFile } from "node:child_process";
import { dirname, join, resolve, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(execFile);

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const imagesRoot = join(siteRoot, "public/images");

/** srcset に出す幅。小さい方はカード用、大きい方は記事詳細のヒーロー用 */
export const WIDTHS = [640, 960, 1280];
const QUALITY = 78;
/** これより小さいファイルは変換しない（アプリアイコン等は元のままで十分軽い） */
const MIN_BYTES = 60 * 1024;

const force = process.argv.includes("--force");

const exists = (p) =>
  access(p).then(
    () => true,
    () => false
  );

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

/** cwebp があるか確認する。無ければ何が必要か伝えて止める */
try {
  await exec("cwebp", ["-version"]);
} catch {
  console.error(
    "[images] cwebp が見つかりません。`brew install webp` を実行してください。"
  );
  process.exit(1);
}

let made = 0;
let skipped = 0;
let savedBytes = 0;

for await (const file of walk(imagesRoot)) {
  const ext = extname(file).toLowerCase();
  if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

  const size = (await stat(file)).size;
  if (size < MIN_BYTES) {
    skipped++;
    continue;
  }

  const stem = join(dirname(file), basename(file, extname(file)));
  for (const w of WIDTHS) {
    const out = `${stem}-${w}.webp`;
    if (!force && (await exists(out))) {
      skipped++;
      continue;
    }
    // -resize <w> 0 は「幅を w に、高さは比率維持」。元より大きくは拡大しない
    await exec("cwebp", [
      "-quiet",
      "-q",
      String(QUALITY),
      "-resize",
      String(w),
      "0",
      file,
      "-o",
      out,
    ]);
    const outSize = (await stat(out)).size;
    made++;
    if (w === WIDTHS[0]) savedBytes += size - outSize;
    console.log(
      `  ${basename(out)}  ${Math.round(outSize / 1024)} KB` +
        `  (元 ${basename(file)} ${Math.round(size / 1024)} KB)`
    );
  }
}

console.log(
  `[images] ${made} 件生成 / ${skipped} 件スキップ` +
    (made ? ` — 一覧表示ぶんで約 ${Math.round(savedBytes / 1024)} KB 削減` : "")
);
