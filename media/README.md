# media

把每个项目的游玩录像和封面图放进这里，文件名要和 `index.html` 里的 `src` / `poster` 一致：

| 项目 | 视频 | 封面图 |
|---|---|---|
| 爱豆收集梦想生活 | `idol-life.mp4` | `idol-life.jpg` |
| AI 狼人杀 | `werewolf.mp4` | `werewolf.jpg` |
| 光与影 | `light-shadow.mp4` | `light-shadow.jpg` |
| ちいかわ 跑酷原型 | `chiikawa-runner.mp4` | `chiikawa-runner.jpg` |

录制建议：

- **比例 16:9**，1280×720 就够，卡片里实际显示宽度约 500px
- **时长 20–40 秒**，剪掉加载和菜单，直接进核心玩法
- **编码 H.264 + AAC，MP4 容器**，兼容性最好
- **单个文件控制在 5MB 以内**。GitHub 单文件上限 100MB，但作品集是给人打开就看的，超过 10MB 会明显卡顿
- **封面图**截视频里信息量最大的一帧，因为页面用了 `preload="none"`，访客点播放之前只会看到这张图

压缩命令（需要 ffmpeg）：

```
ffmpeg -i 原始录屏.mov -vf scale=1280:-2 -c:v libx264 -crf 28 -preset slow -an idol-life.mp4
ffmpeg -i idol-life.mp4 -ss 3 -vframes 1 -q:v 3 idol-life.jpg
```

`-an` 是去掉音轨。页面里视频默认静音，留着音轨只是白白增加体积；如果某个项目的音效本身是卖点，就去掉 `-an`，同时把 `index.html` 里那个 `<video>` 的 `muted` 删掉。

---

## 拆解配图

游戏官方 / 角色美术，用于游戏拆解文章的配图。

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `char-eggy.png` | 475×480 | 蛋仔派对 |
| `char-royal-match.png` | 463×480 | Royal Match |
| `char-rusty-lake.png` | 163×480 | 锈湖 |
| `char-status-ai.png` | 480×480 | Status AI |
| `char-status-ai-cut.png` | 430×480 | Status AI（另一版裁切） |
| `rusty-lake-hero.jpg` | 1536×1024 | 锈湖拆解页的头图背景（226KB，**页面实际引用的是这张**） |
| `rusty-lake-hero.png` | 1536×1024 | 上一行的无损源文件（2.3MB，页面未引用） |

版权归各游戏的开发商与发行商所有，此处仅作为评论性文章的配图使用。

## 策划案配图

| 文件 | 用途 | 说明 |
|---|---|---|
| `unlit-door-lumen.png` | 光与影 §09 | 取自 Unlit 仓库 `art/door-lumen.png`，未改动 |
| `unlit-door-umbra.png` | 光与影 §09 | 取自 Unlit 仓库 `art/door-umbra.png`，未改动 |
| `ghost-light.png` | 光与影 §01 | 光灵设定稿。原图抠图残留深灰边，已按 alpha≥250 取实心本体后重做抗锯齿边；光晕改由 CSS `drop-shadow` 绘制 |
| `ghost-shadow.png` | 光与影 §01 | 影灵设定稿，同上处理 |
| `werewolf-cast.jpg` | AI 狼人杀 §02 | 12 人立绘。原图 2752×1536 / 2350 KB，压缩为 1600×893 / 172 KB |

以上四张角色图**均为设定稿，线上版本尚未接入**，各图注已注明。

### ちいかわ 跑酷配图

| 文件 | 用途 |
|---|---|
| `chiikawa-chiikawa.png` / `-hachiware.png` / `-usagi.png` | 页头三人组 + §素材表 |
| `chiikawa-coin.png` / `-weed.png` / `-mushroom.png` / `-chimera.png` | 素材表：金币、杂草、蘑菇、讨伐对象 |
| `chiikawa-meadow.jpg` | 页头底部草地背景条 |

原始压缩包内共 3890 KB（含 2009 KB 的 meadow PNG）。
七张精灵图经调色板量化（200 色，保留 alpha）压至 240 KB；
meadow 无透明通道、为照片式背景，转 JPEG 1400×933 / 106 KB。合计 3890 → 346 KB。

### AI 狼人杀 身份动画

`werewolf-role-{seer,witch,wolf,hunter,idiot,villager}.mp4` —— 六段身份揭晓短视频，
竖版 784×1172 / H.264，时长 3.1–4.1 秒，合计约 15 MB。

原文件名为中文（预言家.mp4 等），已改为 ASCII 并与游戏仓库
`public/videos/roles/` 下的命名对齐——中文路径在 URL 里需百分号编码，
部分 CDN 与代理处理不当。策划案第 05 节以 `preload="none"` 引用，
点击前不产生下载。

### 爱豆收集梦想生活 · Gemini 生成素材

| 文件 | 来源 | 处理 |
|---|---|---|
| `idol-city-map.jpg` | `idolTomodachiLifev2/public/maps/idol-city.png` | 原生 1536×1024 / 3.48 MB PNG → 1400×933 JPEG q80 / 400 KB |
| `idol-scene-*.webp`（6 张） | `idolTomodachiLifev2/public/scenes/*.webp` | 1920×1072 → 1200×670 WebP q82，合计 466 KB |

选取的六个地点：练习室、汉江（夜）、公司天台、演唱会现场、咖啡厅、商圈。
其中「晚上 / 汉江 / 天台」对应策划案第 07 节里程碑的触发条件。

游戏内每张场景另有 `*_blur.webp` 预模糊版（3–11 KB），
用作失焦背景层以避免对大图实时做 CSS blur，该做法写在策划案第 09 节。
