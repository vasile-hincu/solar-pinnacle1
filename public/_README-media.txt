Hero video assets

Place your seamless-loop hero video here:
- public/hero-drone.mp4  (recommended)
- public/hero-drone.webm (optional, improves compatibility/perf in some browsers)

The Home hero uses `src/pages/Index.tsx` + `src/components/SeamlessLoopVideo.tsx`.
If the video files are missing, the component will fall back to the poster image.

Tips:
- Keep it short (6–12s) and export as a looping clip.
- Aim for H.264 (mp4) + AAC or no audio.
- For webm: VP9/AV1, no audio.
