//searchbar handler
$(function(){
 var searchField = $('#query');
 var icon = $('#search-btn');

 //focus event handler
 $(searchField).on('focus', function(){
  $(this).animate({
    width:'100%'
  },400);
  $(icon).animate({
    right: '10px'
  },400);
 });

 //blur event handler
  $(searchField).on('blur', function(){
    if(searchField.val() === ''){
      $(searchField).animate({
        width: '45%'
      },400, function(){});
      $(icon).animate({
        right: '360px'
      },400, function(){});
    }
 });

  $('#search-form').submit(function(e){
    e.preventDefault();
  });
});


function search(){
  // clear results
  $('#results').html('');
  $('#buttons').html('');
  //get form inputs
  q = $('#query').val();

  //run get request on api
  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key: 'AIzaSyDtiYiv_JGnMFkrzVj5YodXYgEICg3KLZo'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

          //log data
        console.log(data);

          //get output
        $.each(data.items, function(i, item){
          var output = getOutput(item);

          // Display Results
          $('#results').append(output);

        });
      }

    );
}
