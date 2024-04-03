import React, { useEffect, useRef } from 'react';
var x = 50;
var speed = 5;
const WIDTH = 500;
const HEIGHT = 400;
const P5Sketch = () => {
    const renderRef = useRef();
    const ascii = ".'`^\",:;Il!i><~+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$"


    useEffect(() => {
        const p5 = require("p5");
        const scale = 15;

        new p5(p => {
            let video = null;
            p.setup = () => {
                p.createCanvas(window.innerWidth, window.innerWidth*.75).parent(renderRef.current);
                video = p.createCapture(p.VIDEO);
                video.size(window.innerWidth/scale, (window.innerWidth*.75)/scale);
                video.hide();
            }

            p.draw = () => {
                p.background(0);
                if(video) {
                    video.loadPixels();
                    for (var y = 0; y < video.height; y++) { //noprotect
                        for (var x = 0; x < video.width; x++) {
                        var index = (video.width - x + 1 + (y * video.width)) * 4;
                        var r = video.pixels[index + 0];
                        var g = video.pixels[index + 1];
                        var b = video.pixels[index + 2];
                        var bright = (r + g + b) / 2;
                        var w =p.map(bright, 0, 255, 0, 70);
                        var asciiSize = p.map(bright, 0, 255, 0, scale);
                        p.noStroke();
                        //p.fill(r,g,b);
                        p.fill(255);
                        p.textFont("Courier New");
                        p.rectMode(p.CENTER);
                        //p.ellipse(x * scale, y * scale, asciiSize, asciiSize);
            
                        p.textSize(scale);
                        p.text(ascii.charAt(w), x * scale, y * scale);
                        }
                    }
                }
            }
        })
    }, [])

    return(
        <div ref={renderRef} />
    )
}

export default P5Sketch;