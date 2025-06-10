const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/get-video-info', async (req, res) => {
  const { url } = req.body;

  if (!ytdl.validateURL(url)) {
    return res.status(400).json({ error: 'URL invalide' });
  }

  try {
    const info = await ytdl.getInfo(url);

    // Extraire données utiles
    const videoDetails = info.videoDetails;

    // Chercher la meilleure qualité vidéo téléchargeable (mp4)
    const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
    const bestFormat = formats.reduce((prev, current) => {
      return (current.bitrate > (prev.bitrate || 0)) ? current : prev;
    }, {});

    res.json({
      title: videoDetails.title,
      author: videoDetails.author.name,
      duration: videoDetails.lengthSeconds,
      thumbnail: videoDetails.thumbnails.pop().url,
      downloadUrl: bestFormat.url,
      quality: bestFormat.qualityLabel || bestFormat.container || 'N/A'
    });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des infos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
