# Humanizer for Gemini CLI

The **Humanizer** extension for Gemini CLI is designed to strip away the "fingerprints" of AI-generated writing. It transforms verbose, sycophantic, and formulaic AI output into direct, natural, and human-sounding prose.

This extension is heavily based on the [Wikipedia "Signs of AI writing"](https://en.wikipedia.org/wiki/Wikipedia:WikiProject_AI_Cleanup/Signs_of_AI_writing) guide and the original `humanizer` skill for Claude.

## Installation

### For Gemini CLI
To install this extension in Gemini CLI, run:
```bash
gemini extensions install https://github.com/RealOrangeKun/humanizer
```

### For Antigravity CLI
To install this skill globally for **antigravity-cli**, run:
```bash
mkdir -p ~/.gemini/config/skills/humanizer
cp skills/humanizer/SKILL.md ~/.gemini/config/skills/humanizer/SKILL.md
```

Alternatively, to use it as a project-scoped workspace skill, create a `.agents` folder in your project and copy the skill there:
```bash
mkdir -p .agents/skills/humanizer
cp skills/humanizer/SKILL.md .agents/skills/humanizer/SKILL.md
```

## Usage

### For Gemini CLI
You can use the **Humanizer** in two ways:
1. **Slash Command**:
   ```bash
   /humanizer [Paste your text here]
   ```
2. **Autonomous Skill**: The skill is automatically detected. Just ask:
   - *"Can you humanize this text?"*

### For Antigravity CLI
In **antigravity-cli**, skills are automatically discovered and matched. Since custom slash commands (like `/humanizer`) are not natively supported, you can trigger it by asking the agent:
- *"Humanize this text: [Paste your text here]"*
- *"Rewrite this to sound more human."*

## How It Works

The extension audits text against 24 specific "AI fingerprints," including:
- **Vocabulary:** Removes words like *testament, landscape, showcasing, delve, additionally.*
- **Logic:** Fixes significance inflation and formulaic "pivotal moment" phrases.
- **Style:** Removes em-dash overuse, emojis, and sycophantic chatbot artifacts.

## Credits

This extension is adapted from the original [humanizer](https://github.com/blader/humanizer) project by **[blader](https://github.com/blader)**.

