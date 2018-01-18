// Shahria Kazi CSE 190m Section MK TA: Tyler Rigsby May 9th 2012
// This webpage contains javascript code that interacts with the user on different events.
// it also contains "unobtrusive JavaScript" and uses the prototype library. This page
// contains functions that does different tasks when buttons are clicked, for instance,
// starting the animation, stopping the animation, speeding up the animation, changing
// the font-size of the text in the textarea

"use strict";

// global variables
var timer = null;
var index = 0;
var text = null;
var frames = null;

// executes functions based on various events
window.onload = function() {
	disable(true, false);
	$("start").onclick = countdown;
	$("stop").onclick = stopAnimation;
	$("chooseanimation").onchange = selectAnimation;
	$("fontsize").onchange = fontSize;
	$("turbo").onclick = delayTime;
}

// splits the text on the textarea into a set of
// frames based on a delimeter and waits the given amount of
// time to call the function repeatedly to display each frame of animation
function countdown() {
	disable(false, true);
	splitText();
	
	clearInterval(timer);
	timer = null;
	if (!timer && !$("turbo").checked) {
		timer = setInterval(startAnimation, 250);
	} else {
		delayTime();
	}
}

// splits the text in the textarea into a set of frames based on a delimeter
function splitText() {
	text = $("mytextarea").value;
	frames = text.split("=====\n"); // returns an array of animations
}

// speeds up the animation from 250ms to 50 ms
function delayTime() {
	clearInterval(timer);
	timer = null;
	
	// checks whether the control is disabled and delays the time if turbo is specified
	if($("start").disabled) {
		if($("turbo").checked) {
			timer = setInterval(startAnimation, 50);
		} else {
			timer = setInterval(startAnimation, 250);	
		}
	}
}

// displays the selected animation on the textarea
function selectAnimation() {
	$("mytextarea").value = ANIMATIONS[$("chooseanimation").value];
}

// changes the font size of the textarea to the selected font-size
function fontSize() {
	$("mytextarea").style.fontSize = $("fontsize").value;
}

// displays each frame of animation onto the textarea
function startAnimation() {
	if(index >= frames.length) { // decrease until it's less than the array's length
		index = 0; // for looping back and forth
	}
	$("mytextarea").value = frames[index++];
}

// stops the animation immediately and displays
// the text that was already there before the animation started
function stopAnimation() {
	clearInterval(timer);
	timer = null;
	disable(true, false);
	$("mytextarea").value = text;
	index = 0; // for starting the animation over from begining
}

// takes two parameters which specify whether to disable a
// control or not, and disables those controls
// yes represents the control is disabled
function disable(yes, no) {
	$("chooseanimation").disabled = no;
	$("start").disabled = no; //false
	$("stop").disabled = yes;
}