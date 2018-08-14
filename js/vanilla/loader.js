//Define content and loader
var $content = document.querySelector('.content');
var $content = document.querySelector('.loader');

//Hide content and show loader
$content.addClass('hidden');
$loader.addClass('loading');

//Show content and hide loader
function stopLoading() {
    $content.fadeOut(0,function(){
        $loader.removeClass('loading');
        $content.removeClass('hidden').fadeIn('fast');
    });
}

//Hide content and show loader
function startLoading() {
    $content.fadeOut('fast', function() {
      $content.addClass('hidden').fadeIn(0);
      $loader.addClass('loading');
    });
}
