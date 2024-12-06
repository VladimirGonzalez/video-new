import React, { useState, useEffect, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // Importa QRCodeCanvas
import './App.css';

function App() {
  const [currentContent, setCurrentContent] = useState('logo-itc'); // Estado del contenido actual
  const [progress, setProgress] = useState(0); // Estado de la barra de progreso
  const sponsorsVideoRef = useRef(null); // Referencia al video de sponsors
  const hospitalVideoRef = useRef(null); // Referencia al video del hospital
  const parnorVideoRef = useRef(null); // Referencia al video parnor
  const sponsorStartTime = 82.25; // Tiempo de inicio en segundos (1:22.06)

  // Manejo de teclas
  useEffect(() => {
    const handleKeyPress = (event) => {
      const sponsorsVideo = sponsorsVideoRef.current;
      const hospitalVideo = hospitalVideoRef.current;
      const parnorVideo = parnorVideoRef.current;

      // Cambiar contenido según la tecla
      if (!event.target.matches('input, textarea')) {
        switch (event.key) {
          case '1':
            setCurrentContent('logo-itc');
            break;
          case '2':
            if (currentContent === 'sponsors-video' && sponsorsVideo) {
              sponsorsVideo.currentTime = 0;
              sponsorsVideo.play();
            } else {
              setCurrentContent('sponsors-video');
            }
            break;
          case '3':
            if (currentContent === 'hospital-merendero' && hospitalVideo) {
              hospitalVideo.currentTime = 0;
              hospitalVideo.play();
            } else {
              setCurrentContent('hospital-merendero');
            }
            break;
          case '4':
            setCurrentContent('contact');
            break;
          case '5':
            if (currentContent === 'parnor-video' && parnorVideo) {
              parnorVideo.currentTime = 0;
              parnorVideo.play();
            } else {
              setCurrentContent('parnor-video');
            }
            break;
          default:
            break;
        }
      }

      // Controles multimedia para videos activos
      const video =
        currentContent === 'sponsors-video'
          ? sponsorsVideo
          : currentContent === 'hospital-merendero'
            ? hospitalVideo
            : currentContent === 'parnor-video'
              ? parnorVideo
              : null;

      if (video) {
        switch (event.key) {
          case ' ':
            event.preventDefault();
            video.paused ? video.play() : video.pause();
            break;
          case 'ArrowRight':
            video.currentTime = Math.min(video.currentTime + 10, video.duration);
            break;
          case 'ArrowLeft':
            video.currentTime = Math.max(video.currentTime - 10, 0);
            break;
          case 'ArrowUp':
            video.currentTime = Math.min(video.currentTime + 5, video.duration);
            break;
          case 'ArrowDown':
            video.currentTime = Math.max(video.currentTime - 5, 0);
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentContent]);

  // Configura el inicio del video de sponsors
  useEffect(() => {
    const sponsorsVideo = sponsorsVideoRef.current;

    if (currentContent === 'sponsors-video' && sponsorsVideo) {
      const handleEnded = () => {
        sponsorsVideo.currentTime = sponsorStartTime;
        sponsorsVideo.play();
      };

      sponsorsVideo.addEventListener('ended', handleEnded);
      return () => sponsorsVideo.removeEventListener('ended', handleEnded);
    }
  }, [currentContent]);

  // Actualiza la barra de progreso
  useEffect(() => {
    const video =
      currentContent === 'sponsors-video'
        ? sponsorsVideoRef.current
        : currentContent === 'hospital-merendero'
          ? hospitalVideoRef.current
          : currentContent === 'parnor-video'
            ? parnorVideoRef.current
            : null;

    if (video) {
      const updateProgress = () => {
        const progressPercentage = (video.currentTime / video.duration) * 100;
        setProgress(progressPercentage || 0);
      };

      video.addEventListener('timeupdate', updateProgress);
      return () => video.removeEventListener('timeupdate', updateProgress);
    }
  }, [currentContent]);

  return (
    <div className="App">
      {/* Logo ITC */}
      {currentContent === 'logo-itc' && (
        <img src="/logo-itc.png" alt="Logo ITC" className="background-image" />
      )}

      {/* Video de Sponsors */}
      {currentContent === 'sponsors-video' && (
        <div className="video-container">
          <video ref={sponsorsVideoRef} autoPlay muted className="video-player">
            <source src="/sponsors1.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Video del Hospital */}
      {currentContent === 'hospital-merendero' && (
        <div className="video-container">
          <video
            ref={hospitalVideoRef}
            autoPlay
            muted
            className="video-player"
          >
            <source src="/hospital-merendero1.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Video Parnor */}
      {currentContent === 'parnor-video' && (
        <div className="video-container">
          <video ref={parnorVideoRef} autoPlay className="video-player">
            {/* Eliminado muted para habilitar el audio */}
            <source src="/parnor.mp4" type="video/mp4" />
            Tu navegador no soporta la reproducción de videos.
          </video>
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}

      {/* Contacto */}
      {currentContent === 'contact' && (
        <div className="contact-card">
          <h1>Vladimir Gonzalez</h1>
          <p>Software Developer | Programmer | Marketing | Ads | Design</p>
          <p>Tel: +5493329627578</p>
          <QRCodeCanvas
            value="https://vladimirg.myportfolio.com/work"
            size={100}
            className="qr-code"
          />
          <a
            href="https://vladimirg.myportfolio.com/work"
            target="_blank"
            rel="noopener noreferrer"
            className="portfolio-link"
          >
            Ir a mi portafolio
          </a>
          <a
            href="https://www.linkedin.com/in/vladimirgonzalez-ar/"
            target="_blank"
            rel="noopener noreferrer"
            className="linkedin-link"
          >
            Mi perfil de LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
