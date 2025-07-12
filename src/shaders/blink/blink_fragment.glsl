//!  Fragment: color or texture

uniform float time;
uniform float flashWidth;
uniform float speed;
uniform float intensity;
uniform float delay;

varying vec2 vUv;

void main() {
    //! hard-coded variables
    vec3 flashColor = vec3(255,255,255);
    float alpha = 0.0;

    float currentCycleTime = mod(time, delay);

    if (currentCycleTime < speed) {
    
        float normalizedFlashTime = currentCycleTime / speed;

        float diagonalPos = vUv.x + vUv.y;
        float movingCenter = normalizedFlashTime * 2.0;

        float halfWidth = flashWidth * 0.5;
        float gradient = diagonalPos - movingCenter;

        alpha = 1.0 - smoothstep(0.0, halfWidth, abs(gradient));
        alpha = max(0.0, alpha);
        alpha *= intensity;
    }

   
    gl_FragColor = vec4(flashColor, alpha);
    
}

