// Initialize AR Components
AFRAME.registerComponent('mytarget', {
    init: function () {
      const videoMP4 = document.querySelector("#video-mp4");
      const playButton = document.querySelector("#play-button");
      const downloadButton = document.querySelector("#download-button");
      const mediaPanel = document.querySelector("#media-panel");
      const ctaPanel = document.querySelector("#cta-panel");
  
      let isPlaying = false;
      let targetVisible = false;
  
      // Toggle Video Playback
      const toggleVideoPlayback = () => {
        if (videoMP4.paused) {
          videoMP4.play();
          playButton.setAttribute("visible", false);
        } else {
          videoMP4.pause();
          playButton.setAttribute("visible", true);
        }
        isPlaying = !isPlaying;
      };
  
      // Show CTA Panel
      const showCta = () => {
        ctaPanel.setAttribute("visible", true);
        ctaPanel.emit('pop');
        setTimeout(() => ctaPanel.emit('reset'), 180);
      };
  
      // Show Media Panel
      const showMedia = () => {
        mediaPanel.setAttribute("visible", true);
        mediaPanel.emit('pop');
        setTimeout(() => mediaPanel.emit('reset'), 180);
      };
  
      // Handle Target Found
      this.el.addEventListener('targetFound', () => {
        if (targetVisible) return;
        targetVisible = true;
        showCta();
        showMedia();
        playButton.setAttribute("visible", true);
      });
  
      // Handle Target Lost
      this.el.addEventListener('targetLost', () => {
        videoMP4.pause();
        playButton.setAttribute("visible", true);
        isPlaying = false;
        targetVisible = false;
      });
  
      // Handle Play Button Click
      playButton.addEventListener('click', toggleVideoPlayback);
  
      // Handle Download Button Click
      downloadButton.addEventListener('click', () => {
        window.location.href = "https://monolith.asia";
      });
  
      // Handle Orientation Change
      window.addEventListener("orientationchange", () => {
        const scene = document.querySelector("a-scene");
        const arSystem = scene.systems["mindar-image-system"];
        const wasPlaying = !videoMP4.paused;
  
        scene.pause();
        arSystem.stop();
        videoMP4.pause();
  
        setTimeout(() => {
          scene.play();
          arSystem.start();
          if (wasPlaying) videoMP4.play();
          playButton.setAttribute("visible", !wasPlaying);
        }, 100);
      });
    }
  });