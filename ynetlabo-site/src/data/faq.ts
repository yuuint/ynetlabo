/**
 * よくあるお問い合わせ（/faq/）
 *
 * お問い合わせフォーム・メールで実際に届いた質問から作る。
 * 同じ質問が続いたら、ここに足す。アプリページの「よくある質問」（data/apps.ts の faq）は
 * 使う前の疑問、こちらは使っていて困ったときの疑問、と分けている。
 *
 * - `a` は HTML。自分たちで書く文だけを入れる（外から来た文をそのまま入れない）。
 * - 構造化データ（FAQPage）には `a` のタグを外した文が入る。
 * - `id` はページ内リンクのアンカー。公開後は変えない（返信メールにリンクを貼るため）。
 */

export type FaqItem = {
  readonly id: string;
  readonly q: string;
  readonly a: string;
};

export type FaqGroup = {
  readonly id: string;
  /** 見出し（サービス名） */
  readonly label: string;
  /** 使い方ガイドなど、あわせて案内するページ */
  readonly guide?: { readonly label: string; readonly href: string };
  readonly items: readonly FaqItem[];
};

const WARI_GUIDE = "/guide/wa-ri/";

export const FAQ_GROUPS: readonly FaqGroup[] = [
  {
    id: "wa-ri",
    label: "wa/ri（割り勘アプリ）",
    guide: { label: "wa/ri 使い方ガイド", href: WARI_GUIDE },
    items: [
      {
        id: "wari-room-missing",
        q: "ルームが急に見られなくなりました。元に戻せますか？",
        // 2026/2/26・2/27 のお問い合わせ
        // TODO（要確認）: 2026年2月のサーバー障害でルームを復元できなかった件に、ここで触れるか。
        a: `
<p>まず、次のどれに当てはまるかを確かめてください。</p>
<ul>
  <li><strong>「表示しようとしているルームにアクセスできません」と出る</strong> … そのルームを見る権限がなくなっています。ルームのオーナーに招待リンクを送り直してもらってください。</li>
  <li><strong>アカウントを作らずに（ゲストのまま）使っていた</strong> … ゲストのデータはその端末の中だけにあり、一定期間で消えることがあります。ほかの端末やブラウザからは見られません。</li>
  <li><strong>招待された側だった</strong> … オーナーがルームを削除した可能性があります。オーナーに確かめてください。</li>
  <li><strong>「読み込めませんでした」と出る</strong> … 電波が弱いか、サーバーが混み合っています。電波の届く場所で「もう一度読み込む」を押してください。</li>
</ul>
<p>ルームの削除はオーナーだけができ、<strong>元に戻せません</strong>。削除されたルームを運営側で復元することもできません。</p>`,
      },
      {
        id: "wari-backup",
        q: "記録が消えたときのために、手元に残しておけますか？",
        // TODO（要確認）: 個別のバックアップ機能を予定しているなら、ここで触れる。
        a: `
<p>できます。割り勘結果の画面から <strong>CSV または PDF に書き出して</strong>、端末に保存できます（<a href="${WARI_GUIDE}#18-結果を共有するcsvpdfで残す">使い方ガイド 18章</a>）。</p>
<p>旅行や飲み会が終わったら、<strong>精算する前に一度書き出しておく</strong>のがおすすめです。万が一ルームが見られなくなっても、誰がいくら立て替えたかが手元に残ります。</p>`,
      },
      {
        id: "wari-change-device",
        q: "機種変更しても、ルームは残りますか？",
        a: `
<p><strong>アカウントを作っておけば残ります。</strong>新しい端末でログインすると、これまでのルームがそのまま開きます。</p>
<p>ゲストのまま使っていると、データは前の端末の中だけにあり、新しい端末には移せません。機種変更の<strong>前に</strong>、マイページでアカウントを作るか、LINE・Apple と連携しておいてください（<a href="${WARI_GUIDE}#23-アカウントの管理引き継ぎ退会">使い方ガイド 23章</a>）。</p>`,
      },
      {
        id: "wari-line-unlink",
        q: "LINE との連携を外したい",
        // 2026/11 のお問い合わせ
        // TODO（要確認）: 手順は iOS の LINE で確かめたもの。Android の LINE でも同じ場所か。
        a: `
<p>LINE アプリの設定から外せます。</p>
<ol>
  <li>LINE アプリで <strong>設定 → アカウント → 連動アプリ</strong> を開く</li>
  <li>一覧から <strong>「Y.Netlabo」</strong> を選ぶ</li>
  <li>連動を解除する</li>
</ol>
<p>外すのは、<strong>wa/ri に LINE でログインしていた本人の LINE アプリから</strong>です。家族や友だちが自分の LINE でログインしていた場合は、その人に外してもらってください。</p>
<p>LINE と連携したときに保存している情報は、<a href="/account/#stored-data">Y.NetLaboアカウント「アカウントに保存する情報」</a>にまとめています。</p>`,
      },
      {
        id: "wari-delete-account",
        q: "退会して、データを消したい",
        // 参加先ルームの記録を残すのは ynetlabo-api の退会処理（deleteWariContentsByOwnerAppUid）の動きどおり。
        // created_by は付け替えず、退会した人の ID のまま残る。
        a: `
<p>wa/ri の <strong>マイページ →「削除して退会」</strong> から退会できます。2段階の確認のあと削除され、<strong>元に戻せません。</strong></p>
<ul>
  <li><strong>自分がオーナーのルーム</strong> … ほかのメンバーが付けた記録も含めて、ルームごと削除されます。</li>
  <li><strong>招待されて参加していたルーム</strong> … ルームは自分の一覧から消えますが、<strong>そのルームに追加した記録は削除されません</strong>。記録を消すと、ほかのメンバーの割り勘の金額が変わってしまうためです。オーナーとほかのメンバーは、そのまま精算を続けられます。</li>
</ul>
<p>LINE でログインしていた場合は、</p>
<ol>
  <li>先に wa/ri で「削除して退会」をする</li>
  <li>そのあとで、LINE の連動アプリから「Y.Netlabo」を解除する（<a href="#wari-line-unlink">上の手順</a>）</li>
</ol>
<p>の順にすると、LINE から wa/ri に連携されていたユーザー名などの情報も含めて削除されます。</p>`,
      },
    ],
  },
  {
    id: "common",
    label: "お問い合わせについて",
    items: [
      {
        id: "how-to-contact",
        q: "お問い合わせのとき、何を書けばいいですか？",
        a: `
<ul>
  <li><strong>お問い合わせID</strong> … アプリのマイページ（アカウントメニュー）の下に出ています。タップでコピーできます。どのアカウントのことかがすぐ分かり、お返事が早くなります。</li>
  <li><strong>メールアドレス</strong> … フォームの「ご連絡先」は任意ですが、<strong>空のままだとお返事できません</strong>。お返事が必要なときは必ず入れてください。</li>
  <li><strong>ルームのことなら</strong>（wa/ri）… 共有リンク（<code>https://wa-ri.ynetlabo.net/share/…</code>）とルーム名があると調べやすくなります。</li>
</ul>
<p>パスワードは送らないでください。</p>`,
      },
    ],
  },
];

/** 構造化データ用に HTML を素の文にする */
export function faqPlainText(html: string): string {
  return html
    .replace(/<li>/g, "・")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}
