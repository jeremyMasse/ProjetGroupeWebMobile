import TrackPlayer from 'react-native-track-player';

export const handlePlay = async track => {
  await TrackPlayer.reset();

  await TrackPlayer.add({
    id: track.id,
    url: track.preview_url,
  });

  await TrackPlayer.play();
};
