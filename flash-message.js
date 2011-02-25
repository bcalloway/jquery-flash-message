/**
 * jQuery Flash Message plugin
 *
 * Copyright (c) 2011 Brandon Calloway
  * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 **/

/**
 *
 * Provides Flash Message functionality similar to a Ruby on Rails application, after a CRUD operation.
 *
 * For example, in an ASP.NET MVC project, you can place the following after a controller action has completed:
 *
 *  Response.Cookies.Add(new HttpCookie("FlashSuccess", "The page was succesfully created!") { Path = "/" });
 *  return RedirectToAction("Index");
 *
 * This will create a cookie named "FlashSuccess", and will be read by the $.flashMessage jQuery function.
 * Additionally, there is a function called flashPrompt that will allow you to use flash messages in ajax success/error callbacks.
 *
 * Requirements:
 *   jQuery 1.4.x or higher, http://docs.jquery.com/Downloading_jQuery
 *   jQuery cookie plugin, http://plugins.jquery.com/project/Cookie
 *
 * Be sure to include this javascript file after the above requirements, and before any javascript files that use flash messages.
 * 
 * In your main javascript file, include the plugin like so:
 *
 *  $("#messages").flashMessage();
 *
 * By default, the flash message looks for the following div container:
 *
 *   <div id="messages"></div>
 *
 * If the flash message is a success, it appends a class called "flash-success". If the flash message is an error, it appends a class called "flash-error".
 * You can style the flash message however you choose in your css.
 *
 * To use the flashPrompt function to provide an ajax callback:
 *
 *   flashPrompt('succes/error', 'Whatever you want the message to be');
 *
 * For example:
 *
 *   $.ajax({
 *	    url: '/admin/pages/delete',
 *	    type: "POST",
 *	    traditional: true,
 *	    data: { 'id': page_id },
 *	    success: function () {
 *       flashPrompt('success', 'Page was successfully Deleted!');
 *      }
 *   });
 *
 **/

// add flash message after jquery operations
function flashPrompt(result, message) {
  $('#messages').addClass("flash-" + result);
  $('#messages').html('<div>' + message + '</div>').fadeIn("slow");
  $('#messages').delay(2000).fadeOut("slow", function () {
    $('#messages').removeClass("flash-" + result);
  });
}

$(document).ready(function () {

  // add success flash message after operation
  $.fn.flashMessage = function () {
    if ($.cookie("FlashSuccess")) {
      var message = $.cookie("FlashSuccess");
      flashPrompt("success", message);
      $.cookie("FlashSuccess", null, { path: '/' });
    }

    if ($.cookie("FlashError")) {
      message = $.cookie("FlashError");
      flashPrompt("error", message);
      $.cookie("FlashError", null, { path: '/' });
    }
  }

});