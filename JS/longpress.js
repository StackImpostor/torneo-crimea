

!function(e,t){"use strict";var n=null,a="PointerEvent"in e||e.navigator&&"msPointerEnabled"in e.navigator,i="ontouchstart"in e||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0,o=a?"pointerdown":i?"touchstart":"mousedown",r=a?"pointerup":i?"touchend":"mouseup",m=a?"pointermove":i?"touchmove":"mousemove",u=a?"pointerleave":i?"touchleave":"mouseleave",s=0,c=0,l=10,v=10;function f(e){p(),e=function(e){if(void 0!==e.changedTouches)return e.changedTouches[0];return e}(e),this.dispatchEvent(new CustomEvent("long-press",{bubbles:!0,cancelable:!0,detail:{clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY},clientX:e.clientX,clientY:e.clientY,offsetX:e.offsetX,offsetY:e.offsetY,pageX:e.pageX,pageY:e.pageY,screenX:e.screenX,screenY:e.screenY}))||t.addEventListener("click",function e(n){t.removeEventListener("click",e,!0),function(e){e.stopImmediatePropagation(),e.preventDefault(),e.stopPropagation()}(n)},!0)}function d(a){p(a);var i=a.target,o=parseInt(function(e,n,a){for(;e&&e!==t.documentElement;){var i=e.getAttribute(n);if(i)return i;e=e.parentNode}return a}(i,"data-long-press-delay","500"),10);n=function(t,n){if(!(e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame&&e.mozCancelRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame))return e.setTimeout(t,n);var a=(new Date).getTime(),i={},o=function(){(new Date).getTime()-a>=n?t.call():i.value=requestAnimFrame(o)};return i.value=requestAnimFrame(o),i}(f.bind(i,a),o)}function p(t){var a;(a=n)&&(e.cancelAnimationFrame?e.cancelAnimationFrame(a.value):e.webkitCancelAnimationFrame?e.webkitCancelAnimationFrame(a.value):e.webkitCancelRequestAnimationFrame?e.webkitCancelRequestAnimationFrame(a.value):e.mozCancelRequestAnimationFrame?e.mozCancelRequestAnimationFrame(a.value):e.oCancelRequestAnimationFrame?e.oCancelRequestAnimationFrame(a.value):e.msCancelRequestAnimationFrame?e.msCancelRequestAnimationFrame(a.value):clearTimeout(a)),n=null}"function"!=typeof e.CustomEvent&&(e.CustomEvent=function(e,n){n=n||{bubbles:!1,cancelable:!1,detail:void 0};var a=t.createEvent("CustomEvent");return a.initCustomEvent(e,n.bubbles,n.cancelable,n.detail),a},e.CustomEvent.prototype=e.Event.prototype),e.requestAnimFrame=e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){e.setTimeout(t,1e3/60)},t.addEventListener(r,p,!0),t.addEventListener(u,p,!0),t.addEventListener(m,function(e){var t=Math.abs(s-e.clientX),n=Math.abs(c-e.clientY);(t>=l||n>=v)&&p()},!0),t.addEventListener("wheel",p,!0),t.addEventListener("scroll",p,!0),t.addEventListener(o,function(e){s=e.clientX,c=e.clientY,d(e)},!0)}(window,document);


/*!
 * long-press-event - v@version@
 * Pure JavaScript long-press-event
 * https://github.com/john-doherty/long-press-event
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
// (function (window, document) {

//   'use strict';

//   // local timer object based on rAF
//   var timer = null;

//   // check if we're using a touch screen
//   var hasPointerEvents = (('PointerEvent' in window) || (window.navigator && 'msPointerEnabled' in window.navigator));
//   var isTouch = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));

//   // switch to pointer events or touch events if using a touch screen
//   var mouseDown = hasPointerEvents ? 'pointerdown' : isTouch ? 'touchstart' : 'mousedown';
//   var mouseUp = hasPointerEvents ? 'pointerup' : isTouch ? 'touchend' : 'mouseup';
//   var mouseMove = hasPointerEvents ? 'pointermove' : isTouch ? 'touchmove' : 'mousemove';
//   var mouseLeave = hasPointerEvents ? 'pointerleave' : isTouch ? 'touchleave' : 'mouseleave';

//   // track number of pixels the mouse moves during long press
//   var startX = 0; // mouse x position when timer started
//   var startY = 0; // mouse y position when timer started
//   var maxDiffX = 10; // max number of X pixels the mouse can move during long press before it is canceled
//   var maxDiffY = 10; // max number of Y pixels the mouse can move during long press before it is canceled

//   // patch CustomEvent to allow constructor creation (IE/Chrome)
//   if (typeof window.CustomEvent !== 'function') {

//       window.CustomEvent = function (event, params) {

//           params = params || { bubbles: false, cancelable: false, detail: undefined };

//           var evt = document.createEvent('CustomEvent');
//           evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
//           return evt;
//       };

//       window.CustomEvent.prototype = window.Event.prototype;
//   }

//   // requestAnimationFrame() shim by Paul Irish
//   window.requestAnimFrame = (function () {
//       return window.requestAnimationFrame ||
//           window.webkitRequestAnimationFrame ||
//           window.mozRequestAnimationFrame ||
//           window.oRequestAnimationFrame ||
//           window.msRequestAnimationFrame || function (callback) {
//               window.setTimeout(callback, 1000 / 60);
//           };
//   })();

//   /**
//    * Behaves the same as setTimeout except uses requestAnimationFrame() where possible for better performance
//    * @param {function} fn The callback function
//    * @param {int} delay The delay in milliseconds
//    * @returns {object} handle to the timeout object
//    */
//   function requestTimeout(fn, delay) {

//       if (!window.requestAnimationFrame && !window.webkitRequestAnimationFrame &&
//           !(window.mozRequestAnimationFrame && window.mozCancelRequestAnimationFrame) && // Firefox 5 ships without cancel support
//           !window.oRequestAnimationFrame && !window.msRequestAnimationFrame) return window.setTimeout(fn, delay);

//       var start = new Date().getTime();
//       var handle = {};

//       var loop = function () {
//           var current = new Date().getTime();
//           var delta = current - start;

//           if (delta >= delay) {
//               fn.call();
//           }
//           else {
//               handle.value = requestAnimFrame(loop);
//           }
//       };

//       handle.value = requestAnimFrame(loop);

//       return handle;
//   }

//   /**
//    * Behaves the same as clearTimeout except uses cancelRequestAnimationFrame() where possible for better performance
//    * @param {object} handle The callback function
//    * @returns {void}
//    */
//   function clearRequestTimeout(handle) {
//       if (handle) {
//           window.cancelAnimationFrame ? window.cancelAnimationFrame(handle.value) :
//               window.webkitCancelAnimationFrame ? window.webkitCancelAnimationFrame(handle.value) :
//                   window.webkitCancelRequestAnimationFrame ? window.webkitCancelRequestAnimationFrame(handle.value) : /* Support for legacy API */
//                       window.mozCancelRequestAnimationFrame ? window.mozCancelRequestAnimationFrame(handle.value) :
//                           window.oCancelRequestAnimationFrame ? window.oCancelRequestAnimationFrame(handle.value) :
//                               window.msCancelRequestAnimationFrame ? window.msCancelRequestAnimationFrame(handle.value) :
//                                   clearTimeout(handle);
//       }
//   }

//   /**
//    * Fires the 'long-press' event on element
//    * @param {MouseEvent|PointerEvent|TouchEvent} originalEvent The original event being fired
//    * @returns {void}
//    */
//   function fireLongPressEvent(originalEvent) {

//       clearLongPressTimer();

//       originalEvent = unifyEvent(originalEvent);

//       // fire the long-press event
//       var allowClickEvent = this.dispatchEvent(new CustomEvent('long-press', {
//           bubbles: true,
//           cancelable: true,

//           // custom event data (legacy)
//           detail: {
//               clientX: originalEvent.clientX,
//               clientY: originalEvent.clientY,
//               offsetX: originalEvent.offsetX,
//               offsetY: originalEvent.offsetY,
//               pageX: originalEvent.pageX,
//               pageY: originalEvent.pageY
//           },

//           // add coordinate data that would typically acompany a touch/click event
//           clientX: originalEvent.clientX,
//           clientY: originalEvent.clientY,
//           offsetX: originalEvent.offsetX,
//           offsetY: originalEvent.offsetY,
//           pageX: originalEvent.pageX,
//           pageY: originalEvent.pageY,
//           screenX: originalEvent.screenX,
//           screenY: originalEvent.screenY
//       }));

//       if (!allowClickEvent) {
//           // suppress the next click event if e.preventDefault() was called in long-press handler
//           document.addEventListener('click', function suppressEvent(e) {
//               document.removeEventListener('click', suppressEvent, true);
//               cancelEvent(e);
//           }, true);
//       }
//   }

//   /**
//    * consolidates mouse, touch, and Pointer events
//    * @param {MouseEvent|PointerEvent|TouchEvent} e The original event being fired
//    * @returns {MouseEvent|PointerEvent|Touch}
//    */
//   function unifyEvent(e) {
//       if (e.changedTouches !== undefined) {
//           return e.changedTouches[0];
//       }
//       return e;
//   }

//   /**
//    * method responsible for starting the long press timer
//    * @param {event} e - event object
//    * @returns {void}
//    */
//   function startLongPressTimer(e) {

//       clearLongPressTimer(e);

//       var el = e.target;

//       // get delay from html attribute if it exists, otherwise default to 1500
//       var longPressDelayInMs = parseInt(getNearestAttribute(el, 'data-long-press-delay', '1500'), 10); // default 1500

//       // start the timer
//       timer = requestTimeout(fireLongPressEvent.bind(el, e), longPressDelayInMs);
//   }

//   /**
//    * method responsible for clearing a pending long press timer
//    * @param {event} e - event object
//    * @returns {void}
//    */
//   function clearLongPressTimer(e) {
//       clearRequestTimeout(timer);
//       timer = null;
//   }

//   /**
//   * Cancels the current event
//   * @param {object} e - browser event object
//   * @returns {void}
//   */
//   function cancelEvent(e) {
//       e.stopImmediatePropagation();
//       e.preventDefault();
//       e.stopPropagation();
//   }

//   /**
//    * Starts the timer on mouse down and logs current position
//    * @param {object} e - browser event object
//    * @returns {void}
//    */
//   function mouseDownHandler(e) {
//       startX = e.clientX;
//       startY = e.clientY;
//       startLongPressTimer(e);
//   }

//   /**
//    * If the mouse moves n pixels during long-press, cancel the timer
//    * @param {object} e - browser event object
//    * @returns {void}
//    */
//   function mouseMoveHandler(e) {

//       // calculate total number of pixels the pointer has moved
//       var diffX = Math.abs(startX - e.clientX);
//       var diffY = Math.abs(startY - e.clientY);

//       // if pointer has moved more than allowed, cancel the long-press timer and therefore the event
//       if (diffX >= maxDiffX || diffY >= maxDiffY) {
//           clearLongPressTimer(e);
//       }
//   }

//   /**
//    * Gets attribute off HTML element or nearest parent
//    * @param {object} el - HTML element to retrieve attribute from
//    * @param {string} attributeName - name of the attribute
//    * @param {any} defaultValue - default value to return if no match found
//    * @returns {any} attribute value or defaultValue
//    */
//   function getNearestAttribute(el, attributeName, defaultValue) {

//       // walk up the dom tree looking for data-action and data-trigger
//       while (el && el !== document.documentElement) {

//           var attributeValue = el.getAttribute(attributeName);

//           if (attributeValue) {
//               return attributeValue;
//           }

//           el = el.parentNode;
//       }

//       return defaultValue;
//   }

//   // hook events that clear a pending long press event
//   document.addEventListener(mouseUp, clearLongPressTimer, true);
//   document.addEventListener(mouseLeave, clearLongPressTimer, true);
//   document.addEventListener(mouseMove, mouseMoveHandler, true);
//   document.addEventListener('wheel', clearLongPressTimer, true);
//   document.addEventListener('scroll', clearLongPressTimer, true);

//   // hook events that can trigger a long press event
//   document.addEventListener(mouseDown, mouseDownHandler, true); // <- start

// }(window, document));
//-----------------------------------------------------------------------

// !function (t, e) {
//   "use strict";
//   function n() {
//     this.dispatchEvent(
//       new CustomEvent("long-press", { bubbles: !0, cancelable: !0 })), 
//       clearTimeout(o), 
//       console && console.log && console.log("long-press fired on " + this.outerHTML)
//   }
//   var o = null, 
//       u = "ontouchstart" in t || navigator.MaxTouchPoints > 0 || navigator.msMaxTouchPoints > 0, 
//       s = u ? "touchstart" : "mousedown", 
//       i = u ? "touchcancel" : "mouseout", 
//       a = u ? "touchend" : "mouseup", 
//       c = u ? "touchmove" : "mousemove"; 
//   "initCustomEvent" in e.createEvent("CustomEvent") && 
//   (
//     t.CustomEvent = function (t, n) { 
//       n = n || { 
//         bubbles: !1, 
//         cancelable: !1, 
//         detail: void 0 
//       }; 
//       var o = e.createEvent("CustomEvent"); 
//       return o.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), o 
//     }, 
//     t.CustomEvent.prototype = t.Event.prototype), 
//     e.addEventListener(s, function (t) { 
//       var e = t.target, 
//       u = parseInt(e.getAttribute("data-long-press-delay") || "1500", 10); 
//       o = setTimeout(n.bind(e), u) }), 
//       e.addEventListener(a, function (t) { clearTimeout(o) }), 
//       e.addEventListener(i, function (t) { clearTimeout(o) }), 
//       e.addEventListener(c, function (t) { clearTimeout(o) })
// }(this, document);

// $(document).ready(()=>{
  
//   (function($){
//     var start,
//         end,
//         diff;
//     var clickTime = 500;
//     var longClick = new CustomEvent('long-press');
    
//     var div = document.querySelector('body');
//     document.body.addEventListener('long-press', function(event){
      
      
//       // var q = document.getElementById('clicktime');
//       // q.innerHTML = diff/1000 +'s';
//       // q.style.color = '#00E676';
//       console.log(diff/1000 + 's');
      
//     });
    
//     div.onmousedown = function() {
//       start = Date.now();
      
//       div.onmouseup = function() {
//         end = Date.now();
//         diff = (end - start) + 1;
//         if (diff > clickTime) {
//           document.body.dispatchEvent(longClick);
//         } else {
//           console.log(diff/1000 + 's');
//         }
        
//       }
//     }
//   })(jQuery);

// })