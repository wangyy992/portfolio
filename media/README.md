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
