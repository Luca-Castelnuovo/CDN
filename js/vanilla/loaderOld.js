//Define content and loader
var $content = $('.content');
var $loader = $('.loader');

//Hide content and show loader
$content.addClass('hidden');
$loader.addClass('loading');

//Show content and hide loader
function stopLoading() {
    $content.slideUp(0,function(){
        $loader.removeClass('loading');
        $content.removeClass('hidden').slideDown('fast');
    });
}

//Hide content and show loader
function startLoading() {
    $content.slideUp('fast', function() {
      $content.addClass('hidden').slideDown(0);
      $loader.addClass('loading');
    });
}
