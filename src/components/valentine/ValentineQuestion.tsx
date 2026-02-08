import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ValentineQuestionProps {
  onYesClick: () => void;
}

export const ValentineQuestion = ({ onYesClick }: ValentineQuestionProps) => {
  const [yesSize, setYesSize] = useState({ width: 120, height: 60, fontSize: 20 });
  const [noHovered, setNoHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showHearts, setShowHearts] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  useEffect(() => {
    // Initialiser l'animation de fleurs Three.js
    if (canvasRef.current) {
      initFlowerAnimation(canvasRef.current);
    }
  }, []);

  const initFlowerAnimation = (canvas: HTMLCanvasElement) => {
    // Importer Three.js et créer l'animation de fleurs
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";

      const canvas = canvas;
      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      
      const sceneShader = new THREE.Scene();
      const sceneBasic = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
      const clock = new THREE.Clock();

      const renderTargets = [
        new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight),
        new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight)
      ];

      // Shader material pour les fleurs
      const shaderMaterial = new THREE.ShaderMaterial({
        uniforms: {
          u_stop_time: { type: "f", value: 0. },
          u_stop_randomizer: { type: "v2", value: new THREE.Vector2(Math.random(), Math.random()) },
          u_cursor: { type: "v2", value: new THREE.Vector2(0.5, 0.5) },
          u_ratio: { type: "f", value: window.innerWidth / window.innerHeight },
          u_texture: { type: "t", value: null },
          u_clean: { type: "f", value: 1. },
        },
        vertexShader: \`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.);
          }
        \`,
        fragmentShader: \`
          #define PI 3.14159265359
          uniform float u_ratio;
          uniform vec2 u_cursor;
          uniform float u_stop_time;
          uniform float u_clean;
          uniform vec2 u_stop_randomizer;
          uniform sampler2D u_texture;
          varying vec2 vUv;

          vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
          vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
          float snoise(vec2 v) {
            const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
            vec2 i = floor(v + dot(v, C.yy));
            vec2 x0 = v - i + dot(i, C.xx);
            vec2 i1;
            i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
            vec4 x12 = x0.xyxy + C.xxzz;
            x12.xy -= i1;
            i = mod289(i);
            vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
            vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
            m = m*m;
            m = m*m;
            vec3 x = 2.0 * fract(p * C.www) - 1.0;
            vec3 h = abs(x) - 0.5;
            vec3 ox = floor(x + 0.5);
            vec3 a0 = x - ox;
            m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
            vec3 g;
            g.x = a0.x * x0.x + h.x * x0.y;
            g.yz = a0.yz * x12.xz + h.yz * x12.yw;
            return 130.0 * dot(m, g);
          }

          float get_flower_shape(vec2 _p, float _pet_n, float _angle, float _outline) {
            _angle *= 3.;
            _p = vec2(_p.x * cos(_angle) - _p.y * sin(_angle),
            _p.x * sin(_angle) + _p.y * cos(_angle));
            float a = atan(_p.y, _p.x);
            float flower_sectoral_shape = pow(abs(sin(a * _pet_n)), .4) + .25;
            vec2 flower_size_range = vec2(.03, .1);
            float size = flower_size_range[0] + u_stop_randomizer[0] * flower_size_range[1];
            float flower_radial_shape = pow(length(_p) / size, 2.);
            flower_radial_shape -= .1 * sin(8. * a);
            flower_radial_shape = max(.1, flower_radial_shape);
            flower_radial_shape += smoothstep(0., 0.03, -_p.y + .2 * abs(_p.x));
            float grow_time = step(.25, u_stop_time) * pow(u_stop_time, .3);
            float flower_shape = 1. - smoothstep(0., flower_sectoral_shape, _outline * flower_radial_shape / grow_time);
            flower_shape *= (1. - step(1., grow_time));
            return flower_shape;
          }

          float get_stem_shape(vec2 _p, vec2 _uv, float _w, float _angle) {
            _w = max(.004, _w);
            float x_offset = _p.y * sin(_angle);
            x_offset *= pow(3. * _uv.y, 2.);
            _p.x -= x_offset;
            float noise_power = .5;
            float cursor_horizontal_noise = noise_power * snoise(2. * _uv * u_stop_randomizer[0]);
            cursor_horizontal_noise *= pow(dot(_p.y, _p.y), .6);
            cursor_horizontal_noise *= pow(dot(_uv.y, _uv.y), .3);
            _p.x += cursor_horizontal_noise;
            float left = smoothstep(-_w, 0., _p.x);
            float right = 1. - smoothstep(0., _w, _p.x);
            float stem_shape = left * right;
            float grow_time = 1. - smoothstep(0., .2, u_stop_time);
            float stem_top_mask = smoothstep(0., pow(grow_time, .5), .03 -_p.y);
            stem_shape *= stem_top_mask;
            stem_shape *= (1. - step(.17, u_stop_time));
            return stem_shape;
          }

          void main() {
            vec3 base = texture2D(u_texture, vUv).xyz;
            vec2 uv = vUv;
            uv.x *= u_ratio;
            vec2 cursor = vUv - u_cursor.xy;
            cursor.x *= u_ratio;
            vec3 stem_color = vec3(.1 + u_stop_randomizer[0] * .6, .6, .2);
            vec3 flower_color = vec3(.6 + .5 * u_stop_randomizer[1], .1, .9 - .5 * u_stop_randomizer[1]);
            float angle = .5 * (u_stop_randomizer[0] - .5);
            float stem_shape = get_stem_shape(cursor, uv, .003, angle);
            stem_shape += get_stem_shape(cursor + vec2(0., .2 + .5 * u_stop_randomizer[0]), uv, .003, angle);
            float stem_mask = 1. - get_stem_shape(cursor, uv, .004, angle);
            stem_mask -= get_stem_shape(cursor + vec2(0., .2 + .5 * u_stop_randomizer[0]), uv, .004, angle);
            float petals_back_number = 1. + floor(u_stop_randomizer[0] * 2.);
            float angle_offset = -(2. * step(0., angle) - 1.) * .1 * u_stop_time;
            float flower_back_shape = get_flower_shape(cursor, petals_back_number, angle + angle_offset, 1.5);
            float flower_back_mask = 1. - get_flower_shape(cursor, petals_back_number, angle + angle_offset, 1.6);
            float petals_front_number = 2. + floor(u_stop_randomizer[1] * 2.);
            float flower_front_shape = get_flower_shape(cursor, petals_front_number, angle, 1.);
            float flower_front_mask = 1. - get_flower_shape(cursor, petals_front_number, angle, .95);
            vec3 color = base;
            color *= stem_mask;
            color *= flower_back_mask;
            color *= flower_front_mask;
            color += (stem_shape * stem_color);
            color += (flower_back_shape * (flower_color + vec3(0., .8 * u_stop_time, 0.)));
            color += (flower_front_shape * flower_color);
            color.r *= 1. - (.5 * flower_back_shape * flower_front_shape);
            color.b *= 1. - (flower_back_shape * flower_front_shape);
            color *= u_clean;
            gl_FragColor = vec4(color, 1.);
          }
        \`
      });

      const basicMaterial = new THREE.MeshBasicMaterial();
      const planeGeometry = new THREE.PlaneGeometry(2, 2);
      const planeBasic = new THREE.Mesh(planeGeometry, basicMaterial);
      const planeShader = new THREE.Mesh(planeGeometry, shaderMaterial);
      sceneBasic.add(planeBasic);
      sceneShader.add(planeShader);

      renderer.setSize(window.innerWidth, window.innerHeight);

      let pointer = { x: 0.5, y: 0.5, clicked: false, vanishCanvas: false };

      const handleCanvasClick = (e: MouseEvent) => {
        pointer.x = e.clientX / window.innerWidth;
        pointer.y = e.clientY / window.innerHeight;
        pointer.clicked = true;
      };

      canvas.addEventListener('click', handleCanvasClick);

      const render = () => {
        shaderMaterial.uniforms.u_clean.value = pointer.vanishCanvas ? 0 : 1;
        shaderMaterial.uniforms.u_texture.value = renderTargets[0].texture;

        if (pointer.clicked) {
          shaderMaterial.uniforms.u_cursor.value = new THREE.Vector2(pointer.x, 1 - pointer.y);
          shaderMaterial.uniforms.u_stop_randomizer.value = new THREE.Vector2(Math.random(), Math.random());
          shaderMaterial.uniforms.u_stop_time.value = 0.;
          pointer.clicked = false;
        }
        shaderMaterial.uniforms.u_stop_time.value += clock.getDelta();

        renderer.setRenderTarget(renderTargets[1]);
        renderer.render(sceneShader, camera);
        basicMaterial.map = renderTargets[1].texture;
        renderer.setRenderTarget(null);
        renderer.render(sceneBasic, camera);

        let tmp = renderTargets[0];
        renderTargets[0] = renderTargets[1];
        renderTargets[1] = tmp;

        requestAnimationFrame(render);
      };

      render();

      // Nettoyage
      return () => {
        canvas.removeEventListener('click', handleCanvasClick);
      };
    `;

    document.head.appendChild(script);
  };

  const handleYesClick = () => {
    setShowHearts(true);
    onYesClick();
    setTimeout(() => {
      navigate('/landing-page');
    }, 1500);
  };

  const handleNoHover = () => {
    setNoHovered(true);
    // Agrandir le bouton Oui
    setYesSize(prev => ({
      width: Math.min(prev.width + 20, 300),
      height: Math.min(prev.height + 10, 150),
      fontSize: Math.min(prev.fontSize + 2, 40)
    }));
  };

  const getNoButtonPosition = () => {
    if (noHovered) {
      const maxX = window.innerWidth - 150;
      const maxY = window.innerHeight - 100;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;
      
      // Éviter la zone du bouton Oui
      const yesX = window.innerWidth / 2 - yesSize.width / 2;
      const yesY = window.innerHeight - 100;
      
      if (Math.abs(randomX - yesX) < 200 && Math.abs(randomY - yesY) < 100) {
        return { x: yesX + 250, y: yesY - 150 };
      }
      
      return { x: randomX, y: randomY };
    }
    return { x: window.innerWidth / 2 + 100, y: window.innerHeight - 100 };
  };

  const noPosition = getNoButtonPosition();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-purple-600 to-pink-600">
      {/* Canvas pour l'animation de fleurs en arrière-plan */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          background: 'transparent'
        }}
      />
      
      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {/* Ours en peluche */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.68, -0.55, 0.265, 1.55] }}
          className="text-8xl mb-8"
        >
          🧸
        </motion.div>

        {/* Boîte de chocolats/rose */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl mb-8"
        >
          🍫🌹
        </motion.div>

        {/* Question */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-4xl md:text-6xl font-bold text-center mb-12 text-white"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          VEUX-TU ÊTRE MA VALENTINE ?
        </motion.h1>

        {/* Cœurs animés quand on clique sur Oui */}
        <AnimatePresence>
          {showHearts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: window.innerWidth / 2, 
                    y: window.innerHeight / 2,
                    scale: 0,
                    rotate: 0
                  }}
                  animate={{ 
                    x: Math.random() * window.innerWidth,
                    y: -100,
                    scale: Math.random() + 0.5,
                    rotate: Math.random() * 360
                  }}
                  transition={{ 
                    duration: 2 + Math.random(),
                    ease: "easeOut"
                  }}
                  className="absolute text-4xl"
                >
                  ❤️
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Boutons */}
        <div className="relative">
          {/* Bouton Oui */}
          <motion.button
            onClick={handleYesClick}
            className="absolute bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-xl shadow-lg transform transition-all duration-300"
            style={{ 
              width: `${yesSize.width}px`, 
              height: `${yesSize.height}px`,
              fontSize: `${yesSize.fontSize}px`,
              left: '50%',
              bottom: '0',
              transform: 'translateX(-50%)'
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Oui ❤
          </motion.button>

          {/* Bouton Non */}
          <motion.button
            onMouseEnter={handleNoHover}
            className="absolute bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-full text-lg shadow-lg transition-all duration-300"
            style={{ 
              left: `${noPosition.x}px`, 
              top: `${noPosition.y}px` 
            }}
            animate={noHovered ? {
              x: noPosition.x - window.innerWidth / 2 + yesSize.width / 2 + 100,
              y: noPosition.y - (window.innerHeight - 100)
            } : {}}
            transition={{ duration: 0.3 }}
          >
            Non
          </motion.button>
        </div>
      </div>
    </div>
  );
};
