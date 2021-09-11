varying vec2 vUv;
uniform float uTime;
uniform sampler2D uTexture;
uniform vec2 uMouse;

void main() {
  vec2 uv = vUv;

  gl_FragColor = texture2D(uTexture, uv);
}
