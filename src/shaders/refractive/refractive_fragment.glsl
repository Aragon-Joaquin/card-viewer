uniform float time; 

varying vec2 vUv;

void main() {
    vec2 uv = gl_FragCoord.xy / vUv.xy;
    vec3 o = -3.1416 * vec3(0., .5, 1.);

    float g = uv.y + time;
    vec3 col = .5 + .5 * -sin(g) * cos(g + o);
                
    col.g += .25;
    col = .5 + (col * 2. - 1.);
    col.gb *= vec2(.75, .9);
    col = .125 + .75 * col;

    gl_FragColor = vec4(col, 0.2);
}