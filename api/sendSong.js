// /api/sendSong.js
import emailjs from "emailjs-com";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { song, artist } = req.body;

    try {
      await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,   // 환경변수
        process.env.EMAILJS_TEMPLATE_ID,  // 환경변수
        { song, artist },
        process.env.EMAILJS_PUBLIC_KEY    // 환경변수
      );
      res.status(200).json({ message: "노래 전송 성공" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}