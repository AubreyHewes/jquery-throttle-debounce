/*jshint strict: false, -W030, -W032, -W033*/
/*global QUnit, $, module, test, expect, stop, start*/

// Not sure why this isn't set by default in qunit.js..
QUnit.jsDump.HTML = false;

$(function(){ // START CLOSURE

$('#jq_version').html( $.fn.jquery );

var pause = 500,
  delay = 100;

function exec_many_times( each, complete ) {
  var i = 0,
    repeated,
    id;
  
  function start(){
    id = setInterval(function(){
      each();
      if ( ++i === 50 ) {
        clearInterval( id );
        complete( repeated ? null : function(){
          i = 0;
          repeated = true;
          setTimeout( start, pause );
        });
      }
    }, 20);
  }
  
  setTimeout( start, pause );
};

module( '$.throttle' );

test( 'delay, callback', function (assert) {
  expect( 7 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function( now ){
      arr.push( now - this )
    },
    throttled = $.throttle( delay, fn );

  assert.equal( throttled.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    var now = +new Date();
    start_time = start_time || now;
    i++;
    throttled.call( start_time, now );
  }, function( callback ){
    var len = arr.length;
    
    setTimeout(function(){
      //console.log( arr, arr.length, len, i );
      assert.ok( arr.length < i, 'callback should be executed less # of times than throttled-callback' );
      assert.equal( arr[0], 0, 'callback should be executed immediately' );
      assert.equal( arr.length - len, 1, 'callback should be executed one more time after finish' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});

test( 'delay, false, callback', function(assert) {
  expect( 7 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function( now ){
      arr.push( now - this )
    },
    throttled = $.throttle( delay, false, fn );

  assert.equal( throttled.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    var now = +new Date();
    start_time = start_time || now;
    i++;
    throttled.call( start_time, now );
  }, function( callback ){
    var len = arr.length;
    
    setTimeout(function(){
      //console.log( arr, arr.length, len, i );
      assert.ok( arr.length < i, 'callback should be executed less # of times than throttled-callback' );
      assert.equal( arr[0], 0, 'callback should be executed immediately' );
      assert.equal( arr.length - len, 1, 'callback should be executed one more time after finish' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});

test( 'delay, true, callback', function(assert) {
  expect( 7 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function( now ){
      arr.push( now - this )
    },
    throttled = $.throttle( delay, true, fn );

  assert.equal( throttled.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    var now = +new Date();
    start_time = start_time || now;
    i++;
    throttled.call( start_time, now );
  }, function( callback ){
    var len = arr.length;
    
    setTimeout(function(){
      //console.log( arr, arr.length, len, i );
      assert.ok( arr.length < i, 'callback should be executed less # of times than throttled-callback' );
      assert.equal( arr[0], 0, 'callback should be executed immediately' );
      assert.equal( arr.length - len, 0, 'callback should NOT be executed one more time after finish' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});


module( '$.debounce' );

test( 'delay, callback', function(assert) {
  expect( 5 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function(){
      arr.push( +new Date() )
    },
    debounced = $.debounce( delay, fn );

  assert.equal( debounced.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    start_time = start_time || +new Date();
    i++;
    debounced.call();
  }, function( callback ){
    var len = arr.length,
      done_time = +new Date();
    
    setTimeout(function(){
      //console.log( arr[0] - done_time );
      assert.equal( arr.length, 1, 'callback was executed once' );
      assert.ok( arr[0] >= done_time, 'callback should be executed after the finish' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});

test( 'delay, false, callback', function(assert) {
  expect( 5 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function(){
      arr.push( +new Date() )
    },
    debounced = $.debounce( delay, false, fn );

  assert.equal( debounced.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    start_time = start_time || +new Date();
    i++;
    debounced.call();
  }, function( callback ){
    var len = arr.length,
      done_time = +new Date();
    
    setTimeout(function(){
      //console.log( arr[0] - done_time );
      assert.equal( arr.length, 1, 'callback was executed once' );
      assert.ok( arr[0] >= done_time, 'callback should be executed after the finish' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});

test( 'delay, true, callback', function(assert) {
  expect( 5 );
  stop();
  
  var start_time,
    i = 0,
    arr = [],
    fn = function(){
      arr.push( +new Date() )
    },
    debounced = $.debounce( delay, true, fn );

  assert.equal( debounced.guid, fn.guid, 'throttled-callback and callback should have the same .guid' );
  
  exec_many_times( function(){
    start_time = start_time || +new Date();
    i++;
    debounced.call();
  }, function( callback ){
    var len = arr.length;
    
    setTimeout(function(){
      //console.log( arr[0] - start_time );
      assert.equal( arr.length, 1, 'callback was executed once' );
      assert.ok( arr[0] - start_time <= 5, 'callback should be executed at the start' );
      
      start_time = null;
      arr = [];
      i = 0;
      
      callback ? callback() : start();
      
    }, delay * 2);
  })
});


}); // END CLOSURE
