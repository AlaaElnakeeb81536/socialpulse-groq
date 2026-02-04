# 🚀 SocialPulse - Trend Intelligence Dashboard

لوحة تحكم احترافية لتتبع الترندات على السوشيال ميديا باستخدام **Groq AI** (مجاني تماماً!)

---

## ✨ المميزات

- 🌍 **تتبع الترندات العالمية والعربية** (Egypt & MENA)
- 🎵 **تحليل الموسيقى والهاشتاجات والمحتوى**
- 🤖 **مدعوم بالذكاء الاصطناعي** (Llama 3.3 70B عبر Groq)
- 📊 **6 ترندات لكل فئة** (موسيقى، محتوى، هاشتاجات)
- 💯 **مجاني تماماً** - بدون حدود!

---

## 🎯 كيفية التشغيل

### 1️⃣ احصل على Groq API Key (مجاناً)

1. روحي [console.groq.com](https://console.groq.com)
2. سجلي حساب جديد (مجاني)
3. روحي **API Keys**
4. اضغطي **Create API Key**
5. انسخي الـ Key

---

### 2️⃣ تشغيل المشروع محلياً

```bash
# نزّلي المشروع
git clone https://github.com/YOUR_USERNAME/socialpulse.git
cd socialpulse

# نصّبي الـ dependencies
npm install

# اعملي ملف .env
echo "VITE_GROQ_API_KEY=your_api_key_here" > .env

# شغّلي المشروع
npm run dev
```

افتحي المتصفح على: **http://localhost:5173**

---

### 3️⃣ Deploy على GitHub Pages

#### أ) ضيفي الـ API Key في GitHub Secrets

1. روحي **Settings** → **Secrets and variables** → **Actions**
2. اضغطي **New repository secret**
   - Name: `VITE_GROQ_API_KEY`
   - Secret: (الصقي الـ API key بتاعك)

#### ب) فعّلي GitHub Pages

1. روحي **Settings** → **Pages**
2. Source: اختاري **GitHub Actions**
3. Save

#### ج) ارفعي التعديلات

```bash
git add .
git commit -m "Deploy with Groq"
git push
```

#### د) شوفي النتيجة

1. روحي تاب **Actions** - هتلاقي الـ Workflow شغال
2. بعد 2-3 دقايق، روحي **Settings → Pages**
3. هتلاقي رابط المشروع! 🎉

---

## 📁 هيكل المشروع

```
socialpulse/
├── src/
│   ├── App.tsx              # الواجهة الرئيسية
│   ├── services/
│   │   └── groqService.ts   # خدمة Groq API
│   └── main.tsx
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions
├── package.json
├── vite.config.ts
└── .env.example
```

---

## 🔧 التخصيص

### تغيير اسم الـ Repository في الرابط

لو الـ repo اسمه `socialpulse`، افتحي `vite.config.ts`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/socialpulse/', // ⬅️ حطي اسم الـ repo هنا
})
```

---

## 🆚 ليه Groq أحسن من Gemini؟

| Feature | Groq | Gemini |
|---------|------|--------|
| **السعر** | مجاني 100% | Quota محدود |
| **السرعة** | ⚡ سريع جداً | متوسط |
| **الحد اليومي** | لا يوجد | محدود |
| **التفعيل** | فوري | يحتاج billing |

---

## 🛠️ Technologies Used

- ⚛️ **React** + TypeScript
- 🎨 **TailwindCSS**
- 🤖 **Groq AI** (Llama 3.3 70B)
- ⚡ **Vite**
- 🚀 **GitHub Pages**

---

## 📝 License

MIT License - استخدميه براحتك!

---

## 💬 الدعم

لو عندك أي مشكلة، افتحي **Issue** على GitHub!

---

Made with ❤️ by SocialPulse Team
