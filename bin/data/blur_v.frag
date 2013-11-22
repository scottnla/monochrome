uniform sampler2DRect prevBuffer; // the texture2D with the scene you want to blur
uniform vec2 resolution;
uniform float time;
uniform float blurSize;

void main(void) {
    vec4 sum = vec4(0.0);
    vec2 position = (gl_FragCoord.xy);
    // blur in y (vertical)
    // take nine samples, with the distance blurSize between them
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y - 4.0*blurSize)) * 0.05;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y - 3.0*blurSize)) * 0.09;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y - 2.0*blurSize)) * 0.12;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y - blurSize)) * 0.15;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y)) * 0.16;     
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y + blurSize)) * 0.15;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y + 2.0*blurSize)) * 0.12;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y + 3.0*blurSize)) * 0.09;
    sum += texture2DRect(prevBuffer, vec2(position.x, position.y + 4.0*blurSize)) * 0.05;
    gl_FragColor = sum;
    //gl_FragColor = texture2DRect(prevBuffer, vec2(position.x, position.y));
}