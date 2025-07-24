document.addEventListener('DOMContentLoaded', () => {
  getVideos();
});

const getVideos = () => {
  console.log('Getting Videos');

  fetch('/videos')
    .then((response) => {
      if (!response.ok) throw new Error('Failed to fetch videos');
      return response.json();
    })
    .then((data) => {
      const container = document.getElementById('videos__container');
      const videos = data.data;
      videos.forEach((video) => {
        const videoElem = document.createElement('video');
        videoElem.setAttribute('controls', true);
        videoElem.setAttribute('width', 600);

        const sourceElem = document.createElement('source');
        sourceElem.setAttribute('src', `/videos/stream/${video.path}`);
        sourceElem.setAttribute('type', 'video/mp4');

        videoElem.appendChild(sourceElem);

        const title = document.createElement('p');
        title.textContent = video.title;

        container.appendChild(title);
        container.appendChild(videoElem);
      });
    })
    .catch((err) => {
      console.error('Error fetching videos:', err);
    });
};
