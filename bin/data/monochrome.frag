uniform sampler2DRect prevBuffer; // the texture2D with the scene you want to blur
uniform float targetHue;
uniform float mixRatio;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
 

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 position = gl_FragCoord.xy;
    //extract color
    vec3 color = texture2DRect(prevBuffer, position).rgb;

    //convert to hsv from rgb
    vec3 currentHSV = rgb2hsv(color);
    //only change the hue (first vector element)
    currentHSV.x = mix(currentHSV.x,targetHue,mixRatio);
    //convert back to RGB space and apply to fragment
    gl_FragColor = vec4(hsv2rgb(currentHSV),1.0);

}