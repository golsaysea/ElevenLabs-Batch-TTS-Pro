# ElevenLabs Batch TTS Pro (ElevenLabs 鎵归噺璇煶鐢熸垚鎻掍欢)

Chrome Manifest V3 extension for ElevenLabs batch text-to-speech synthesis, multi-key load balancing, smart duration estimation, automatic >3-minute 2-part splitting, AI sound effects / BGM generation, and duplicate voice cleanup.

## Packages

- packages/elevenlabs-batch-pro: Load-Balanced Multi-Key Pool Edition (7.7.0)
- packages/elevenlabs-batch-standard: Standard Multi-Key Edition (6.6.0)

## Key Features

- **Multi-API Load Balancing & Failover**: Automatically routes batch tasks across API keys, prioritizing system-voice keys and protecting custom voice credits.
- **First-Sentence Instant Preview (馃攰 璇曞惉棣栧彞)**: Auditions only the first sentence with local memory caching.
- **Smart Duration & Auto 2-Part Split (鉁傦笍 瓒?鍒嗛挓鑷姩鍒?娈礰)**: Punctuation-aware speech duration estimation and semantic boundary splitting.
- **Voice Cleanup & Deduplication (馃Ч 娓呯悊澹伴煶)**: Automatically groups duplicate-named voices, keeps 1 primary copy, and cleans up extra copies from cloud/local list.
- **AI Studio Tools (馃О 鍏朵粬宸ュ叿)**: Sound Effects, default BGM music generation, Speech-to-Speech, Audio Isolation, and Speech-to-Text.