#include "testApp.h"

//--------------------------------------------------------------
void testApp::setup(){
    ofEnableSmoothing();
    ofSetFrameRate(60);
    ofSetVerticalSync(true);
    width = ofGetWidth();
    height = ofGetHeight();
    ofBackground(0,0,0);
    img.loadImage("testpattern.gif");
    shader.load("monochrome");
    fbo.allocate(width,height);
    pingPong.allocate(width, height);
    //draw the original image we care about
    pingPong.src->begin();
    //ofSetColor(255);
    //ofCircle(width/2, height/2, 100, 100);
    img.draw(0,0);
    pingPong.src->end();

    //apply shader
    pingPong.dst->begin();
    shader.begin();
    setUniforms(shader);
    ofRect(0,0,width,height);
    shader.end();
    pingPong.dst->end();
    
    pingPong.swap();

}

//--------------------------------------------------------------
void testApp::update(){
}

//--------------------------------------------------------------
void testApp::draw(){
    pingPong.dst->draw(0,0);
}

//--------------------------------------------------------------
void testApp::keyPressed(int key){

}

//--------------------------------------------------------------
void testApp::keyReleased(int key){

}

//--------------------------------------------------------------
void testApp::mouseMoved(int x, int y){

}

//--------------------------------------------------------------
void testApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void testApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void testApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void testApp::dragEvent(ofDragInfo dragInfo){ 

}

//--------------------------------------------------------------
void testApp::setUniforms(ofShader blurShader){
    float resolution[] = {width, height};
    float time = ofGetElapsedTimef();
    
    //pass the time, resolution, and source buffer as uniforms to the shader
    blurShader.setUniformTexture("prevBuffer", pingPong.src->getTextureReference(), 0);
    blurShader.setUniform1f("targetHue", 0.5);
    blurShader.setUniform1f("mixRatio", 0.5);
}
