let bgmInstance = null;

const getBGM = () => {
  if (!bgmInstance && typeof window !== 'undefined') {
    bgmInstance = new Audio('/bgm.mp3');
    bgmInstance.loop = true;
    bgmInstance.volume = 0.6;
  }
  return bgmInstance;
};

export default getBGM;
