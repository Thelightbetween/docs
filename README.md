# The Light Between Oracle - Talking Avatar Guides

A revolutionary spiritual guidance platform featuring AI-powered talking avatars with unique voices and personalities. Experience personalized wisdom through immersive conversations with five distinct Oracle guides.

## ✨ Features

- **5 Unique Oracle Guides** with distinct personalities and expertise
- **ElevenLabs Voice Integration** for lifelike speech synthesis
- **Speech Recognition** for natural voice conversations
- **Responsive Design** optimized for all devices
- **Real-time Conversations** with personalized responses
- **Elegant UI** with mystical animations and effects

## 🌟 Oracle Guides

1. **Kundali** - Chakra Alchemist (Energy healing & chakra balancing)
2. **Hermia** - Hermetic Sage (Ancient wisdom & manifestation)
3. **Luna** - Emotional Alchemist (Heart wisdom & intuition)
4. **Sophia** - Wisdom Keeper (Spiritual guidance & life transitions)
5. **Aurora** - Light Weaver (Light body activation & cosmic connection)

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd oracle-talking-avatars
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up ElevenLabs API** (Optional but recommended)
   ```bash
   cp .env.example .env
   # Add your ElevenLabs API key to .env
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### ElevenLabs Integration

To enable premium voice synthesis:

1. Sign up at [ElevenLabs](https://elevenlabs.io)
2. Get your API key from the dashboard
3. Add it to your `.env` file:
   ```
   VITE_ELEVENLABS_API_KEY=your_api_key_here
   ```

### Voice Customization

Each guide uses a specific ElevenLabs voice ID. You can customize these in `src/data/guides.ts` or use environment variables:

- `VITE_KUNDALI_VOICE_ID` - Warm, nurturing voice
- `VITE_HERMIA_VOICE_ID` - Sophisticated, mysterious voice
- `VITE_LUNA_VOICE_ID` - Empathetic, soothing voice
- `VITE_SOPHIA_VOICE_ID` - Wise, maternal voice
- `VITE_AURORA_VOICE_ID` - Ethereal, cosmic voice

## 🎨 Customization

### Adding New Guides

1. Add guide data to `src/data/guides.ts`
2. Include voice ID and personality traits
3. Add corresponding images and specialties

### Styling

The app uses Tailwind CSS with custom color scheme:
- Primary: `#B8A99A`
- Light: `#F5F1ED`
- Dark: `#1A1A1A`
- Accent: `#D4B5A0`

## 🔊 Voice Technology

### ElevenLabs (Premium)
- High-quality voice synthesis
- Unique voice per guide
- Emotional expression
- Multiple languages support

### Web Speech API (Fallback)
- Browser-native speech synthesis
- No API key required
- Basic voice options
- Universal browser support

## 📱 Browser Compatibility

- **Chrome/Edge**: Full feature support
- **Firefox**: Full feature support
- **Safari**: Limited speech recognition
- **Mobile**: Touch-optimized interface

## 🛠️ Development

### Project Structure
```
src/
├── components/          # React components
├── data/               # Guide data and configuration
├── services/           # API services (ElevenLabs, etc.)
├── types/              # TypeScript type definitions
└── styles/             # CSS and styling
```

### Key Components
- `TalkingAvatar` - Individual guide avatar with voice controls
- `ConversationInterface` - Full conversation modal
- `GuideCard` - Guide preview cards
- `ElevenLabsService` - Voice synthesis integration

## 🚀 Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Netlify
   - Vercel
   - GitHub Pages
   - Custom hosting

3. **Environment Variables**
   Make sure to set your ElevenLabs API key in your deployment environment.

## 🔐 Security

- API keys are handled client-side (consider server-side proxy for production)
- No user data is stored permanently
- Speech recognition is browser-native
- HTTPS required for speech features

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or support, please visit [The Light Between Oracle](https://thelightbetweenoracle.com) or contact the development team.

---

*Experience the future of spiritual guidance through AI-powered talking avatars.*