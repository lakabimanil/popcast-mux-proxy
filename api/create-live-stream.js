import { Mux } from '@mux/mux-node';

const { MUX_TOKEN_ID, MUX_TOKEN_SECRET } = process.env;
const mux = new Mux(MUX_TOKEN_ID, MUX_TOKEN_SECRET);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const stream = await mux.video.liveStreams.create({
      playback_policy: 'public',
      new_asset_settings: { playback_policy: 'public' }
    });

    res.status(200).json({
      stream_key: stream.stream_key,
      playback_id: stream.playback_ids[0].id,
      stream_url: 'rtmps://global-live.mux.com'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
