/**
 * assets.js — MIDNIGHT DEFENSE
 * 画像アセット管理・プリロード ＋ SE/BGM管理
 */

const Assets = (() => {
  // ─────────────────────────────────────────────
  // 画像アセット定義マップ  key → 相対パス
  // ─────────────────────────────────────────────
  const MANIFEST = {
    // ■ enemies
    'fruit.png'         : 'assets/enemies/fruit.png',
    'soda_ice.png'      : 'assets/enemies/soda_ice.png',
    'macaron.png'       : 'assets/enemies/macaron.png',
    'pudding.png'       : 'assets/enemies/pudding.png',
    'shortcake.png'     : 'assets/enemies/shortcake.png',
    'bread.png'         : 'assets/enemies/bread.png',
    'onigiri.png'       : 'assets/enemies/onigiri.png',
    'pasta.png'         : 'assets/enemies/pasta.png',
    'hamburger.png'     : 'assets/enemies/hamburger.png',
    'shoyu_ramen.png'   : 'assets/enemies/shoyu_ramen.png',
    'butter.png'        : 'assets/enemies/butter.png',
    'french_fries.png'  : 'assets/enemies/french_fries.png',
    'steak.png'         : 'assets/enemies/steak.png',
    'karaage.png'       : 'assets/enemies/karaage.png',
    'backfat_ramen.png' : 'assets/enemies/backfat_ramen.png',
    'beer.png'          : 'assets/enemies/beer.png',
    'wine.png'          : 'assets/enemies/wine.png',
    'tequila.png'       : 'assets/enemies/tequila.png',
    'cheese_plate.png'  : 'assets/enemies/cheese_plate.png',
    'pizza.png'         : 'assets/enemies/pizza.png',

    // ■ items
    'item_dumbbell.png' : 'assets/items/item_dumbbell.png',
    'item_macho.png'    : 'assets/items/item_macho.png',

    // ■ ui
    'title_bg'          : 'assets/backgrounds/title_bg.webp',
    'title_logo'        : 'assets/ui/title_logo.png',
    'result_bg'         : 'assets/backgrounds/result_bg.webp',
    'rank_S'            : 'assets/ui/rank_S.png',
    'rank_A'            : 'assets/ui/rank_A.png',
    'rank_B'            : 'assets/ui/rank_B.png',
    'rank_C'            : 'assets/ui/rank_C.png',
    'stage1_tutorial'   : 'assets/ui/stage1_tutorial.png',
    'stage1_rule'        : 'assets/ui/stage1_rule.png',
    'stage2_tutorial'   : 'assets/ui/stage2_tutorial.png',
    'stage3_tutorial'   : 'assets/ui/stage3_tutorial.png',
    'stage4_tutorial'   : 'assets/ui/stage4_tutorial.png',
    'endless_tutorial_01': 'assets/ui/endless_tutorial_01.png',
    'endless_tutorial_02': 'assets/ui/endless_tutorial_02.png',
    'endless_tutorial_03': 'assets/ui/endless_tutorial_03.png',
    'endless_result'    : 'assets/ui/endless_result.png',

    // ■ player
    'player_ship'       : 'assets/player/player_ship.png',

    // ■ backgrounds
    'stage_bg'          : 'assets/backgrounds/stage_bg.webp',
  };

  const _cache = {};
  let _loaded = false;

  function load() {
    if (_loaded) return Promise.resolve();
    const entries = Object.entries(MANIFEST);
    let done = 0;
    const total = entries.length;
    const promises = entries.map(([key, path]) =>
      new Promise(resolve => {
        const img = new Image();
        img.onload = () => { _cache[key] = img; done++; resolve(); };
        img.onerror = () => {
          console.error(`[Assets] 画像ロード失敗: ${path} (key="${key}")`);
          _cache[key] = null;
          done++;
          resolve();
        };
        img.src = path;
      })
    );
    return Promise.all(promises).then(() => {
      _loaded = true;
      const ok   = Object.values(_cache).filter(Boolean).length;
      const fail = total - ok;
      console.log(`[Assets] プリロード完了: ${ok}/${total} OK${fail ? `, ${fail} 件失敗` : ''}`);
    });
  }

  function get(key) {
    if (!(key in _cache)) return null;
    return _cache[key];
  }

  function src(key) {
    return MANIFEST[key] || '';
  }

  function isLoaded() {
    return _loaded;
  }

  return { load, get, src, isLoaded };
})();


// ─────────────────────────────────────────────────────────────────
// SE / BGM 管理
// ─────────────────────────────────────────────────────────────────

const Sound = (() => {

  // ── SE定義 ───────────────────────────────────
  // key: 呼び出しキー,  file: パス,  vol: 音量(0.0〜1.0)
  const SE_DEF = {
    // UI
    next         : { file: 'assets/sound/se/se_next.wav',        vol: 0.7 },
    back         : { file: 'assets/sound/se/se_back.wav',        vol: 0.7 },

    // ゲーム状態
    rush_start   : { file: 'assets/sound/se/se_rush_start.wav',  vol: 0.9 },
    clear        : { file: 'assets/sound/se/se_clear.wav',       vol: 1.0 },
    gameover     : { file: 'assets/sound/se/se_gameover.wav',    vol: 1.0 },

    // ゲームプレイ
    shield       : { file: 'assets/sound/se/se_shield.wav',      vol: 0.8 },
    heal         : { file: 'assets/sound/se/se_heal.wav',        vol: 0.8 },
    kill         : { file: 'assets/sound/se/se_kill.wav',        vol: 0.6 },

    // マッチョマン
    macho_start  : { file: 'assets/sound/se/se_macho_start.wav', vol: 0.9 },
    macho_bomb   : { file: 'assets/sound/se/se_macho_bomb.wav',  vol: 1.0 },

    // コンボ（レベル別）
    combo_1      : { file: 'assets/sound/se/se_combo_1.wav',     vol: 0.7 },
    combo_2      : { file: 'assets/sound/se/se_combo_2.wav',     vol: 0.75 },
    combo_3      : { file: 'assets/sound/se/se_combo_3.wav',     vol: 0.8 },
    combo_4      : { file: 'assets/sound/se/se_combo_4.wav',     vol: 0.85 },
    combo_5      : { file: 'assets/sound/se/se_combo_5.wav',     vol: 0.9 },
    combo_6      : { file: 'assets/sound/se/se_combo_6.wav',     vol: 1.0 },
  };

  // ── BGM定義 ───────────────────────────────────
  const BGM_DEF = {
    // キーを追加するだけで後から管理できる
    // 例: stage: { file: 'assets/sound/bgm/bgm_stage.mp3', vol: 0.5, loop: true },
  };

  // ── 内部キャッシュ ────────────────────────────
  const _se  = {};   // key → Audio
  const _bgm = {};   // key → Audio
  let _seEnabled  = true;
  let _bgmEnabled = true;

  // ── SE: 初期化 ────────────────────────────────
  function _initSE() {
    Object.entries(SE_DEF).forEach(([key, def]) => {
      const audio = new Audio(def.file);
      audio.volume  = def.vol;
      audio.preload = 'auto';
      _se[key] = audio;
    });
  }

  // ── BGM: 初期化 ───────────────────────────────
  function _initBGM() {
    Object.entries(BGM_DEF).forEach(([key, def]) => {
      const audio = new Audio(def.file);
      audio.volume = def.vol;
      audio.loop   = def.loop !== false;
      audio.preload = 'auto';
      _bgm[key] = audio;
    });
  }

  /**
   * SE を再生する
   * 連打対応: currentTime をリセットして即再生
   * @param {string} key  SE_DEF のキー
   */
  function se(key) {
    if (!_seEnabled) return;
    const audio = _se[key];
    if (!audio) {
      console.warn(`[Sound] SE "${key}" が見つかりません`);
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});  // autoplay制限を無視
  }

  /**
   * コンボレベルに応じたSEを再生する
   * @param {number} combo  現在のコンボ数
   */
  function seCombo(combo) {
    if (combo <= 1)      se('combo_1');
    else if (combo <= 2) se('combo_2');
    else if (combo <= 3) se('combo_3');
    else if (combo <= 4) se('combo_4');
    else if (combo <= 5) se('combo_5');
    else                 se('combo_6');
  }

  /**
   * BGM を再生する
   * @param {string} key  BGM_DEF のキー
   */
  function bgmPlay(key) {
    if (!_bgmEnabled) return;
    const audio = _bgm[key];
    if (!audio) {
      console.warn(`[Sound] BGM "${key}" が見つかりません`);
      return;
    }
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }

  /**
   * BGM を停止する
   * @param {string} key  BGM_DEF のキー
   */
  function bgmStop(key) {
    const audio = _bgm[key];
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
  }

  /**
   * 全BGMを停止する
   */
  function bgmStopAll() {
    Object.values(_bgm).forEach(a => { a.pause(); a.currentTime = 0; });
  }

  // ── ミュート制御 ──────────────────────────────
  function setSEEnabled(v)  { _seEnabled  = v; }
  function setBGMEnabled(v) { _bgmEnabled = v; if (!v) bgmStopAll(); }

  // ── 初期化実行 ────────────────────────────────
  _initSE();
  _initBGM();

  return { se, seCombo, bgmPlay, bgmStop, bgmStopAll, setSEEnabled, setBGMEnabled };
})();
